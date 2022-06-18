@echo off
:check_permissions
    net session >nul 2>&1
    if %errorLevel% == 0 (
	    echo Installer running as administrator. Skipping to installation...
	    goto :continueElevated
    )

echo NSHARP INTERPRETER AND LIBRARY INSTALLER
echo    ^* Welcome to the n#-lang installer.
echo    ^* This script will install n# to your computer.
echo    Note: n# is currently only available for windows.

echo [i] This process requires elevation. Can I use administrator permissions?
set /p "elev=(y/n) > "
echo recieved: %elev%
if [%elev%]==[y] ( 
  :: elevation allowed, can continue
  :: elevate
   @echo off
 CLS
 ECHO.
 ECHO =============================
 ECHO elevating....
 ECHO =============================

:init
 setlocal DisableDelayedExpansion
 set cmdInvoke=1
 set winSysFolder=System32
 set "batchPath=%~dpnx0"
 rem this works also from cmd shell, other than %~0
 for %%k in (%0) do set batchName=%%~nk
 set "vbsGetPrivileges=%temp%\OEgetPriv_%batchName%.vbs"
 setlocal EnableDelayedExpansion

:checkPrivileges
  NET FILE 1>NUL 2>NUL
  if '%errorlevel%' == '0' ( goto gotPrivileges ) else ( goto getPrivileges )

:getPrivileges
  if '%1'=='ELEV' (echo ELEV & shift /1 & goto gotPrivileges)
  ECHO.
  ECHO **************************************
  ECHO Invoking UAC for Privilege Escalation
  ECHO **************************************

  ECHO Set UAC = CreateObject^("Shell.Application"^) > "%vbsGetPrivileges%"
  ECHO args = "ELEV " >> "%vbsGetPrivileges%"
  ECHO For Each strArg in WScript.Arguments >> "%vbsGetPrivileges%"
  ECHO args = args ^& strArg ^& " "  >> "%vbsGetPrivileges%"
  ECHO Next >> "%vbsGetPrivileges%"
  
  if '%cmdInvoke%'=='1' goto InvokeCmd 

  ECHO UAC.ShellExecute "!batchPath!", args, "", "runas", 1 >> "%vbsGetPrivileges%"
  goto ExecElevation

:InvokeCmd
  ECHO args = "/c """ + "!batchPath!" + """ " + args >> "%vbsGetPrivileges%"
  ECHO UAC.ShellExecute "%SystemRoot%\%winSysFolder%\cmd.exe", args, "", "runas", 1 >> "%vbsGetPrivileges%"

:ExecElevation
 "%SystemRoot%\%winSysFolder%\WScript.exe" "%vbsGetPrivileges%" %*
 exit /B

:gotPrivileges
 setlocal & cd /d %~dp0
 if '%1'=='ELEV' (del "%vbsGetPrivileges%" 1>nul 2>nul  &  shift /1)

 ::::::::::::::::::::::::::::
 ::START
 ::::::::::::::::::::::::::::
 goto continueElevated
)
:continueElevated
if [%elev%]==[n] (
	echo terminated installation process.
	echo terminate -1 'ERR_ELEVATION_PERMISSIONS_NOT_ALLOWED'
	exit /b 1
)

echo INFO: NPM AND NODE.JS IS REQUIRED FOR THIS INSTALLATION!
timeout 3 >nul
echo Checking compatibility...
if not exist "%appdata%\npm" (
	echo FATAL ERROR: NODE AND NPM IS NOT INSTALLED!
	echo Please visit https://www.nodejs.org/ to install node.js and npm to your computer.
	echo terminate -1
	exit /b 1

) 
cls 
color 2 
echo Node.js is installed on this device.
echo Installing nsharp...
timeout 2 >nul
echo Downloaded nsharp-lang, now installing console...
timeout 1 >nul
if exist "C:\n#-lang" (
	echo N# is already installed, updating...
	echo Info: you will be able to update nsharp using `nsharp /update` after v1.1.0
	echo after which this update process will be depreciated.
	echo REMOVEOLDVERSION NSHARP C:\n#-lang
	echo !FORCE
	rd "C:\n#-lang" /s /q >nul
        timeout 2 >nul
	echo removed old files, now installing the new INTERPRETER	
	
)
md "C:\n#-lang" >nul
echo INFO: nsharp will be installed to: 'C:\n#-lang'
timeout 2 >nul
xcopy /s "%~dp0" "C:\n#-lang" 
echo Installed all files to ~/c:/n#-lang/*.*
echo ============ NOW WRITING THE CONSOLE EXECUTOR... ================
timeout 3 >nul
cls 
echo ============ NOW WRITING THE CONSOLE EXECUTOR... ================
:: TODO: INSTALLER.js instead of a batch file to add global-support instead of just windows
echo @echo off > "C:\windows\System32\nsharp.bat"
echo node C:\n#-lang\start.js %* >> "C:\windows\System32\nsharp.bat"
echo exit /b %errorlevel% >> "C:\Windows\System32\nsharp.bat"
echo ...
timeout 2 >nul
cls 
echo ============ NOW WRITING THE CONSOLE EXECUTOR... ================
echo ...done
timeout 1 >nul
echo Installation complete! 
echo to use nsharp, execute:
echo 			nsharp <filename>.nsharp
echo To learn more information about nsharp, please see the help menu:
echo 		nsharp /help
echo To use the development console, execte:
echo		nsharp /devc

echo quitting the installer...
timeout 5 >nul
exit /b 0
