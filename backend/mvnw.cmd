@echo off
setlocal

set "MAVEN_VERSION=3.9.6"
set "M2_HOME=%USERPROFILE%\.m2\wrapper\dists\apache-maven-%MAVEN_VERSION%-bin"

if not exist "%M2_HOME%\apache-maven-%MAVEN_VERSION%\bin\mvn.cmd" (
    echo Downloading Maven %MAVEN_VERSION%...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $url = 'https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/%MAVEN_VERSION%/apache-maven-%MAVEN_VERSION%-bin.zip'; $dest = '%TEMP%\maven.zip'; Invoke-WebRequest -Uri $url -OutFile $dest; Expand-Archive -Path $dest -DestinationPath '%M2_HOME%' -Force; Remove-Item -Path $dest"
)

"%M2_HOME%\apache-maven-%MAVEN_VERSION%\bin\mvn.cmd" %*
