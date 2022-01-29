# MC Honeypot
A Minecraft server that is a honeypot, written in TypeScript.

## Installation
## Docker

Run with 
```bash
docker run --name honeypot --user $(whoami) -d -p 25565:25565 -v /home/$(whoami)/honeypot:/usr/src/app/files mchoneypot/mc-honeypot
```

This will run the docker image on the default Minecraft port and put the config file and database file in your user home directory.

## Manual
You need node version 14 or higher in order to run this program.

```bash
git clone https://github.com/MCHoneypot/mc-honeypot.git
cd mc-honeypot
npm i
npm run build
NODE_ENV=production npm start
```

## Configuration
The default configuration file looks like this

```toml
# This is a TOML configuration file for MCHoneypot

[server]
# The port to listen on
port = 25565

# MOTD to show, this is the default MOTD for a Vanilla Minecraft server
motd = "A Minecraft Server"

# Online player count
online = 0

# Max player count
max = 20

# Minecraft version, supports whatever https://github.com/PrismarineJS/node-minecraft-protocol does
version = "1.18.1"

# Kick message if a player joins
kickMsg = "You are not white-listed on this server!"

# Authenticate usernames
onlineMode = true

```

NOT OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
