import DiscordWebhook from "discord-webhook-ts";
import { config } from "../config";

export async function sendJoinEvent(ip: string, username: string, country: string, uuid: string)
{
    if(!config.logging.joinDiscordWebhook)
    {
        return;
    }

    const discordClient = new DiscordWebhook(config.logging.joinDiscordWebhook);
    discordClient.execute({
        embeds: [
            {
                title: 'MCHoneypot | Join Event',
                description: `IP: ${ip}`,
            },
            {
                fields: [
                    {
                        name: 'Username',
                        value: username,
                    },
                    {
                        name: 'UUID',
                        value: uuid,
                    },
                    {
                        name: 'Country',
                        value: country,
                    }
                ]
            }
        ]
    }).then((_) => {
        
    })
}

export async function sendPingEvent(ip: string, country: string)
{
    if(!config.logging.pingDiscordWebhook)
    {
        return;
    }

    const discordClient = new DiscordWebhook(config.logging.pingDiscordWebhook);
    discordClient.execute({
        embeds: [
            {
                title: 'MCHoneypot | Ping Event',
                description: `IP: ${ip}`,
            },
            {
                fields: [
                    {
                        name: 'Country',
                        value: country,
                    } 
                ]
            }
        ]
    }).then((_) => {
        
    })
}
