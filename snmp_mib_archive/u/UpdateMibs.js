
var oShell = new ActiveXObject('Wscript.Shell');
var oFS = new ActiveXObject('Scripting.FileSystemObject');
var ForReading = 1;
var ForWriting = 2;

//	User downloads zip file from web
//	User unzips to a directory
//	User executes in the directory Mib71Update

// Use the WScript object to output message
//function Msg(sString)
function Msg(sString)
{
	WScript.Echo(sString);
}


function ErrMsg(sFncName, err)
{
	Msg(sFncName + '- Error: ' + err.number + ' ' + err.description);
}

function IsValidKey(sKey)
{
	var bRetVal = false;
	try
	{
	//	 no such key -2147024894 Invalid root in registry key "HKEY_LOCAL_MACHINE\SOFTWARE\Compaq\Insight Manager XE\3.22\".
	oShell.RegRead(sKey);
	bRetVal = true;
	}
	catch(err)
	{
	Msg(err.number + ' ' + err.description);
	}
	return bRetVal;
}


//
// FindFiles
//
function FindFiles(sFolder,sExt,nRecurse)
{
	var FileList = new Array();
	try
	{
		var f = oFS.GetFolder(sFolder);
	var fc = new Enumerator(f.files);
	for (; !fc.atEnd(); fc.moveNext())
	{
		if (sExt == oFS.GetExtensionName(fc.item().Path))
		{
			FileList.push(fc.item().Name);
		}
	}
	if (nRecurse-- > 0)
	{
		// recurse into subdirectories
		fc = new Enumerator(f.SubFolders);
		for (; !fc.atEnd(); fc.moveNext())
		{
		FileList += FindFiles(fc.item(), sExtnRecurse);
		}
	}
	}
	catch (err)
	{
		ErrMsg('FindFiles ', err);
	}
	return FileList;
}

//
// MakeDir
//
function MakeDir( sDest )
{
	if( oFS.FolderExists( sDest ) )
	{
		return true;
	}

	oFS.CreateFolder( sDest );
	return oFS.FolderExists( sDest );
}

//
// CopyFiles
//
function CopyFiles(sSrcFiles, sDest)
{
	var bRetVal = false;
	try
	{
		oFS.Copyfile( sSrcFiles, sDest );
		bRetVal = true;
	}
	catch (err)
	{
		ErrMsg('CopyFiles ', err);
	}
	return bRetVal;
}

//
// moveFile
//
function MoveFile( sSrcFile, sDest)
{
	var bRetVal = false;
	try
	{
	if( oFS.FileExists(sSrcFile) )
	{
		oFS.CopyFile( sSrcFile, sDest );
		oFS.DeleteFile( sSrcFile );
		bRetVal = true;
	}
	}
	catch (err)
	{
		ErrMsg('MoveFile ', err);
	}
	return bRetVal;
}

//
// ServiceRunning
//
function ServiceRunning( sServiceName )
{
	return true;
	var bRetVal = false;
	try
	{
		var sTempFile = oFS.GetTempName();
		oShell.Run('cmd /c net start > ' + sTempFile,0,true);
		oFile = oFS.OpenTextFile(sTempFile,ForReading);
		var sResults = oFile.ReadAll();
		oFile.Close();
		oFS.DeleteFile(sTempFile);
		if (-1 != sResults.indexOf(sServiceName))
		{
			bRetVal = true;
		}
	}
	catch(err)
	{
		ErrMsg('ServiceRunning ', err);
	}
	return bRetVal;
}

//
// PerformNimCmd
//
function PerformNimCmd(sCmd, sRunDir)
{
	var sCmdArgs = 'cmd /c ' + sRunDir.charAt(0) + ': && cd ' + sRunDir + ' && ' + sCmd;
	var oExec = oShell.Exec(sCmdArgs);
	var oStdOut = oExec.StdOut;
	while( !oStdOut.AtEndOfStream )
	{
		WScript.Echo(oStdOut.ReadLine());
	}
	var oStdErr = oExec.StdErr;
	while( !oStdErr.AtEndOfStream )
	{
		WScript.Echo(oStdErr.ReadLine());
	}
}

//
// UpdateNimbusMibs
//
function UpdateNimbusMibs( sSrcDir, sDestDir )
{
	var bRetVal = false;
	try
	{
		if (sDestDir.length)
		{
			Msg('\nCopying all mib files to ' + sDestDir + '\\mibs\\');
			CopyFiles( sSrcDir + '\\*.mib', sDestDir + '\\mibs\\');
			Msg('\nCopied all mib files successfully....');
			Msg('\nCopying all cfgs files to ' + sDestDir + '\\mibs\\');
			CopyFiles(sSrcDir + '\\*.cfg',sDestDir + '\\mibs\\');
			Msg('\nCopied all cfg files successfully....');
		}
		var changedcfg_fh = oFS.OpenTextFile('modifiedcfgs.list', ForReading); 
		Msg('\nFollowing MIBs may have been already registered in HP SIM, so un-installing them.');
		Msg('If your SIM does not have these MIBs already installed, then you may get an error message while un-installing it, which you can ignore.');
		while (!changedcfg_fh.AtEndOfStream)
		{
			var line2 = changedcfg_fh.ReadLine(); 
			var lower2 = line2.toLowerCase();
			var idx = lower2.indexOf('.cfg');
			var mibfilename = line2.substring(0,idx) + '.mib';
			PerformNimCmd('mxmib -d ' + mibfilename, sDestDir);
		}
		
		var main_fh = oFS.OpenTextFile('cfgstoimport.list', ForReading); 
		while (!main_fh.AtEndOfStream)
		{
			// The following is an example of how to move files without importing them
			// with MxMib
			// MoveFile(sSrcDir + '\\bladetype4-network.cfg',  sDestDir + '\\mibs\\');
			var line = main_fh.ReadLine(); 
			var lower = line.toLowerCase();
			var s = lower.indexOf('.cfg');
			if (s != -1)
			{
				PerformNimCmd('mxmib -a ' + line, sDestDir);
			}
		}
		bRetVal = true
	}
	catch (err)
	{
		ErrMsg('UpdateNimbusMibs() : Systems Insight Manager ', err);
	}
	main_fh.Close();

	return bRetVal;
}

//
// HandleNimbus - This script will run in a 32 bit environment
//
function Handle32Nimbus()
{
	var sServiceName = 'HP Systems Insight Manager';
	var bRetVal = false;

	try
	{
		// Get the 32 bit path
		var sRootDir = oShell.RegRead('HKEY_LOCAL_MACHINE\\SOFTWARE\\Hewlett-Packard\\Systems Insight Manager\\Settings\\InstallPath');
		if( sRootDir != null )
		{
			if (ServiceRunning(sServiceName)  )
			{
				bRetVal = UpdateNimbusMibs(oShell.CurrentDirectory, sRootDir);
				if (bRetVal)
				{
					Msg('MIB Update for Management CD completed successfully.');
				}
				else
				{
					Msg('System Insight Manager MIB Update not Successful');
				}
			}
			else
			{
				Msg('Systems Insight Manager: No Mib update, System Insight Manger service not running');
			}
		}
		else
		{
			Msg('Systems Insight Manager: No Mib update, System Insight Manger is not installed');
		}
	}
	catch(err)
	{
		ErrMsg('Systems Insight Manager ', err);
		Msg('Systems Insight Manager: No Mib update, System Insight Manger service not running');
	}
}

//
// Handle64Nimbus - This script will run in a 64 bit environment
//
function Handle64Nimbus()
{
	var sServiceName = 'HP Systems Insight Manager';
	var bRetVal = false;
	try
	{
		// Get the HP SIM x64 path
		var sRootDir = oShell.RegRead('HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Hewlett-Packard\\Systems Insight Manager\\Settings\\InstallPath');
		if( sRootDir != null )
		{
			if (ServiceRunning(sServiceName)  )
			{
				bRetVal = UpdateNimbusMibs(oShell.CurrentDirectory, sRootDir);
				if (bRetVal)
				{
					Msg('System Insight Manager MIB Update completed');
				}
				else
				{
					Msg('System Insight Manager MIB Update not Successful');
				}
			}
			else
			{
				Msg('Systems Insight Manager: No Mib update, System Insight Manger service not running');
			}
		}
		else
		{
			Msg('Systems Insight Manager: No Mib update, System Insight Manger is not installed');
		}
	}
	catch(err)
	{
		ErrMsg('Systems Insight Manager ', err);
		Msg('Systems Insight Manager: No Mib update, System Insight Manger service not running');
	}
}

function CheckFor64Bit()
{
	var bRetVal = false;
	try
	{
		 // Get the HP SIM x64 path
		var sRootDir = oShell.RegRead('HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Hewlett-Packard\\Systems Insight Manager\\Settings\\InstallPath');
		Msg('Systems Insight Manager running in 64 bit environment');
		bRetVal = true;
	}
	catch(err)
	{
		Msg('Systems Insight Manager running in 32 bit environment');
	}
	return bRetVal;
}

//CheckFor64Bit();
if( CheckFor64Bit())
{
	Handle64Nimbus();
}
else
{
	Handle32Nimbus();
}