"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secret = require("../src/secret.json"); //file with your bot credentials/token/etc
const CommandManager_1 = require("./CommandManager");
const discord_js_1 = require("discord.js");
const CardMain_1 = require("./commands/trading-card/CardMain");
var client = new discord_js_1.Client();
client.login(secret.token);
client.on("ready", () => {
    console.log("Online");
    CardMain_1.startCardGame();
});
client.on("message", (msg) => CommandManager_1.CommandManager.handleMessage(msg, client));
