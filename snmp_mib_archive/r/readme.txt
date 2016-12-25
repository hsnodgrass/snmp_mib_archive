                        Insight Management MIB

                              README.TXT

This document contains information on how to use the files provided on
the Management CD in the \TOOLKIT\MIBS directory.  It is intended to
give the reader experienced in SNMP management products a summary of
the steps required to start using the Insight MIB as soon as possible.
For more complete information, please refer to the Integrating Insight
Manager with Enterprise Management Platforms Technote or the
Integrating Insight Manager with ManageWise Technote.  These
and other Technotes are available located in the \DOCS\ENG directory
and available on the HP World Wide Web server at http://www.hp.com. If
you wish to get a bound hardcopy version of any of the Technotes,
contact your Authorized HP Reseller.

NOTE:  The files described in this document and furnished on this CD are
provided under a license agreement.  They may be used or copied only in
accordance with the terms of the agreement.


TABLE OF CONTENTS

1.0  Introduction to the Insight Management MIB

2.0  Insight Management Information Base Organization

3.0  Concise MIB format
     3.1  Groups
     3.2  Data structures
          3.2.1  Scalar Data Items
                 3.2.1.1  Basic Scalar Data Items
                 3.2.1.2  Defined Scalar Data Items
                 4.2.1.3  Access of Data Items
                 3.2.1.4  Status of Data Items
                 3.2.1.5  Description of Data Items
                 3.2.1.6  Scalar Item Definition Example
          3.2.2  Table Data Items
                 3.2.2.1  Table Status
                 3.2.2.2  Table Index
                 3.2.2.3  Table Definition Example

4.0  Trap definitions



1.0  INTRODUCTION TO THE INSIGHT MANAGEMENT MIB

This directory contains all the files necessary for integrating the
Insight Management Information Base (MIB) into SNMP network
management applications.  HP provides these files for inclusion into
SNMP network management applications such as SunNet Manager from
SunConnect, HP OpenView Network Node Manager from Hewlett Packard,
NetView for AIX from IBM and ManageWise from Novell.  These files allow
the user to integrate server management into an existing work group
or enterprise management environment.  For an in-depth tool to monitor
your ProLiant servers, consider using Insight Manager 7, which provides
a comprehensive management interface to the complete Insight MIB.
Insight Manager 7 is an easy to use application based on the Microsoft
Windows environment.


2.0  INSIGHT MANAGEMENT INFORMATION BASE ORGANIZATION

The Insight Management MIB is a modular definition that follows IETF
RFC 1212 for manageable objects and RFC 1215 for traps.  Each piece
of information is an object and related objects represent a group.  The
information in the MIB represents important device hardware and device
software information.  For example, the MIB includes server and
component device information about the operation, performance, security
and configuration of the devices.

The Insight MIB is modular.  The following table provides information
about the different files that compose the Insight Management MIB.

 MIB File       Description
 ============   =====================================================
 CPQSTDEQ.MIB   Standard PC Server Equipment information

 CPQSINFO.MIB   ProLiant Specific PC Server information

 CPQHOST.MIB    Host Server Operating System information

 CPQIDA.MIB     Intelligent Drive Array information

 CPQIDE.MIB     IDE information

 CPQSCSI.MIB    SCSI Device information

 CPQSTSYS.MIB   Storage Systems information

 CPQHLTH.MIB    Server Health information

 CPQTHRSH.MIB   Settable Threshold information

 CPQUPS.MIB     Uninterruptible Power Supply (UPS) information

 CPQRECOV.MIB   Recovery Server information

 CPQSRVMN.MIB   Server Manager/R information

 CPQSM2.MIB     Remote Insight and iLO information

 CPQCLUS.MIB    Cluster information

 CPQFCA.MIB     Fibre Array information

 CPQSTAT.MIB    External Status information

 CPQNIC.MIB     Network Interface Card information

 CPQAPLI.MIB    Server Appliance information

 CPQCR.MIB      CR3500 RAID Controller information

 SRVCLU.MIB     Common Cluster Management information

 SRVNTC.MIB     Cluster Management MIB version information

 ETHER.MIB      RFC 1398 Ethernet NIC information

 TOKEN.MIB      RFC 1231 Token Ring NIC information


The Insight MIBs represent an extension to the standard MIB
information already defined in several standard MIB documents (for
example, RFC 1213 or RFC 1271).  These extensions offer
additional information that will be available to any SNMP management
application supporting the Insight MIBs.

The Insight MIBs are defined to be modular.  A series of MIBs address
various aspects of the computer system.  A standard equipment MIB provides
information about the standard equipment of any Industry Standard PC
(ISA or EISA).  A ProLiant system specific MIB provides information about
ProLiant specific extensions to the standard PC information.  Other
MIBs provide information about specific sub-systems developed
by HP; for example Drive Array or Server Health sub-systems.

Using the Insight MIBs in no way affects the standard information already
available with SNMP or the access method for obtaining standard
information.

The Insight MIBs conform to the Concise MIB format (see section 3.0)
and are suitable for use by most MIB compilers used to assimilate MIB
documents. The main portion of the tree with respect to the HP
instrumented management information is:

(root)
    |-CCITT(0)
    |-ISO(1)
    |   |-Org(3)
    |   |   |-DOD(6)
    |   |   |   |-Internet(1)
    |   |   |   |   |-Directory(1)
    |   |   |   |   |-Mgnt(2)
    |   |   |   |   |   |-MIB2(1)
    |   |   |   |   |-Experimental(3)
    |   |   |   |   |-Private(4)
    |   |   |   |   |   |-Enterprises(1)
    |   |   |   |   |   |   |-Compaq(232)
    |   |   |   |   |   |   |   |-cpqStdEquipment(1)
    |   |   |   |   |   |   |   |-cpqSystemInfo(2)
    |   |   |   |   |   |   |   |-cpqDriveArray(3)
    |   |   |   |   |   |   |   |-cpqServerManager(4)
    |   |   |   |   |   |   |   |-cpqScsi(5)
    |   |   |   |   |   |   |   |-cpqHealth(6)
    |   |   |   |   |   |   |   |-RESERVED(7)
    |   |   |   |   |   |   |   |-cpqSsStorageSys(8)
    |   |   |   |   |   |   |   |-cpqSm2(9)
    |   |   |   |   |   |   |   |-cpqThresholdMgmt(10)
    |   |   |   |   |   |   |   |-cpqHostOS(11)
    |   |   |   |   |   |   |   |-cpqUps(12)
    |   |   |   |   |   |   |   |-cpqRecovery(13)
    |   |   |   |   |   |   |   |-cpqIde(14)
    |   |   |   |   |   |   |   |-cpqCluster(15)
    |   |   |   |   |   |   |   |-cpqFibreArray(16)
    |   |   |   |   |   |   |   |-cpqExternalMgmt(17)
    |   |   |   |   |   |   |   |-cpqNic(18)
    |   |   |   |   |   |   |   |-cpqWinOsMgmt(19)
    |   |   |   |   |   |   |   |-cpqApplianceMgmt(21)
    |   |   |   |   |   |   |   |-cpqRackInfo(22)


Every piece of information is referred to by its full name so each piece
of information can be unambiguously specified.  Full names are commonly
given in dotted decimal notation.  Dotted decimal notation specifies all
the branch numbers, separated by periods, needed to reach the particular
item.  For example the number 1.3.6.1.4.1.232.1 stands for the
Standard Equipment MIB.  All information in the Standard Equipment
MIB will start with this prefix and then continue on to distinguish
different pieces of information within the MIB.

The name of each branch is specified in MIB documents.  The number series,
in parentheses after the name, is what is sent over the network in an SNMP
packet when referring to a specific item in the tree.  Sending a series of
numbers specifying a tree location in a packet rather than a text
description of the item as a name lessens network traffic.  However,
this protocol requires that both ends involved in the protocol understand
the meanings of these code numbers and the structure of the information.
This scheme requires a precise grammar to document the MIB structure to
avoid confusion between the agent and the management station.  The grammar
typically used is called the Concise MIB format and is defined in RFC 1212.

Further detail about the groups and objects provided by the HP
Insight Management Agents is available in the comments within each MIB
file.


3.0  CONCISE MIB FORMAT

A few notes about the Concise MIB format should allow a reader to
understand a MIB document without learning the full grammar.

A comment is started by two consecutive dashes.  All characters until
the end of the line are ignored by a program processing the MIB.
Comments are used to provide information to a reader.

A MIB starts with a line that states the name of the MIB being defined.
This is typically followed by an import statement.  An import statement
allows the MIB writer to specify information from other well known MIBs
that are referred to in this MIB.

The term END is used to signify the end of the MIB data definitions.

For example:

    CPQSTDEQ-MIB DEFINITIONS ::= BEGIN

        IMPORTS
            enterprises             FROM RFC1155-SMI
            DisplayString           FROM RFC1213-MIB
            OBJECT-TYPE             FROM RFC-1212;

    -- This is a comment.
    -- Typically, structures for organizing managed items are defined
    -- here, followed by the definitions and descriptions of the managed
    -- items.

    END

This example starts a MIB by the name of CPQSTDEQ-MIB.  This MIB
will use the term: enterprises as it is defined in RFC 1155,
DisplayString as it is defined in RFC 1213, and OBJECT-TYPE as it is
defined in RFC 1212.  Three comment lines follow to show where managed
items would be defined in a real MIB.  Then the END statement terminates
the MIB definition.


3.1  GROUPS

A group definition specifies a name for a branch of the tree that contains
sub-groups or specific pieces of information.  Groups are used to organize
related pieces of information.  A group is defined by stating a name for
the group and showing how it fits into the tree.  To show how it fits into
the tree the branch it will be placed under is named and the unique
sub-branch number for this group is given.

Typically, all group definitions are placed immediately following the
IMPORTS statement.  Some examples of group definitions are shown below.

    compaq              OBJECT IDENTIFIER ::= { enterprises 232 }
    cpqStdEquipment     OBJECT IDENTIFIER ::= { compaq 1 }
    cpqSeMibRev         OBJECT IDENTIFIER ::= { cpqStdEquipment 1 }
    cpqSeComponent      OBJECT IDENTIFIER ::= { cpqStdEquipment 2 }

    cpqSeInterface       OBJECT IDENTIFIER ::= { cpqSeComponent 1 }
    cpqSeProcessor       OBJECT IDENTIFIER ::= { cpqSeComponent 2 }
    cpqSeMemory          OBJECT IDENTIFIER ::= { cpqSeComponent 3 }
    cpqSeIsaCmos         OBJECT IDENTIFIER ::= { cpqSeComponent 4 }
    cpqSeEisaNvram       OBJECT IDENTIFIER ::= { cpqSeComponent 5 }
    cpqSeRom             OBJECT IDENTIFIER ::= { cpqSeComponent 6 }
    cpqSeKeyboard        OBJECT IDENTIFIER ::= { cpqSeComponent 7 }
    cpqSeVideo           OBJECT IDENTIFIER ::= { cpqSeComponent 8 }
    cpqSeSerialPort      OBJECT IDENTIFIER ::= { cpqSeComponent 9 }
    cpqSeParallelPort    OBJECT IDENTIFIER ::= { cpqSeComponent 10 }
    cpqSeFloppyDisk      OBJECT IDENTIFIER ::= { cpqSeComponent 11 }
    cpqSeFixedDisk       OBJECT IDENTIFIER ::= { cpqSeComponent 12 }


The group definitions above can be visualized as the following tree
structure:

   (Enterprises)
       |-Compaq(232)
       |   |-cpqStdEquipment(1)
       |   |   |-cpqSeMibRev(1)
       |   |   |-cpqSeComponent(2)
       |   |         |-cpqSeInterface(1)
       |   |         |-cpqSeProcessor(2)
       |   |         |-cpqSeMemory(3)
       |   |         |-cpqSeIsaCmos(4)
       |   |         |-cpqSeEisaNvram(5)
       |   |         |-cpqSeRom(6)
       |   |         |-cpqSeKeyboard(7)
       |   |         |-cpqSeVideo(8)
       |   |         |-cpqSeSerialPort(9)
       |   |         |-cpqSeParrallelPort(10)
       |   |         |-cpqSeFloppyDiskette(11)
       |   |         |-cpqSeFixedDisk(12)

A definition for enterprises is not needed here since enterprises has
been defined elsewhere and imported.  Anyone wishing to see its
definition can refer to RFC 1155.

Group numbers do not need to be consecutive.  A particular Agent
implementation may not support some of the groups.

Some groups (such as cpqSeComponent) are intended for better organization.
These groups have sub-groups below them, and do not directly reference
any data (the data is in the sub-groups).  These organizational groups will
typically be given only a brief description since their role should be
easily understood by the description of the sub-groups.  When a group
contains information immediately below it, all the items in the group will
be described and defined.


3.2  DATA STRUCTURES

There are two basic types of data: scalar items and tables.
A scalar item is a single piece of information that is in a group.  An
example of a scalar is the total memory in a server.  This offers
unambiguous information without further qualifications.

A table is a structure for organizing data that requires more information
to uniquely identify a single data item within a group of similar items.
An example of an item that is best organized in a table is an EISA board
ID.  The EISA board information is organized in the cpqSeEisaSlotTable, in
the CPQSTDEQ.MIB file.  The Board ID is only one piece of information in
that table.

Each item defined in the MIB (scalar or part of a table) has a
description which explains what the item means and can help interpret
the value of the item.


3.2.1  SCALAR DATA ITEMS

The name of a data item, by convention, starts with a lower case letter.
A SYNTAX clause specifies the type of information the item contains.
There are two types, basic and defined types.


3.2.1.1  BASIC SCALAR DATA ITEMS

Basic types are defined as part of the SNMP grammar and are represented
in all capital letters.  Examples include INTEGER and OCTET STRING.

The INTEGER type specifies that the value of the item should be
interpreted as a number.  In some cases the word INTEGER will be
followed by a range qualifier that restricts the possible values.
In other cases the word INTEGER will be followed by an enumeration
list that explicitly names the possible values and the meaning of
each possible value.

The OCTET STRING type specifies that the value of the item should be
interpreted as a string of octets (bytes).  The value of any particular
octet (byte) within the string may be any value from zero to 255.  A
size qualifier may be given after the term OCTET STRING to limit the
possible size (in bytes) of the value.


3.2.1.2  DEFINED SCALAR DATA ITEMS

Defined types are defined by macros that refer to the basic types and
start with a capital letter.  Examples include Counter and DisplayString.

A Counter is an INTEGER that has an implied range of zero to
4,294,967,295 (a hexadecimal value of FFFFFFFF).  When a Counter equals
the maximum value and is incremented again it will return to zero.

A DisplayString is an OCTET STRING where each octet is restricted to
be a printable ASCII character.  Like the OCTET STRING from which this
is derived, it may have a size qualifier.


3.2.1.3  ACCESS OF DATA ITEMS

The ACCESS clause specifies the ways this item may be used.
The ACCESS may be read-only, read-write, or not-accessible.  Read-only
means that the value of this item may be retrieved by a management
application, but may not be altered.  Read-write means this item may
be read and/or altered by a management application.  Not-accessible
is given as the access for organizational constructs that do not
represent data items.  Not-accessible is only used for table features
and should not be used for a scalar item.

The ACCESS clause shows the actions the agent may support for the item.
In practice this may be limited further by features or limitations of a
particular agent implementation.


3.2.1.4  STATUS OF DATA ITEMS

The STATUS clause specifies whether an agent is required to support this
item if the agent supports this group.  A status of mandatory means that
this item will always be present if this group is supported.  A status of
optional means that a particular agent implementation has the option to
support this item.  A status of deprecated indicates that this item will
not be supported by future agents.  Deprecated objects stay in the MIB to
maintain backward compatibility.


3.2.1.5  DESCRIPTION OF DATA ITEMS

The DESCRIPTION clause contains a double quote delimited text description
of the item.  This description should give enough information for a
reader to understand the significance of the information this item
provides.


3.2.1.6  SCALAR ITEM DEFINITION EXAMPLE

The item definition ends by specifying how the item fits into the MIB
tree.  The group the item belongs to is given followed by the unique
branch number within the group for this item.

Scalar item example:

    cpqSeMibRevMajor OBJECT-TYPE
        SYNTAX  INTEGER (1..65535)
        ACCESS  read-only
        STATUS  mandatory
        DESCRIPTION
            "The Major Revision level of the MIB.

            A change in the major revision level represents a major change
            in the architecture of the MIB.  A change in the major revision
            level may indicate a significant change in the information
            supported and/or the meaning of the supported information,
            correct interpretation of data may require a MIB document with
            the same major revision level."
        ::= { cpqSeMibRev 1 }


This example defines a scalar item named cpqSeMibRevMajor.  This item is
an INTEGER that may be read, but may not be changed by a management
station.  The cpqSeMibRevMajor item must be present if the group it
belongs to (the cpqSeMibRev group) is supported.  The cpqSeMibRevMajor
item has a description to help a reader interpret the meaning of
the value assigned to this item.  The cpqSeMibRevMajor item is the member
of the cpqSeMibRev group assigned the unique number one within the group.


3.2.2  TABLE DATA ITEMS

Tables introduce the concept of constructed types.  There are two
operators that allow for organization of the standard types, the
SEQUENCE operator and the SEQUENCE OF operator.  A table uses both of
these operators.

The SEQUENCE operator allows the definition of a new type that consists
of several standard types in a specific order.  This is very similar
to the concept of a structure or a record found in most programming
languages.

The SEQUENCE OF operator allows the definition of a list of zero or
more of the same type of elements.  The number of elements is not
specified, but a means of uniquely identifying each element is given
by providing an indexing scheme.  This is very similar to the concept
of a dynamic array found in most programming languages.  A table entry
is defined a SEQUENCE.  A table is defined as a SEQUENCE OF the table
entry type.

Table entry variables are defined after they are referenced in a table
definition.

The Concise MIB format is case sensitive and there are several
conventions on the use of upper and lower case letters.  The name
used for the entry type and the variable of that type differ only by the
case of the first letter.  It is conventional to start types with an
upper case letter and items (the variables) with a lower case letter.


3.2.2.1  TABLE STATUS

The STATUS of the table and the table entry is not-accessible.  There is
no data that is uniquely referred to by the name of the table or entry so
the concept of reading (or writing) the value of a table or entry is
meaningless.  Tables and entries are useful for organizing and defining a
MIB, but SNMP commands only allow the manipulation of simple items
(scalars and the items that are part of the SEQUENCE in a table entry).


3.2.2.2  TABLE INDEX

The INDEX clause specifies the items that are used to uniquely identify
an element in the table.  An index may simply be a unique number assigned
to an entry that has no specific meaning except to the agent or it may
have some intrinsic meaning.


3.2.2.3  TABLE DEFINITION EXAMPLE

Here is an example of a table definition.  It defines the table as
a SEQUENCE OF the CpqSeCpuEntry type that will be defined below.


    cpqSeCpuTable OBJECT-TYPE
        SYNTAX  SEQUENCE OF CpqSeCpuEntry
        ACCESS  not-accessible
        STATUS  mandatory
        DESCRIPTION
            "A list of the CPUs (processors) in the system.

            The main processor (if such a concept is valid for this machine)
            should be the first entry in the table."
        ::= { cpqSeProcessor 1 }


Here is an example of an entry definition.  It defines an item of the
cpqSeCpuEntry type.  It also describes the field used to uniquely
identify entries in the table.  No two table entries will have the
same values for the cpqSeCpuUnitIndex field.


    cpqSeCpuEntry OBJECT-TYPE
        SYNTAX  CpqSeCpuEntry
        ACCESS  not-accessible
        STATUS  mandatory
        DESCRIPTION
            "A description of a CPU (processor) in the system."
        INDEX   { cpqSeCpuUnitIndex }
        ::= { cpqSeCpuTable 1 }

    CpqSeCpuEntry ::= SEQUENCE {
        cpqSeCpuUnitIndex   INTEGER,
        cpqSeCpuSlot        INTEGER,
        cpqSeCpuName        DisplayString,
        cpqSeCpuSpeed       INTEGER,
        cpqSeCpuStep        INTEGER,
        cpqSeCpuStatus      INTEGER
    }


The following four definitions are the four scalar items that form the
fields of the CpqSeCpuEntry type.


    cpqSeCpuUnitIndex OBJECT-TYPE
        SYNTAX  INTEGER (0..65535)
        ACCESS  read-only
        STATUS  mandatory
        DESCRIPTION
            "This is a number that uniquely specifies a processor unit.

            A processing unit may be a set of processing chips that are
            on the same board or for other reasons work together as a unit.
            The main processor unit (if such a concept is valid for this
            machine) will always have the lowest (first) index."
        ::= { cpqSeCpuEntry 1 }

    cpqSeCpuSlot OBJECT-TYPE
        SYNTAX  INTEGER (0..255)
        ACCESS  read-only
        STATUS  mandatory
        DESCRIPTION
            "This value represents this processor's slot.

            If the slot cannot be determined the value of zero (0) will be
            returned."
        ::= { cpqSeCpuEntry 2 }

    cpqSeCpuName OBJECT-TYPE
        SYNTAX  DisplayString (SIZE (0..255))
        ACCESS  read-only
        STATUS  mandatory
        DESCRIPTION
            "The name of this processor.

            For example:
                80386"
        ::= { cpqSeCpuEntry 3 }

    cpqSeCpuSpeed OBJECT-TYPE
        SYNTAX  INTEGER (0..65535)
        ACCESS  read-only
        STATUS  mandatory
        DESCRIPTION
            "The clock speed (in megahertz) of this processor.

            Zero will be returned if this value is not available."
        ::= { cpqSeCpuEntry 4 }

    cpqSeCpuStep OBJECT-TYPE
        SYNTAX  INTEGER (0..65535)
        ACCESS  read-only
        STATUS  mandatory
        DESCRIPTION
            "The step of the processor.

            This will be zero (0) if the step cannot be determined."
        ::= { cpqSeCpuEntry 5 }

    cpqSeCpuStatus OBJECT-TYPE
        SYNTAX  INTEGER {
            unknown(1),
            ok(2),
            degraded(3),
            failed(4)
            }
        ACCESS  read-only
        STATUS  mandatory
        DESCRIPTION
            "The status of the processor."
        ::= { cpqSeCpuEntry 6 }



The previous definitions describe a tree structure as follows:

    (cpqSeProcessor)
        |-cpqSeCpuTable(1)
            |-cpqSeCpuEntry1
            |-cpqSeCpuEntry2
            |-     .
            |-     .
            |-cpqSeCpuEntryN

Each processor entry is organized as follows:

    cpqSeCpuEntryN
        |-cpqSeCpuUnitIndex(1)
        |-cpqSeCpuSlot(2)
        |-cpqSeCpuName(3)
        |-cpqSeCpuSpeed(4)
        |-cpqSeCpuStep(5)
        |-cpqSeCpuStatus(6)


As an example, to get the clock speed of a Server's second
processor, a management application would request the object with
an ASN.1 notation of 1.3.6.1.4.1.232.1.2.2.1.4.2.  The final 2 is
the cpqSeCpuUnitIndex value for the second processor.


4.0  TRAP DEFINITIONS

A MIB may also contain trap definitions.  A trap is a notification sent
by the SNMP agent to a management station.  The trap is sent to inform
the management station about an event that has occurred on the managed
system.  Traps may also be referred to as alerts or alarms.

The trap definition begins with the name of the trap followed by the
term TRAP-TYPE.

An ENTERPRISE clause follows to indicate the MIB in which this trap is
defined.

An optional VARIABLES clause may be included to specify additional
information that will be sent in the trap.  The additional information
will be items defined in the MIB shown in the ENTERPRISE clause.  When
a variable is included in a trap, both its name and its value are sent
with the trap.  If a variable is a data item within a table, the name
will contain the index field(s).  This saves the trouble of sending
along the index fields explicitly as additional variables.

A DESCRIPTION clause will follow explaining the significance of the trap
and the conditions that would cause it to be sent.

Finally, the trap is given a number to identify it.  This number will be
unique within the scope of the ENTERPRISE.  Both the enterprise name and
the trap number are used by the management station to uniquely identify
the trap received.

Trap example:

    cpqDa2PhyDrvStatusChange TRAP-TYPE
        ENTERPRISE compaq
        VARIABLES  { cpqDaPhyDrvStatus, cpqDaPhyDrvBusNumber }
        DESCRIPTION
            "Physical Drive Status Change.

             This trap signifies that the Insight Agent has detected
             a change in the status of a Drive Array physical
             drive.  The variable cpaDaPhyDrvStatus indicates the
             current physical drive status.  The variable
             cpqDaPhyDrvBusNumber indicates the SCSI bus number
             associated with this drive."

        --#TYPE "Physical Drive Status Change"
        --#SUMMARY "Status is now %d for a physical drive on bus %d."
        --#ARGUMENTS {0,1}
        --#TIMEINDEX 99

        ::= 3003

This example defines a trap named cpqDa2PhyDrvStatusChange. This is trap
number 3003 in the Compaq enterprise.  This trap is sent by the agent
responsible for the CPQIDA MIB.  The current value of the
cpqDaPhyDrvStatus and the cpqDaPhyDrvBusNumber items is also included in the
trap packet.

The comment section within the trap defines additional information, used
by Novell's NetWare Management Services console, to display upon receiving
a Compaq enterprise trap.  In this example, the comments describe the
trap type (--#TYPE "Physical Drive Status Change"), a summary (--#SUMMARY
"Status is now %d for a physical drive on bus %d."), the arguments to
display within the summary statement (--#ARGUMENTS {0,1}), and an
indication about the time parameter to use (--#TIMEINDEX 99).

Note: The additional comments in the trap section specific for NetWare
Management Services does not impact the functionality of how any SNMP
compliant management console, such as SunConnect's SunNet Manager or
HP's OpenView, interacts with traps generated by the Insight Agents.

Traps are defined in the last section of the MIBs.  Refer to the actual
trap definitions for more information about the traps generated by the
Insight Management Agents.

______________________________________________________________________
Copyright 1992,2005 Hewlett-Packard Development Company, L.P.

Hewlett-Packard Company shall not be liable for technical or
editorial errors or omissions contained herein. The information in
this document is provided "as is" without warranty of any kind and
is subject to change without notice. The warranties for HP products
are set forth in the express limited warranty statements
accompanying such products. Nothing herein should be construed as
constituting an additional warranty.

Confidential computer software. Valid license from HP required for
possession, use or copying. Consistent with FAR 12.211 and 12.212,
Commercial Computer Software, Computer Software Documentation, and
Technical Data for Commercial Items are licensed to the U.S.
Government under vendor's standard commercial license.

NetWare is a trademarked product of Novell, Inc.

Windows is a trademark of Microsoft Corporation.

