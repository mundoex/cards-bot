const secret = require("../src/secret.json"); //file with your bot credentials/token/etc
import {CommandManager}  from "./CommandManager";
import {Client,Message} from "discord.js";
import { startCardGame } from "./commands/trading-card/main";

var client=new Client();
client.login(secret.token);

client.on("ready",()=>{
    console.log("Online");
    startCardGame();
});

client.on("message",(msg:Message)=>CommandManager.handleMessage(msg, client));