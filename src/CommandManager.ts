export {CommandManager} from "discord-bot-express";
import {CommandManager, BotMiddleware, TriggerBuilder} from "discord-bot-express";

CommandManager.setPrefix("!");
CommandManager.use(BotMiddleware.NotABot);

