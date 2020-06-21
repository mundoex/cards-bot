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
        msg.channel.send(EmbedsManager.getGameHelpEmbed());
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

    //give :player claims :claims
    static givePlayerClaims(msg:Message, client:Client, params:any){
        const user=msg.mentions.users.first();
        if(user){
            let player=PlayerHandler.getInstance().getPlayerById(user.id);
            const claims=parseInt(params.claims);
            if(player!==undefined){
                player.addClaim(claims);
                msg.channel.send(`Admin has given ${user.username} ${claims} claims.`);
            }else{
                msg.channel.send("Error finding player");
            }
        }else{
            msg.channel.send("Error finding mention");
        }
    }

    //give :player trades :trades
    static givePlayerTrades(msg:Message, client:Client, params:any){
        const user=msg.mentions.users.first();
        if(user){
            let player=PlayerHandler.getInstance().getPlayerById(user.id);
            const trades=parseInt(params.trades);
            if(player!==undefined){
                player.addTrade(trades);
                msg.channel.send(`Admin has given ${user.username} ${trades} trades.`);
            }else{
                msg.channel.send("Error finding player");
            }
        }else{
            msg.channel.send("Error finding mention");
        }
    }

    //give :player luck :luckModifier
    static givePlayerLuck(msg:Message, client:Client, params:any){
        const user=msg.mentions.users.first();
        if(user){
            let player=PlayerHandler.getInstance().getPlayerById(user.id);
            const luck=parseInt(params.luckModifier);
            if(player!==undefined){
                player.addLuck(luck);
                msg.channel.send(`Admin has given ${user.username} ${luck} luck.`);
            }else{
                msg.channel.send("Error finding player");
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

    //shop buy :packName*
    static shopBuy(msg:Message, client:Client, params:any){
        const packName=params.packName.join(" ");
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack:Pack=PackManager.getInstance().getItemByName(packName);
        if(player!==undefined && pack!==undefined){
            const hasPackInStore=server.shop.hasStock(pack.id);
            if(hasPackInStore){
                const bought=player.buyPack(pack);
                if(bought){
                    server.shop.sellItem(pack.id);
                    msg.channel.send(`Sold x1 ${pack.name} pack`);
                }else{
                    msg.channel.send("You don't have enough money");
                }
            }else{
                msg.channel.send("Pack not in store");
            }     
        }else{
            msg.channel.send("No player or pack found");
        }
    }

    //shop buyx :ammount :packName*
    static shopBuyX(msg:Message, client:Client, params:any){
        const packName=params.packName.join(" ");
        const ammountSelected=parseInt(params.ammount);
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack:Pack=PackManager.getInstance().getItemByName(packName);
        if(player!==undefined && pack!==undefined){
            const hasPackInStore=server.shop.contains(pack.id);
            const ammountInStore=server.shop.inventory.items.get(pack.id);
            if(hasPackInStore){
                if(ammountSelected<=ammountInStore){
                    const bought=player.buyXPack(pack,ammountSelected);
                    if(bought){
                        server.shop.sellItem(pack.id,ammountSelected);
                        msg.channel.send(`Sold x${ammountSelected} ${pack.name} packs`);
                    }else{
                        msg.channel.send("You don't have enough money");
                    }
                }else{
                    msg.channel.send("Not enough packs available");
                }
            }else{
                msg.channel.send("Player or pack not found");
            }      
        }else{
            msg.channel.send("No player or pack found");
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
    //card info :cardValue*
    static cardInfo(msg:Message, client:Client, params:any){
        const cardValue=params.cardValue.join(" ");
        let card:Card;
        Mathf.isNumeric(cardValue) ? card=CardManager.getInstance().getItemById(parseInt(cardValue)) : card=CardManager.getInstance().getItemByName(cardValue);
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
    //pack info :packValue*
    static packInfo(msg:Message, client:Client, params:any){
        const packValue=params.packValue.join(" ");
        let pack:Pack;
        Mathf.isNumeric(packValue) ? pack=PackManager.getInstance().getItemById(parseInt(packValue)) : pack=PackManager.getInstance().getItemByName(packValue);
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
            const embeds=EmbedsManager.getPlayerCardsEmbedPages(player);
            paginationEmbed(msg,embeds,['⏪', '⏩'],EmbedsManager.PAGINATION_TIMEOUT);
        }else{
            msg.channel.send("Error finding player");
        }
    }

    //my packs
    static myPacks(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        if(player){
            const embeds=EmbedsManager.getPlayerPacksEmbedPages(player);
            paginationEmbed(msg,embeds,['⏪', '⏩'],EmbedsManager.PAGINATION_TIMEOUT);
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
            const embeds=EmbedsManager.getPlayerCardsEmbedPages(player);
            paginationEmbed(msg,embeds,['⏪', '⏩'],EmbedsManager.PAGINATION_TIMEOUT);
        }else{
            msg.channel.send("Error finding player");
        }
    }

    //profile packs :mention
    static profilePacks(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.mentions.users.first().id);
        if(player){
                const embeds=EmbedsManager.getPlayerPacksEmbedPages(player);
                paginationEmbed(msg,embeds,['⏪', '⏩'],EmbedsManager.PAGINATION_TIMEOUT);
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

    //open pack :packName
    static packOpen(msg:Message, client:Client, params:any){
        const packName:string=params.packName.join(" ");
        let player=PlayerHandler.getInstance().getPlayerById(msg.member.id);
        const pack=PackManager.getInstance().getItemByName(packName);
        if(player!==undefined && pack!==undefined){
            const cards:Array<Card>=player.openPack(pack);
            if(cards){
                cards.forEach((card:Card)=>CardClient.claimableCardPost(msg,player,card));
            }else{
                msg.channel.send("You don't have that pack.");
            }
        }else{
            msg.channel.send("No such pack");
        }
    }

    static claimableCardPost(msg:Message,packOwnerPlayer:Player,card:Card){
        const embed:MessageEmbed=EmbedsManager.cardEmbedMessage(card);
        msg.channel.send(embed).then((sentMsg:Message)=>{
            sentMsg.react("👍");
            const collector=sentMsg.createReactionCollector(EmbedsManager.needersEmojiFilter,{max:5,time:13000});
            const usersSet=new Set<string>();
            const neederPlayers=new Array<Player>();
            const neederFilter=(user:User)=>{return user.bot===false && usersSet.has(user.id)===false};
            collector.on("collect",(msgr:MessageReaction)=>{
                const user:User=msgr.users.cache.array().filter(neederFilter)[0];
                if(user){
                    usersSet.add(user.id);
                    let neederPlayer=PlayerHandler.getInstance().getPlayerById(user.id);
                    if(neederPlayer.hasClaims()){
                        neederPlayer.removeClaim();
                        neederPlayers.push(neederPlayer);
                    }
                }
            });

            collector.on("end",(msgr:MessageReaction)=>{
                const lootResult=LootingSystem.splitLoot(packOwnerPlayer,neederPlayers,card);
                if(lootResult.winner){
                    const winnerName:string=msg.guild.members.cache.get(lootResult.winner.id).user.username;
                    sentMsg.channel.send(`${winnerName} has won ${card.name}.`);
                }else{
                    sentMsg.channel.send(`${card.name} got away unclaimed.`)
                }
            });
        });
    }
}