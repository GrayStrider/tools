@echo off
setlocal enabledelayedexpansion

cd %1

rem FOR /F "delims=*" %%i IN ('git branch --contains master') DO CALL git checkout %%i

rem Populate the array with brahches containing "master"
set i=0
for /F "delims= " %%a in ('git branch --contains master') do (
	echo '%%a'
  if not %%a==master (
      if not %%a==* (
        set /A i+=1
        set children[!i!]=%%a
      )
  )
)
set amount=%i%

rem rebase master onto upstream
rem git checkout master && git merge upstream/master

for /L %%i in (1,1,%amount%) do (
	echo rebasing !children[%%i]!

	rem git rebase master !children[%%i]!

	)
