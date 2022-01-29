import { existsSync, readFileSync, writeFileSync } from 'fs';
import toml from 'toml';

const filePath = "./config.toml";

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

export interface Config
{
    server: ServerConfig;
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
}

function createDefaultConfig()
{
    console.log('Created default config file, please go and edit it to fit your needs!');

    writeFileSync(filePath, 
`# This is a TOML configuration file for MCHoneypot

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
`);
}
