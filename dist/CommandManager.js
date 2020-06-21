"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_bot_express_1 = require("discord-bot-express");
exports.CommandManager = discord_bot_express_1.CommandManager;
const discord_bot_express_2 = require("discord-bot-express");
const CardClient_1 = require("./commands/trading-card/client/CardClient");
const Middlewares_1 = require("./middlewares/Middlewares");
discord_bot_express_2.CommandManager.setPrefix("!");
discord_bot_express_2.CommandManager.use(discord_bot_express_2.BotMiddleware.NotABot);
//###################### HELP COMMANDS ######################
discord_bot_express_2.CommandManager.command("help", CardClient_1.CardClient.help); //check
discord_bot_express_2.CommandManager.command("game help", CardClient_1.CardClient.gameHelp); //check
discord_bot_express_2.CommandManager.command("card help", CardClient_1.CardClient.cardHelp); //check
discord_bot_express_2.CommandManager.command("pack help", CardClient_1.CardClient.packHelp); //check
discord_bot_express_2.CommandManager.command("profile help", CardClient_1.CardClient.profileHelp); //check
discord_bot_express_2.CommandManager.command("player help", CardClient_1.CardClient.playerHelp); //check
discord_bot_express_2.CommandManager.command("shop help", CardClient_1.CardClient.shopHelp); //check
discord_bot_express_2.CommandManager.command("trader help", CardClient_1.CardClient.traderHelp); //check
//###################### ADMIN COMMANDS ######################
discord_bot_express_2.CommandManager.command("shop restock", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.shopRestock); //check
discord_bot_express_2.CommandManager.command("trader restock", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.traderRestock); //check
discord_bot_express_2.CommandManager.command("give :player gold :ammount", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.givePlayerGold); //check
discord_bot_express_2.CommandManager.command("give :player pack :packId", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.givePlayerPack); //check
discord_bot_express_2.CommandManager.command("give :player card :cardId", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.givePlayerCard); //check
discord_bot_express_2.CommandManager.command("give :player claims :claims", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.givePlayerClaims); //check
discord_bot_express_2.CommandManager.command("give :player trades :trades", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.givePlayerTrades); //check
discord_bot_express_2.CommandManager.command("give :player luck :luckModifier", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.givePlayerLuck); //check
//###################### SHOP COMMANDS ######################
discord_bot_express_2.CommandManager.command("shop info", CardClient_1.CardClient.shopInfo); //check
discord_bot_express_2.CommandManager.command("shop buy :packName*", CardClient_1.CardClient.shopBuy); //check
discord_bot_express_2.CommandManager.command("shop buyx :ammount :packName*", CardClient_1.CardClient.shopBuyX); //check
//###################### TRADER COMMANDS ######################
discord_bot_express_2.CommandManager.command("trader info", CardClient_1.CardClient.traderInfo); //check
discord_bot_express_2.CommandManager.command("trader sell :cardName", CardClient_1.CardClient.traderSell);
discord_bot_express_2.CommandManager.command("trader reroll :cardName1 :cardName2 :cardName3", CardClient_1.CardClient.traderReroll);
discord_bot_express_2.CommandManager.command("trader guess :stars", CardClient_1.CardClient.traderGuess);
//###################### CARDS COMMANDS ######################
discord_bot_express_2.CommandManager.command("card info :cardValue*", CardClient_1.CardClient.cardInfo); //check
discord_bot_express_2.CommandManager.command("card search :cardName", CardClient_1.CardClient.cardSearch); //check
//###################### PACKS COMMANDS ######################
discord_bot_express_2.CommandManager.command("pack info :packValue*", CardClient_1.CardClient.packInfo); //check
//###################### PROFILE COMMANDS ######################
discord_bot_express_2.CommandManager.command("my profile", CardClient_1.CardClient.myProfile); //check
discord_bot_express_2.CommandManager.command("my cards", CardClient_1.CardClient.myCards); //check
discord_bot_express_2.CommandManager.command("my packs", CardClient_1.CardClient.myPacks); //check
discord_bot_express_2.CommandManager.command("profile :mention", CardClient_1.CardClient.profile); //check
discord_bot_express_2.CommandManager.command("profile cards :mention", CardClient_1.CardClient.profileCards); //check
discord_bot_express_2.CommandManager.command("profile packs :mention", CardClient_1.CardClient.profilePacks); //check
discord_bot_express_2.CommandManager.command("leaderboard gold", CardClient_1.CardClient.leaderboardGold);
discord_bot_express_2.CommandManager.command("leaderboard cards", CardClient_1.CardClient.leaderboardCards);
discord_bot_express_2.CommandManager.command("leaderboard stars", CardClient_1.CardClient.leaderboardStars);
//###################### PLAYER COMMANDS ######################
discord_bot_express_2.CommandManager.command("wish :cardName", CardClient_1.CardClient.wish); //check
discord_bot_express_2.CommandManager.command("open pack :packName*", CardClient_1.CardClient.packOpen); //check
discord_bot_express_2.CommandManager.command("trade :userName :cardName", (msg) => msg.channel.send("Not implemented"));
