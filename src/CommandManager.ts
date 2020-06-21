export {CommandManager} from "discord-bot-express";
import {CommandManager, BotMiddleware} from "discord-bot-express";
import { CardClient } from "./commands/trading-card/client/CardClient";
import { Message } from "discord.js";
import { Middlewares } from "./middlewares/Middlewares";

CommandManager.setPrefix("!");
CommandManager.use(BotMiddleware.NotABot);

const defaultFunction=(msg:Message)=>msg.channel.send("Not implemented try again later");

//###################### HELP COMMANDS ######################
CommandManager.command("help",CardClient.help); //check
CommandManager.command("game help",CardClient.gameHelp);    //check
CommandManager.command("card help",CardClient.cardHelp);    //check
CommandManager.command("pack help",CardClient.packHelp);    //check
CommandManager.command("profile help",CardClient.profileHelp);  //check
CommandManager.command("player help",CardClient.playerHelp);    //check
CommandManager.command("shop help",CardClient.shopHelp);    //check
CommandManager.command("trader help",CardClient.traderHelp);    //check
//###################### ADMIN COMMANDS ######################
CommandManager.command("shop restock",Middlewares.isDeveloper,CardClient.shopRestock);  //check
CommandManager.command("trader restock",Middlewares.isDeveloper,CardClient.traderRestock);  //check
CommandManager.command("give :player gold :ammount",Middlewares.isDeveloper,CardClient.givePlayerGold); //check
CommandManager.command("give :player pack :packId",Middlewares.isDeveloper,CardClient.givePlayerPack);  //check
CommandManager.command("give :player card :cardId",Middlewares.isDeveloper,CardClient.givePlayerCard);  //check
CommandManager.command("give :player claims :claims",Middlewares.isDeveloper,CardClient.givePlayerClaims);  //check
CommandManager.command("give :player trades :trades",Middlewares.isDeveloper,CardClient.givePlayerTrades);  //check
CommandManager.command("give :player luck :luckModifier",Middlewares.isDeveloper,CardClient.givePlayerLuck);    //check
//###################### SHOP COMMANDS ######################
CommandManager.command("shop info",CardClient.shopInfo);    //check
CommandManager.command("shop buy :packName*",CardClient.shopBuy);
CommandManager.command("shop buyx :ammount :packName*",CardClient.shopBuyX);
//###################### TRADER COMMANDS ######################
CommandManager.command("trader info",CardClient.traderInfo);    //check
CommandManager.command("trader sell :cardName",CardClient.traderSell);
CommandManager.command("trader reroll :cardName1 :cardName2 :cardName3",CardClient.traderReroll);
CommandManager.command("trader guess :stars",CardClient.traderGuess);
//###################### CARDS COMMANDS ######################
CommandManager.command("card info :cardValue",CardClient.cardInfo);     //half check
CommandManager.command("card search :cardName",CardClient.cardSearch);      //check
//###################### PACKS COMMANDS ######################
CommandManager.command("pack info :packValue",CardClient.packInfo);        //half check
//###################### PROFILE COMMANDS ######################
CommandManager.command("my profile",CardClient.myProfile);      //check
CommandManager.command("my cards",CardClient.myCards);      //no check
CommandManager.command("my packs",CardClient.myPacks);
CommandManager.command("profile :mention",CardClient.profile);      //no check
CommandManager.command("profile cards :mention",CardClient.profileCards);
CommandManager.command("profile packs :mention",CardClient.profilePacks);
CommandManager.command("leaderboard gold",CardClient.leaderboardGold);
CommandManager.command("leaderboard cards",CardClient.leaderboardCards);
CommandManager.command("leaderboard stars",CardClient.leaderboardStars);
//###################### PLAYER COMMANDS ######################
CommandManager.command("wish :cardName",CardClient.wish);
CommandManager.command("open pack :packName*",CardClient.packOpen);
CommandManager.command("trade :userName :cardName",(msg:Message)=>msg.channel.send("Not implemented"));
CommandManager.command("test",CardClient.claimableCardPost);