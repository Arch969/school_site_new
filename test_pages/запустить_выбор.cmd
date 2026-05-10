@echo off
cd /d "%~dp0"
start "" "http://localhost:5177/"
node selection-server.mjs
