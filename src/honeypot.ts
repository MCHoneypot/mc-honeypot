import { JoinEvent } from "./db/entities/JoinEvent";
import { PingEvent } from "./db/entities/PingEvent";
import { formatDate } from "./utils/date";
import { createServer, Server } from "minecraft-protocol";
import { config } from "./config";
import { saveIPInfo } from "./utils/ipinfo";

var mcServer: Server;

let ignoredPingIPs: string[] = [];
let ignoredLoginIPs: string[] = [];


export async function start()
{
    mcServer = createServer({
        'online-mode': config.server.onlineMode,
        host: '0.0.0.0',    
        port: config.server.port,        
        version: config.server.version,
        hideErrors: true,
    
        beforePing: (response, client) => // this can't be async
        {
            const { server } = config;

            response.description.text = server.motd;
            response.players.online = server.online;
            response.players.max = server.max;
            
            const ip = client.socket.remoteAddress;
            if(!ip)
            {
                console.error('IP not found in beforePing!');
                return;
            }

            if(ignoredPingIPs.includes(ip))
            {
                return;
            }

            ignoredPingIPs.push(ip);
            setTimeout(() => ignoredPingIPs = ignoredPingIPs.filter(a => a != ip), 5000);

            saveIPInfo(ip).then(() => PingEvent.create({ ip }).save());
            console.log(`IP ${ip} pinged the server at ${formatDate(new Date())}`);
        }
    });

    mcServer.on('login', async client => 
    {
        const kick = () => client.end(config.server.kickMsg);

        const ip = client.socket.remoteAddress;
        if(!ip)
        {
            console.error('IP not found in login!');
            return kick();
        }

        if(ignoredLoginIPs.includes(ip))
        {
            return kick();
        }

        ignoredLoginIPs.push(ip);
        setTimeout(() => ignoredLoginIPs = ignoredLoginIPs.filter(a => a != ip), 5000);

        await saveIPInfo(ip);
        await JoinEvent.create({ ip, username: client.username, uuid: client.uuid, crackedAccount: !config.server.onlineMode }).save();
        console.log(`Player ${client.username}(${client.uuid}) logged in with the IP ${ip} at ${formatDate(new Date())}`);

        kick();
    });
}
