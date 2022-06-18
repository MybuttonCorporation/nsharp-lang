@echo off
node %~dp0decodeScript.js %*
exit /b %ERRORLEVEL%
#!env/bin/node
