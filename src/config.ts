import {  existsSync, readFileSync, writeFileSync } from 'fs';
import toml from 'toml';

const filePath = "./files/config.toml";

export interface ServerConfig
{
    port: number;
    motd: string;
    online: number;
    max: number;
    version: string;
    kickMsg: string;
    onlineMode: boolean;
}

export interface LoggingConfig
{
    joinDiscordWebhook: string;
    pingDiscordWebhook: string;
}

export interface Config
{
    server: ServerConfig;
    logging: LoggingConfig;
}

export var config: Config;

export function loadConfig()
{

    if(!existsSync(filePath))
    {
        createDefaultConfig();
    }

    try 
    {
        config = toml.parse(readFileSync(filePath, 'utf-8'));
    } catch (e) 
    {
        console.error(`Failed to parse config file!: line ${e.line}, column: ${e.column}: ${e.message}`);
    }

    console.log('Loaded config file');

    if(process.env.PORT)
    {
        const newPort = parseInt(process.env.PORT);
        if(!isNaN(newPort))
        {
            config.server.port = newPort;
            console.log('Read port from env: ' + newPort);
        }
    }
}

function createDefaultConfig()
{
    console.log('Created default config file, please go and edit it to fit your needs!');

    writeFileSync(filePath, 
`# This is a TOML configuration file for MCHoneypot

[server]
# The port to listen on.
port = 25565

# MOTD to show, this is the default MOTD for a Vanilla Minecraft server.
motd = "A Minecraft Server"

# Online player count.
online = 0

# Max player count.
max = 20

# Minecraft version, supports whatever https://github.com/PrismarineJS/node-minecraft-protocol does.
version = "1.18.1"

# Kick message if a player joins.
kickMsg = "You are not white-listed on this server!"

# Authenticate usernames.
onlineMode = true

[logging]
# Discord webhook URL to send join events to, leave blank to disable.
joinDiscordWebhook = ""

# Discord webhook URL to send ping events to, leave blank to disable(WARNING: this can get ratelimited easily by Discord!).
pingDiscordWebhook = ""

`);
}
