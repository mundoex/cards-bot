const secret = require("../src/secret.json"); //file with your bot credentials/token/etc
import {CommandManager}  from "./CommandManager";
import {Client,Message} from "discord.js";
import { startCardGame } from "./commands/trading-card/main";
import { Broadcaster } from "./commands/trading-card/broadcaster/Broadcaster";
import { PackManager } from "./commands/trading-card/packs/PackManager";
import { CardController } from "./commands/trading-card/controllers/CardController";
import { CardEmbeds } from "./commands/trading-card/embeds/CardEmbeds";

const MY_GUILD_ID="640568788869185546";
var client=new Client();
client.login(secret.token);

client.on("ready",()=>{
    console.log("Online");
    Broadcaster.getInstance().init(client.guilds.cache.get(MY_GUILD_ID));
    Broadcaster.getInstance().broadcast("Online");
    startCardGame();
});

client.on("message",(msg:Message)=>CommandManager.handleMessage(msg, client));