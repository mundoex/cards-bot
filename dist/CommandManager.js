"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_bot_express_1 = require("discord-bot-express");
exports.CommandManager = discord_bot_express_1.CommandManager;
const discord_bot_express_2 = require("discord-bot-express");
const CardClient_1 = require("./commands/trading-card/client/CardClient");
const Middlewares_1 = require("./middlewares/Middlewares");
discord_bot_express_2.CommandManager.setPrefix("!");
discord_bot_express_2.CommandManager.use(discord_bot_express_2.BotMiddleware.NotABot);
const defaultFunction = (msg) => msg.channel.send("Not implemented try again later");
//###################### HELP COMMANDS ######################
discord_bot_express_2.CommandManager.command("help", CardClient_1.CardClient.help);
discord_bot_express_2.CommandManager.command("game help", CardClient_1.CardClient.gameHelp);
discord_bot_express_2.CommandManager.command("card help", CardClient_1.CardClient.cardHelp);
discord_bot_express_2.CommandManager.command("pack help", CardClient_1.CardClient.packHelp);
discord_bot_express_2.CommandManager.command("profile help", CardClient_1.CardClient.profileHelp);
discord_bot_express_2.CommandManager.command("player help", CardClient_1.CardClient.playerHelp);
discord_bot_express_2.CommandManager.command("shop help", CardClient_1.CardClient.shopHelp);
discord_bot_express_2.CommandManager.command("trader help", CardClient_1.CardClient.traderHelp);
//###################### ADMIN COMMANDS ######################
discord_bot_express_2.CommandManager.command("shop restock", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.shopRestock);
discord_bot_express_2.CommandManager.command("trader restock", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.traderRestock);
discord_bot_express_2.CommandManager.command("give :player gold :ammount", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.givePlayerGold);
discord_bot_express_2.CommandManager.command("give :player pack :packId", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.givePlayerPack);
discord_bot_express_2.CommandManager.command("give :player card :cardId", Middlewares_1.Middlewares.isDeveloper, CardClient_1.CardClient.givePlayerCard);
//###################### SHOP COMMANDS ######################
discord_bot_express_2.CommandManager.command("shop info", CardClient_1.CardClient.shopInfo);
discord_bot_express_2.CommandManager.command("shop buy :packName", CardClient_1.CardClient.shopBuy);
discord_bot_express_2.CommandManager.command("shop buyx :packName :ammount", CardClient_1.CardClient.shopBuyX);
//###################### TRADER COMMANDS ######################
discord_bot_express_2.CommandManager.command("trader info", CardClient_1.CardClient.traderInfo);
discord_bot_express_2.CommandManager.command("trader sell :cardName", CardClient_1.CardClient.traderSell);
discord_bot_express_2.CommandManager.command("trader reroll :cardName1 :cardName2 :cardName3", CardClient_1.CardClient.traderReroll);
discord_bot_express_2.CommandManager.command("trader guess :stars", CardClient_1.CardClient.traderGuess);
//###################### CARDS COMMANDS ######################
discord_bot_express_2.CommandManager.command("card info :cardValue", CardClient_1.CardClient.cardInfo);
discord_bot_express_2.CommandManager.command("card search :cardName", CardClient_1.CardClient.cardSearch);
//###################### PACKS COMMANDS ######################
discord_bot_express_2.CommandManager.command("pack info :packValue", CardClient_1.CardClient.packInfo);
//###################### PROFILE COMMANDS ######################
discord_bot_express_2.CommandManager.command("my profile", CardClient_1.CardClient.myProfile);
discord_bot_express_2.CommandManager.command("my cards", CardClient_1.CardClient.myCards);
discord_bot_express_2.CommandManager.command("my packs", CardClient_1.CardClient.myPacks);
discord_bot_express_2.CommandManager.command("profile :mention", CardClient_1.CardClient.profile);
discord_bot_express_2.CommandManager.command("profile cards :mention", CardClient_1.CardClient.profileCards);
discord_bot_express_2.CommandManager.command("profile packs :mention", CardClient_1.CardClient.profilePacks);
discord_bot_express_2.CommandManager.command("leaderboard gold", CardClient_1.CardClient.leaderboardGold);
discord_bot_express_2.CommandManager.command("leaderboard cards", CardClient_1.CardClient.leaderboardCards);
discord_bot_express_2.CommandManager.command("leaderboard stars", CardClient_1.CardClient.leaderboardStars);
//###################### PLAYER COMMANDS ######################
discord_bot_express_2.CommandManager.command("wish :cardName", CardClient_1.CardClient.wish);
discord_bot_express_2.CommandManager.command("trade :userName :cardName", (msg) => msg.channel.send("Not implemented"));
discord_bot_express_2.CommandManager.command("test", CardClient_1.CardClient.claimableCardPost);
