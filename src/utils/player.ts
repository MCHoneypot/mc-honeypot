//@ts-ignore
import fetch from 'node-fetch';  

export async function isUUIDValid(uuid: string): Promise<boolean>
{
    try 
    {
        const res = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);

        if(res.status == 204)
        {
            return false;
        } else if(res.status == 200)
        {
            return true;
        }
    } catch (error) 
    {
        console.log(`failed to validate uuid ${uuid}, reason: ${error.message}`);   
    }

    return false;
}
