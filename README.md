# ClipBot
Inspired by the original [Airhorn Bot](https://github.com/discord/airhornbot). Makes it possible to 
add new sounds and organize your own sound collections.

## Sound organization
Sounds are typically managed in a single directory named sounds. This folder contains all the 
sounds in the project. However, sound files are not directly added to the sounds folder, they must 
be added to a nested folder which acts as a "sound-group". Groups contain one or more sounds 
that are related to each other. A typical directory structure might look like this:

![](sound_layout.JPG?raw=true)

Notice that no sounds reside directly in the sounds directory. Instead they live in sound-group 
subdirectories.

A discord user can play a random sound from a sound-group in a voice channel by typing the bot's 
prefix and the name of the group:

```
!ayaya
```

This command will play a random sound from the ayaya sound-group (assuming '!' has been set to the 
bot's prefix). If a user specifically wanted to play the ayaya1.ogg soundfile they could type:

```
!ayaya ayaya1
```

In addition, a completely random sound from any soundgroup can be played by simply typing `!`.

See all available soundgroups by typing:

```
!help
```

A help message based on the sounds will be automatically generated:

```
Play a sound from airhornbot by sending a command in the discord chat! The  following is a list of commands:
!a, !adam, !ayaya, !bruh, !chaser, !dmg, !forme 
Commands may have multiple sounds. You can play specific sounds from a command by typing a command and then the sound's name after a space separator. A random sound from the command will be played if not specified. To play a random sound from all commands just type:
!
To get a list of sound names in a command:
!help soundCommand
Show this message again with:
!help
```

If you like to know more about the sounds in a specific soundGroup you can inquire with:

```
!help soundGroup
```

An autogenerated list of available sounds will be shown. 

Even though only .ogg files are shown in this example, a variety of different sound file formats are supported and can be 
utilized.


## Building docker image
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
Delete the .dockerignore file in the project directory. Next, in the same ClipBot 
directory, include your directory containing the sound groups as 'sounds'. Finally, run this command:

``` bash 
docker build -t clipBot .
```

All of your sounds should be included in the generated image. If you want to add or change the 
sounds you'll have to re-run the command to rebuild the image. To start the bot simply run:

``` bash
docker run -dit clipBot
```

## Attaching your sounds using a bind mount 
3. While in the clipBot directory build the docker container with:

``` bash
docker build -t clipBot .
```

4. If your folder of sounds is in the current directory (you must specify a full path for docker 
bind-mounts) run **one** of the following `docker run` commands (depending on your shell type) to 
start the docker container   

### Bash

``` bash
docker run -it -v $(PWD)/sounds:/usr/app/sounds clipBot
```

### Windows Powershell 

``` bash
docker run -it -v ${PWD}\sounds:/usr/app/sounds clipBot
```

Where sounds is a directory containing named directories of sound groups


## Stopping your bot
While your bot is running you should be able to run:

``` bash
docker ps
``` 

To get the id of the running container. Using this container id you can stop 
your bot like this:

``` bash
docker kill <container-id>
```
Where `<container-id>` is replaced with the actual id 

