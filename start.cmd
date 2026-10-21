@echo off
cd /d "%~dp0"
start "" "http://localhost:4174/"
python -m http.server 4174 --bind 127.0.0.1
