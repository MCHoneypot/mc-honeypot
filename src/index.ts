import "reflect-metadata";
import { config, loadConfig } from "./config";
import { __PROD__ } from "./constants";
import { connectToDB } from "./db";
import { start } from "./honeypot";

const main = async () =>
{
    console.log("MCHoneypot starting, prod: " + __PROD__);
    await connectToDB();
    loadConfig();
    await start();
    console.log(`Started on port ${config.server.port}!`);
}

main()
