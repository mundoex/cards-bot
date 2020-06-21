export {CommandManager} from "discord-bot-express";
import {CommandManager, BotMiddleware} from "discord-bot-express";
import { CardClient } from "./commands/trading-card/client/CardClient";
import { Message } from "discord.js";
import { Middlewares } from "./middlewares/Middlewares";

CommandManager.setPrefix("!");
CommandManager.use(BotMiddleware.NotABot);

const defaultFunction=(msg:Message)=>msg.channel.send("Not implemented try again later");

//###################### HELP COMMANDS ######################
CommandManager.command("help",CardClient.help);
CommandManager.command("game help",CardClient.gameHelp);
CommandManager.command("card help",CardClient.cardHelp);
CommandManager.command("pack help",CardClient.packHelp);
CommandManager.command("profile help",CardClient.profileHelp);
CommandManager.command("player help",CardClient.playerHelp);
CommandManager.command("shop help",CardClient.shopHelp);
CommandManager.command("trader help",CardClient.traderHelp);
//###################### ADMIN COMMANDS ######################
CommandManager.command("shop restock",Middlewares.isDeveloper,CardClient.shopRestock);
CommandManager.command("trader restock",Middlewares.isDeveloper,CardClient.traderRestock);
CommandManager.command("give :player gold :ammount",Middlewares.isDeveloper,CardClient.givePlayerGold);
CommandManager.command("give :player pack :packId",Middlewares.isDeveloper,CardClient.givePlayerPack);
CommandManager.command("give :player card :cardId",Middlewares.isDeveloper,CardClient.givePlayerCard);
//###################### SHOP COMMANDS ######################
CommandManager.command("shop info",CardClient.shopInfo);
CommandManager.command("shop buy :packName",CardClient.shopBuy);
CommandManager.command("shop buyx :packName :ammount",CardClient.shopBuyX);
//###################### TRADER COMMANDS ######################
CommandManager.command("trader info",CardClient.traderInfo);
CommandManager.command("trader sell :cardName",CardClient.traderSell);
CommandManager.command("trader reroll :cardName1 :cardName2 :cardName3",CardClient.traderReroll);
CommandManager.command("trader guess :stars",CardClient.traderGuess);
//###################### CARDS COMMANDS ######################
CommandManager.command("card info :cardValue",CardClient.cardInfo);
CommandManager.command("card search :cardName",CardClient.cardSearch);
//###################### PACKS COMMANDS ######################
CommandManager.command("pack info :packValue",CardClient.packInfo);
//###################### PROFILE COMMANDS ######################
CommandManager.command("my profile",CardClient.myProfile);
CommandManager.command("my cards",CardClient.myCards);
CommandManager.command("my packs",CardClient.myPacks);
CommandManager.command("profile :mention",CardClient.profile);
CommandManager.command("profile cards :mention",CardClient.profileCards);
CommandManager.command("profile packs :mention",CardClient.profilePacks);
CommandManager.command("leaderboard gold",CardClient.leaderboardGold);
CommandManager.command("leaderboard cards",CardClient.leaderboardCards);
CommandManager.command("leaderboard stars",CardClient.leaderboardStars);
//###################### PLAYER COMMANDS ######################
CommandManager.command("wish :cardName",CardClient.wish);
CommandManager.command("trade :userName :cardName",(msg:Message)=>msg.channel.send("Not implemented"));
CommandManager.command("test",CardClient.claimableCardPost);