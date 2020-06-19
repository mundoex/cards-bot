const secret = require("../src/secret.json"); //file with your bot credentials/token/etc
import {CommandManager}  from "./CommandManager";
import {Client,Message} from "discord.js";

var client=new Client();
client.login(secret.token);

client.on("ready",()=>{
    console.log("Online");
});

client.on("message",(msg:Message)=>CommandManager.handleMessage(msg, client));