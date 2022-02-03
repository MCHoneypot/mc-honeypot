import { IPInfo } from "../db/entities/IPInfo";
import { JoinEvent } from "../db/entities/JoinEvent";
import { PingEvent } from "../db/entities/PingEvent";

export interface Stats
{
    uniqueIPs: number;
    pingedAmt: number;
    joinedAmt: number;
}

export async function getStats(): Promise<Stats>
{
    
    try 
    {
        const pingedAmt = await PingEvent.count({});
        const joinedAmt = await JoinEvent.count({});
        const uniqueIPs = await IPInfo.count({});

        return {
            uniqueIPs,
            pingedAmt,
            joinedAmt
        }
    } catch (error) 
    {
        console.error(error);
        console.error(`failed to get stats: ${error.message}`);    
    }

    return {
        uniqueIPs: 0,
        pingedAmt: 0,
        joinedAmt: 0
    }
}

export async function formatStats(): Promise<string>
{
    const { uniqueIPs, pingedAmt, joinedAmt } = await getStats();

    return `I have been pinged ${pingedAmt} times and joined ${joinedAmt} times from ${uniqueIPs} distinct IP's`;
}
