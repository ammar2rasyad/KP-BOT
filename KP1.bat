cls
@ECHO OFF
ECHO Pulling repo
git pull origin main
PAUSE

cls
ECHO Running KP Session
npm run kp1
PAUSE