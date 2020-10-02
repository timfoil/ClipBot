# discord_clip_bot
Inspired by the original Airhornbot. Makes it possible to add new sounds and organize collections

## Building
1. Install docker or ensure it is currently installed and up to date
2. While in the discord_bot directory build the docker container with:

``` bash
docker build -t discord_bot .
```

3. If your folder of sounds is in the current directory (you must specify a full path for docker 
bind-mounts) run **one** of the following `docker run` commands (depending on your shell type) to 
start the docker container   

### Bash

``` bash
docker run -it -v $(PWD)/sounds:/usr/app/sounds discord_bot
```

### Windows Powershell 

``` bash
docker run -it -v ${PWD}\sounds:/usr/app/sounds discord_bot
```

Where sounds is a directory containing named directories of sound groups

The directory structure should look like this
TODO IMAGE of directory structure
