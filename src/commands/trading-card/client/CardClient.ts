import { Card } from "../cards/Card";
import { MessageEmbed, Message, Client, Emoji, MessageReaction, User, Collection } from "discord.js";
import { Rarity } from "../drop-generation/Rarity";
import { CardManager } from "../cards/CardManager";
import { PackManager } from "../packs/PackManager";
import { Pack } from "../packs/Pack";
import { EmbedsManager } from "./EmbedsManager";
import { server } from "../CardMain";
import { PlayerHandler } from "../player/PlayerHandler";
import { Player } from "../player/Player";
import { LootingSystem } from "../LootingSystem";
import { Mathf } from "../utils/Mathf";
const paginationEmbed = require('discord.js-pagination');

export class CardClient{
    
//###################### HELP COMMANDS ######################
    //help
    static help(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.getHelpEmbed());
    }

    //game help
    static gameHelp(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.getHelpEmbed());
    }

    //card help
    static cardHelp(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.getCardHelpEmbed());
    }

    //pack help
    static packHelp(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.getPackHelpEmbed());
    }

    //profile help
    static profileHelp(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.getProfileHelpEmbed());
    }

    //player help
    static playerHelp(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.getPlayerHelpEmbed());
    }

    //shop help
    static shopHelp(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.getShopHelpEmbed());
    }

    //trader help
    static traderHelp(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.getTraderHelpEmbed());
    }

//###################### ADMIN COMMANDS ######################
    //shop restock
    static shopRestock(msg:Message, client:Client, params:any){
        server.shop.forceRestock();
        msg.channel.send("Shop force restocked").then((sentMsg:Message)=>CardClient.shopInfo(sentMsg,client,params));
    }

    //trader restock
    static traderRestock(msg:Message, client:Client, params:any){
        server.trader.forceRestock();
        msg.channel.send("Trader force restocked").then((sentMsg:Message)=>CardClient.traderInfo(sentMsg,client,params));
    }

    //give :player gold :ammount
    static givePlayerGold(msg:Message, client:Client, params:any){
        const user=msg.mentions.users.first();
        if(user){
            let player=PlayerHandler.getInstance().getPlayerById(user.id);
            if(player){
                const goldAmmount=parseInt(params.ammount);
                player.addGold(goldAmmount);
                msg.channel.send(`Admin has given ${user.username} ${goldAmmount} gold.`);
            }else{
                msg.channel.send("Error finding player");
            }
        }else{
            msg.channel.send("Error finding mention");
        }
    }

    //give :player pack :packId
    static givePlayerPack(msg:Message, client:Client, params:any){
        const user=msg.mentions.users.first();
        if(user){
            let player=PlayerHandler.getInstance().getPlayerById(user.id);
            const packId=parseInt(params.packId);
            const pack=PackManager.getInstance().getItemById(packId);
            if(player!==undefined && pack!==undefined){
                player.addPack(pack);
                msg.channel.send(`Admin has given ${user.username} ${pack.name} pack.`);
            }else{
                msg.channel.send("Error finding player or pack");
            }
        }else{
            msg.channel.send("Error finding mention");
        }
    }

    //give :player card :cardId
    static givePlayerCard(msg:Message, client:Client, params:any){
        const user=msg.mentions.users.first();
        if(user){
            let player=PlayerHandler.getInstance().getPlayerById(user.id);
            const cardId=parseInt(params.cardId);
            const card=CardManager.getInstance().getItemById(cardId);
            if(player!==undefined && card!==undefined){
                player.addCard(card);
                msg.channel.send(`Admin has given ${user.username} ${card.name}.`);
            }else{
                msg.channel.send("Error finding player or card");
            }
        }else{
            msg.channel.send("Error finding mention");
        }
    }

//###################### SHOP COMMANDS ######################    
    //shop info
    static shopInfo(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.shopInfoEmbedMessage(server.shop));
    }

    //shop buy :packName
    static shopBuy(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack:Pack=PackManager.getInstance().getItemByName(params.packName);
        const hasPackInStore=server.shop.contains(pack.id);
        if(player!==undefined && pack!==undefined && hasPackInStore){
            const bought=player.buyPack(pack);
            if(bought){
                server.shop.sellItem(pack.id);
                msg.channel.send(`Sold x1 ${pack.name} pack`);
            }else{
                msg.channel.send("You don't have enough money");
            }
        }else{
            msg.channel.send("Player or pack not found");
        }        
    }

    //shop buyx :packName :ammount
    static shopBuyX(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack:Pack=PackManager.getInstance().getItemByName(params.packName);
        const hasPackInStore=server.shop.contains(pack.id);
        const ammountSelected=parseInt(params.ammount);
        const ammountInStore=server.shop.inventory.items.get(pack.id);
        if(player!==undefined && pack!==undefined && hasPackInStore){
            if(ammountSelected<=ammountInStore){
                const bought=player.buyXPack(pack,ammountSelected);
                if(bought){
                    server.shop.sellItem(pack.id);
                    msg.channel.send(`Sold x${ammountSelected} ${pack.name} packs`);
                }else{
                    msg.channel.send("You don't have enough money");
                }
            }
        }else{
            msg.channel.send("Player or pack not found");
        }        
    }
//###################### TRADER COMMANDS ######################  
    //trader info
    static traderInfo(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.traderInfoEmbedMessage(server.trader));
    }

    //trader sell :cardName
    static traderSell(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const card=CardManager.getInstance().getItemByName(params.cardName);
        if(player!==undefined && card!==undefined){
            if(player.hasCard(card) && server.trader.hasBounty(card)){
                player.removeCard(card);
                player.addGold(server.trader.bountyPrice(card.stars));
            }else{
                msg.channel.send("You or the trader dont have that card");
            }
        }else{
            msg.channel.send("Player or card not found");
        }
    }

    //trader reroll :cardName1 :cardName2 :cardName3 
    static traderReroll(msg:Message, client:Client, params:any){
        msg.channel.send("Nah no gambling yet");
    }

    //trader guess :stars
    static traderGuess(msg:Message, client:Client, params:any) {
        msg.channel.send("Nah no gambling yet");
    }
//###################### CARDS COMMANDS ######################
    //card info :cardValue
    static cardInfo(msg:Message, client:Client, params:any){
        let card:Card;
        Mathf.isNumeric(params.cardValue) ? card=CardManager.getInstance().getItemById(parseInt(params.cardValue)) : card=CardManager.getInstance().getItemByName(params.cardValue);
        if(card){
            const embed=EmbedsManager.cardInfoEmbedMessage(card);
            msg.channel.send(embed);
        }else{
            msg.channel.send("No result found.");
        }
    }

    //card search :cardName
    static cardSearch(msg:Message, client:Client, params:any){
        const cards:Array<Card>=CardManager.getInstance().getCardSearch(params.cardName);
        if(cards.length>0){
            const names:string=cards.map((card:Card)=>{ return card.name; }).join(",");
            msg.channel.send("Found: "+names);
        }else{
            msg.channel.send("No result found.");
        }
    }

//###################### PACKS COMMANDS ######################
    //pack info :packValue
    static packInfo(msg:Message, client:Client, params:any){
        let pack:Pack;
        Mathf.isNumeric(params.packValue) ? pack=PackManager.getInstance().getItemById(parseInt(params.packValue)) : pack=PackManager.getInstance().getItemByName(params.packValue);
        if(pack){
            paginationEmbed(msg,EmbedsManager.getPackEmbedPages(pack),['⏪', '⏩'],EmbedsManager.PAGINATION_TIMEOUT);
        }else{
            msg.channel.send("No result found.");
        }
    }
//###################### PROFILE COMMANDS ######################
    //my profile
    static myProfile(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        if(player){
            const embed:MessageEmbed=EmbedsManager.playerEmbedMessage(msg.author.username,player);
            msg.channel.send(embed);
        }else{
            msg.channel.send("Error finding player");
        }
        
    }

    //my cards
    static myCards(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        if(player){
            paginationEmbed(EmbedsManager.getPlayerCardsEmbedPages(player));
        }else{
            msg.channel.send("Error finding player");
        }
    }

    //my packs
    static myPacks(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        if(player){
            paginationEmbed(EmbedsManager.getPlayerPacksEmbedPages(player));
        }else{
            msg.channel.send("Error finding player");
        }
    }

    //profile :mention
    static profile(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.mentions.users.first().id);
        if(player){
            msg.channel.send(EmbedsManager.playerEmbedMessage(msg.member.displayName,player));
        }else{
            msg.channel.send("Error finding player");
        }
    }

    //profile cards :mention
    static profileCards(msg:Message,client:Client,params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.mentions.users.first().id);
        if(player){
            paginationEmbed(EmbedsManager.getPlayerCardsEmbedPages(player));
        }else{
            msg.channel.send("Error finding player");
        }
    }

    //profile packs :mention
    static profilePacks(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.mentions.users.first().id);
        if(player){
            paginationEmbed(EmbedsManager.getPlayerPacksEmbedPages(player));
        }else{
            msg.channel.send("Error finding player");
        }
    }

    //leaderboard gold
    static leaderboardGold(msg:Message, client:Client, params:any){
        msg.channel.send("No gold stats");
    }

    //leaderboard cards
    static leaderboardCards(msg:Message, client:Client, params:any){
        msg.channel.send("No cards stats");
    }

    //leaderboard cards
    static leaderboardStars(msg:Message, client:Client, params:any){
        msg.channel.send("No star stats");
    }
//###################### PLAYER COMMANDS ######################
    //wish :cardName
    static wish(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.member.id);
        const result=player.wish(params.cardName);
        if(result){
            msg.channel.send("Wish set sucessfully");
        }else{
            msg.channel.send("Error setting wish");
        }
    }

    //pack open :packName
    static packOpen(msg:Message, client:Client, params:any){
        client.on("messageReactionAdd",(msgr:MessageReaction,user:User)=>{
            if(msgr.message.id==="2"){
                //create collectors with events
            }
        });
        let player=PlayerHandler.getInstance().getPlayerById(msg.member.id);
        const pack=PackManager.getInstance().getItemById(parseInt(params.packName));
        const cards:Array<Card>=player.openPack(pack);
        if(cards){
            cards.forEach((card:Card)=>CardClient.claimableCardPost(msg,player,card));
        }else{
            msg.channel.send("You don't have that pack");
        }
    }

    static claimableCardPost(msg:Message,player:Player,card:Card){
        const embed:MessageEmbed=EmbedsManager.cardEmbedMessage(CardManager.getInstance().getItemById(3));
        msg.channel.send(embed).then((sentMsg:Message)=>{
            sentMsg.react("👍");
            sentMsg.awaitReactions(EmbedsManager.needersEmojiFilter,{max:5, time:15000}).then((collected:Collection<string,MessageReaction>)=>{
                const usersIds:Array<string>=collected.first().users.cache.array().filter((user:User)=>{return user.bot===false;}).map((user:User)=>{return user.id});
                const validNeeders:Array<Player>=LootingSystem.validNeeders(usersIds);
                //lock aos claims e devolver aseguir aos losers
                //const winner:Player=LootingSystem.splitLoot(player,validNeeders,card);
               // msg.channel.send(msg.guild.members.cache.get(winner.id).user.username+" has received: " + card.name);
            });
        });
    }


    
    //shop info const emojis:any={0: '0️⃣', 1: '1️⃣',2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣',6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣',10: '🔟'};
    

    

    



    
}