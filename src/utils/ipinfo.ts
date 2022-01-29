//@ts-ignore
import fetch from 'node-fetch';
import { IPInfo } from '../db/entities/IPInfo';

export interface IPInfoResult
{
    ip: string;
    hostname: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
    error?: string;
}


export async function getIPInfo(ip: string, attempts: number = 0): Promise<IPInfoResult | undefined>
{
    try 
    {
        const res = await fetch(`https://ipinfo.io/${ip}/json`);
        let result = await res.json() as IPInfoResult; 

        if(result == undefined)
        {
            throw new Error('IPinfo result was undefined');
        }

        if(result.error)
        {
            throw new Error('IPinfo returned an error!: ' + result.error);
        }

        return result;
    } catch (error) 
    {
        console.error(error);
        console.error(`error whiel fetching ipinfo for ip ${ip}, attempt: ${attempts}`);
        if(attempts >= 5)
        {
            console.error(`retried 5 times and failed to retrieve ipinfo for ${ip}`);
            return undefined;
        }

        return await getIPInfo(ip, ++attempts);
    }
}

export async function saveIPInfo(ip: string): Promise<IPInfo | undefined>
{
    if(ip == '::1' || ip == 'localhost' || ip == '127.0.0.1')
    {
        console.log('cant fetch ipinfo for local ip');
        return;
    }

    const find = await IPInfo.findOne({ ip });
    if(find)
    {
        return find;
    }

    const ipinfo = await getIPInfo(ip);
    if(!ipinfo)
    {
        console.error(`failed to retreive ipinfo for ip: ${ip}`);
    }

    const secondFind = await IPInfo.findOne({ ip });
    if(secondFind) // check again because apprently the minecraft client pings a server before joining?
    {
        return secondFind;
    }
    
    return await IPInfo.create({ 
        ip,
        city: ipinfo!.city,
        region: ipinfo!.region,
        country: ipinfo!.country,
        loc: ipinfo!.loc,
        org: ipinfo!.org,
        postal: ipinfo!.postal,
        timezone: ipinfo!.timezone
     }).save();
}
