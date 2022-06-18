@echo off
node %~dp0start.js %*
::@worker-index / continue
exit /b %ERRORLEVEL%
#!env/bin/node