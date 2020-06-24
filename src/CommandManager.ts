export {CommandManager} from "discord-bot-express";
import {CommandManager, BotMiddleware} from "discord-bot-express";
import { Message } from "discord.js";
import { Middlewares } from "./middlewares/Middlewares";
import { HelpController } from "./commands/trading-card/controllers/HelpController";
import { AdminController } from "./commands/trading-card/controllers/AdminController";
import { ShopController } from "./commands/trading-card/controllers/ShopController";
import { TraderController } from "./commands/trading-card/controllers/TraderController";
import { CardController } from "./commands/trading-card/controllers/CardController";
import { PackController } from "./commands/trading-card/controllers/PackController";
import { ProfileController } from "./commands/trading-card/controllers/ProfileController";
import { PlayerController } from "./commands/trading-card/controllers/PlayerController";

CommandManager.setPrefix("!");
CommandManager.use(BotMiddleware.NotABot);

//###################### HELP COMMANDS ######################
CommandManager.command("help",HelpController.help); //check
CommandManager.command("game help",HelpController.gameHelp);    //check
CommandManager.command("card help",HelpController.cardHelp);    //check
CommandManager.command("pack help",HelpController.packHelp);    //check
CommandManager.command("profile help",HelpController.profileHelp);  //check
CommandManager.command("player help",HelpController.playerHelp);    //check
CommandManager.command("shop help",HelpController.shopHelp);    //check
CommandManager.command("trader help",HelpController.traderHelp);    //check
//###################### ADMIN COMMANDS ######################
CommandManager.command("shop restock",Middlewares.isDeveloper,AdminController.shopRestock);  //check
CommandManager.command("trader restock",Middlewares.isDeveloper,AdminController.traderRestock);  //check
CommandManager.command("give :player gold :ammount",Middlewares.isDeveloper,AdminController.givePlayerGold); //check
CommandManager.command("give :player pack :packId",Middlewares.isDeveloper,AdminController.givePlayerPack);  //check
CommandManager.command("give :player card :cardId",Middlewares.isDeveloper,AdminController.givePlayerCard);  //check
CommandManager.command("give :player claims :claims",Middlewares.isDeveloper,AdminController.givePlayerClaims);  //check
CommandManager.command("give :player trades :trades",Middlewares.isDeveloper,AdminController.givePlayerTrades);  //check
CommandManager.command("give :player luck :luckModifier",Middlewares.isDeveloper,AdminController.givePlayerLuck);    //check
CommandManager.command("giveall gold :ammount",Middlewares.isDeveloper,AdminController.giveAllGold); //check
CommandManager.command("giveall rewards :times",Middlewares.isDeveloper,AdminController.giveAllRewards); //check
//###################### SHOP COMMANDS ######################
CommandManager.command("shop info",ShopController.shopInfo);    //check
CommandManager.command("shop buy :packName*",ShopController.shopBuy);   //check
CommandManager.command("shop buyx :ammount :packName*",ShopController.shopBuyX);    //check
//###################### TRADER COMMANDS ######################
CommandManager.command("trader info",TraderController.traderInfo);    //check
CommandManager.command("trader sell :cardName*",TraderController.traderSell);
CommandManager.command("trader reroll :cards*",TraderController.traderReroll);
CommandManager.command("trader guess :stars",TraderController.traderGuess);
//###################### CARDS COMMANDS ######################
CommandManager.command("card info :cardValue*",CardController.cardInfo);     //check
CommandManager.command("card search :cardName",CardController.cardSearch);      //check
//###################### PACKS COMMANDS ######################
CommandManager.command("pack info :packValue*",PackController.packInfo);        //check
CommandManager.command("pack list",PackController.packList);        //check
//###################### PROFILE COMMANDS ######################
CommandManager.command("my profile",ProfileController.myProfile);      //check
CommandManager.command("my cards",ProfileController.myCards);      //check
CommandManager.command("my packs",ProfileController.myPacks);  //check
CommandManager.command("profile :mention",ProfileController.profile);      //check
CommandManager.command("profile cards :mention",ProfileController.profileCards);   //check
CommandManager.command("profile packs :mention",ProfileController.profilePacks);   //check
//###################### PLAYER COMMANDS ######################
CommandManager.command("wish :cardName",PlayerController.wish);   //check
CommandManager.command("open pack :packName*",PlayerController.packOpen); //check
CommandManager.command("trade :mention :cards*",PlayerController.trade);