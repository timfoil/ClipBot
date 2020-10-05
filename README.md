# discord_clip_bot
Inspired by the original Airhornbot. Makes it possible to add new sounds and organize collections

## Building with sounds
1. Install docker or ensure it is currently installed and up to date
2. Create a soundbot profile on the discord developer portal. This is the 'user' your bot will show 
up as. Discord.js has a 
[great guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) 
on how to do this. Once you have your bot setup, rename file 'config.json.example' to 'config.json' 
and decide on a prefix character for your bot commands (I reccomend something like this  '!', '-', '>').
Then, replace the dummy token with your real token you received during the bot setup process. 
**REMINDER** Keep your token secret and do not commit it to version control.

At this point you have two options on how make your sounds accessable to the image. You can either 
include your sounds with the image or your can use a bind mount to attach sound-files to the image. 
Putting your sounds in the image is much easier to setup but, using a bindmount makes your image 
more configurable and keeps the image small. Skip to 'Attaching your sounds using a bind mount' if 
you would like use this method, otherwise read on.

## Including your sounds with the image
Delete the .dockerignore file in the project directory. Next, in the same discord_clip_bot 
directory, include your directory containing the sound groups as 'sounds'. Finally, run this command:

``` bash 
docker build -t discord_bot .
```

All of your sounds should be included in the generated image. If you want to add or change the 
sounds you'll have to re-run the command to rebuild the image. To start the bot simply run:

``` bash
docker run -dit discord_bot
```

## Attaching your sounds using a bind mount 
3. While in the discord_bot directory build the docker container with:

``` bash
docker build -t discord_bot .
```

4. If your folder of sounds is in the current directory (you must specify a full path for docker 
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



## Stopping your bot
While your bot is running you should be able to run:

``` bash
docker ps
``` 

from the commandline to get the id of the running container. Using this container id you can stop 
your bot like this:

``` bash
docker kill <container-id>
```
Where <container-id> is replaced with the actual id 

The directory structure should look like this
TODO IMAGE of directory structure
