export {CommandManager} from "discord-bot-express";
import {CommandManager, BotMiddleware} from "discord-bot-express";
import { Middlewares } from "./middlewares/Middlewares";
import { HelpController } from "./commands/trading-card/controllers/HelpController";
import { AdminController } from "./commands/trading-card/controllers/AdminController";
import { ShopController } from "./commands/trading-card/controllers/ShopController";
import { TraderController } from "./commands/trading-card/controllers/TraderController";
import { CardController } from "./commands/trading-card/controllers/CardController";
import { PackController } from "./commands/trading-card/controllers/PackController";
import { ProfileController } from "./commands/trading-card/controllers/ProfileController";
import { PlayerController } from "./commands/trading-card/controllers/PlayerController";
import { LeaderboardController } from "./commands/trading-card/controllers/LeaderboardController";
import { AchievmentController } from "./commands/trading-card/controllers/AchievmentController";

CommandManager.setPrefix("!");
CommandManager.use(BotMiddleware.NotABot);

//###################### HELP COMMANDS ######################
CommandManager.command("help",HelpController.help); //check
CommandManager.command("game help",HelpController.gameHelp);    //check pretty
CommandManager.command("card help",HelpController.cardHelp);    //check
CommandManager.command("pack help",HelpController.packHelp);    //check
CommandManager.command("profile help",HelpController.profileHelp); //check pretty update
CommandManager.command("player help",HelpController.playerHelp);   //check update
CommandManager.command("shop help",HelpController.shopHelp);    //check update
CommandManager.command("trader help",HelpController.traderHelp);   //check update 
//###################### ADMIN COMMANDS ######################
CommandManager.command("shop restock",Middlewares.isDeveloper,AdminController.shopRestock);  //check
CommandManager.command("trader restock",Middlewares.isDeveloper,AdminController.traderRestock);   //check
CommandManager.command("give :player gold :ammount",Middlewares.isDeveloper,AdminController.givePlayerGold); //check
CommandManager.command("give :player pack :packId :ammount",Middlewares.isDeveloper,AdminController.givePlayerPack); //check
CommandManager.command("give :player card :cardId :ammount",Middlewares.isDeveloper,AdminController.givePlayerCard);  //checkk
CommandManager.command("give :player claims :claims",Middlewares.isDeveloper,AdminController.givePlayerClaims);  //check
CommandManager.command("give :player priority claims :claims",Middlewares.isDeveloper,AdminController.givePlayerPriorityClaims);  //check
CommandManager.command("give :player exp :exp",Middlewares.isDeveloper,AdminController.givePlayerExperience);  //check
CommandManager.command("give :player trades :trades",Middlewares.isDeveloper,AdminController.givePlayerTrades);  //check
CommandManager.command("give :player modifier luck :modifier",Middlewares.isDeveloper,AdminController.givePlayerLuckModifier);    //check
CommandManager.command("give :player modifier gold :modifier",Middlewares.isDeveloper,AdminController.givePlayeGoldModifier);    //check
CommandManager.command("give :player modifier exp :modifier",Middlewares.isDeveloper,AdminController.givePlayeExpModifier);    //check
CommandManager.command("giveall gold :ammount",Middlewares.isDeveloper,AdminController.giveAllGold); //check
CommandManager.command("giveall rewards :times",Middlewares.isDeveloper,AdminController.giveAllRewards); //check
<<<<<<< HEAD
CommandManager.command("spawn pack :packId",Middlewares.isDeveloper,AdminController.spawnPack); 
CommandManager.command("spawn ultra",Middlewares.isDeveloper,AdminController.spawnUltra); 
=======
CommandManager.command("spawn pack :packId",Middlewares.isDeveloper,AdminController.spawnPack); //check
CommandManager.command("remove :player card :cardId",Middlewares.isDeveloper,AdminController.removePlayerCard); //check

>>>>>>> c2a126510ab934820445335bfaba35a23792c019
//###################### SHOP COMMANDS ######################
CommandManager.command("shop info",ShopController.shopInfo);
CommandManager.command("si",ShopController.shopInfo);  
CommandManager.command("shop buy :packName*",ShopController.shopBuy);
CommandManager.command("sb :packName*",ShopController.shopBuy); 
CommandManager.command("shop buyx :ammount :packName*",ShopController.shopBuyX);
CommandManager.command("s buyx :ammount :packName*",ShopController.shopBuyX);     
CommandManager.command("shop2 info",ShopController.shop2Info);
CommandManager.command("si2",ShopController.shop2Info);      
CommandManager.command("shop2 buy :packName*",ShopController.shop2Buy);
CommandManager.command("s2b :packName*",ShopController.shop2Buy); 
CommandManager.command("shop2 buyx :ammount :packName*",ShopController.shop2BuyX);    
CommandManager.command("s2 buyx :ammount :packName*",ShopController.shop2BuyX);    
//###################### TRADER COMMANDS ######################
CommandManager.command("trader info",TraderController.traderInfo);    
CommandManager.command("ti",TraderController.traderInfo); 
CommandManager.command("trader sell :cardName*",TraderController.traderSell);
CommandManager.command("ts :cardName*",TraderController.traderSell);
CommandManager.command("trader check",TraderController.traderCheckIfPlayerHasBounties);
CommandManager.command("tc",TraderController.traderCheckIfPlayerHasBounties);
CommandManager.command("trader2 info",TraderController.trader2Info);    
CommandManager.command("trader2 sell :cardName*",TraderController.trader2Sell);
CommandManager.command("ts2 :cardName*",TraderController.trader2Sell);
CommandManager.command("trader2 check",TraderController.trader2CheckIfPlayerHasBounties);
CommandManager.command("tc2",TraderController.trader2CheckIfPlayerHasBounties);
//###################### LEADERBOARD COMMANDS ######################
CommandManager.command("leaderboard gold",LeaderboardController.leaderboardGold);
CommandManager.command("leaderboard packs",LeaderboardController.leaderboardPacksOpened);
CommandManager.command("leaderboard level",LeaderboardController.leaderboardLevel);
CommandManager.command("leaderboard collection",LeaderboardController.leaderboardCollectionPercentage);
CommandManager.command("leaderboard cards",LeaderboardController.leaderboardMostCardsCaught);
CommandManager.command("leaderboard ultras",LeaderboardController.leaderboardUltras);
//###################### ACHIEVMENTS COMMANDS ######################
CommandManager.command("achievements list",AchievmentController.getAchievmentList);
CommandManager.command("achievement list",AchievmentController.getAchievmentList);
CommandManager.command("achievement :achievmentName*",AchievmentController.getAchievmentDescription);
//###################### CARDS COMMANDS ######################
CommandManager.command("card info :cardValue*",CardController.cardInfo);     
CommandManager.command("ci :cardValue*",CardController.cardInfo);   
CommandManager.command("card search :cardName*",CardController.cardSearch);     
//###################### PACKS COMMANDS ######################
CommandManager.command("pack info :packValue*",PackController.packInfo);       
CommandManager.command("pack list",PackController.packList);        
//###################### PROFILE COMMANDS ######################
CommandManager.command("profile :mention",ProfileController.profile);      
CommandManager.command("profile cards :mention",ProfileController.profileCards);   
CommandManager.command("profile collection :mention",ProfileController.profileCollections);   
CommandManager.command("profile packs :mention",ProfileController.profilePacks);   
CommandManager.command("find owner :cardName*",ProfileController.find);   
//###################### PLAYER COMMANDS ######################
CommandManager.command("wish :cardName*",PlayerController.wish);   
CommandManager.command("open pack :packName*",PlayerController.packOpen); 
CommandManager.command("op :packName*",PlayerController.packOpen); 
CommandManager.command("trade :mention :cards*",PlayerController.trade);
CommandManager.command("gift :mention :cardName*",PlayerController.giftCard);
CommandManager.command("give :mention :cardName*",PlayerController.giftCard);
CommandManager.command("sort :type",PlayerController.sort);
CommandManager.command("my profile",PlayerController.myProfile);
CommandManager.command("mp",PlayerController.myProfile);   
CommandManager.command("my cards",PlayerController.myCards);
CommandManager.command("mc",PlayerController.myCards);
CommandManager.command("my packs",PlayerController.myPacks);
CommandManager.command("mpa",PlayerController.myPacks);
CommandManager.command("my collection",PlayerController.collection);
CommandManager.command("mco",PlayerController.collection);
CommandManager.command("my collection :page",PlayerController.collectionPage);
CommandManager.command("mco :page",PlayerController.collectionPage);
CommandManager.command("sacrifice for :cardName*",PlayerController.sacrificeFor);
CommandManager.command("steal :mention :cardName*",PlayerController.stealCard);
CommandManager.command("missing :packId",PlayerController.missingCards);
CommandManager.command("my achievements",PlayerController.myAchievements);
CommandManager.command("transform ditto :cardName*",PlayerController.transformDitto);
CommandManager.command("transform mew :cardName*",PlayerController.transformMew);
CommandManager.command("bidoof roll",PlayerController.bidoofRoll);
CommandManager.command("delete pack :amount :packName*",PlayerController.deletePacks);