"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_bot_express_1 = require("discord-bot-express");
exports.CommandManager = discord_bot_express_1.CommandManager;
const discord_bot_express_2 = require("discord-bot-express");
discord_bot_express_2.CommandManager.setPrefix("!");
discord_bot_express_2.CommandManager.use(discord_bot_express_2.BotMiddleware.NotABot);
