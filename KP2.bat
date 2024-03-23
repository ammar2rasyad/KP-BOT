cls
@ECHO OFF
ECHO Pulling repo
git pull origin main
ECHO Repo up to date
PAUSE

ECHO Running KP Session
npm run kp2
PAUSE