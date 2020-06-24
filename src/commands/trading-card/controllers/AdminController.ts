import { Message, Client } from "discord.js";
import { server } from "../main";
import { PlayerHandler } from "../player/PlayerHandler";
import { PackManager } from "../packs/PackManager";
import { CardManager } from "../cards/CardManager";
import { Player } from "../player/Player";
import { ShopController } from "./ShopController";
import { TraderController } from "./TraderController";
import { PlayerController } from "./PlayerController";
import { Pack } from "../packs/Pack";

export class AdminController{
    //###################### ADMIN COMMANDS ######################
    //shop restock
    static shopRestock(msg:Message, client:Client, params:any){
        server.shop.forceRestock();
        msg.channel.send("Shop force restocked").then((sentMsg:Message)=>ShopController.shopInfo(sentMsg,client,params));
    }

    //trader restock
    static traderRestock(msg:Message, client:Client, params:any){
        server.trader.forceRestock();
        msg.channel.send("Trader force restocked").then((sentMsg:Message)=>TraderController.traderInfo(sentMsg,client,params));
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

    //giveall gold :ammount
    static giveAllGold(msg:Message, client:Client, params:any){
        const gold=parseInt(params.ammount);
        PlayerHandler.getInstance().cachedPlayersMap.forEach((player:Player,key:string)=>{
            player.addGold(gold);
        });
        msg.channel.send(`All regular players have received ${gold}gold`)
    }

    //giveall rewards :times
    static giveAllRewards(msg:Message,client:Client,params:any){
        const times=parseInt(params.times);
        PlayerHandler.getInstance().cachedPlayersMap.forEach((player:Player)=>{
            for (let index = 0; index < times; index++) {
                player.addRewards();
            } 
        });
        msg.channel.send(`Rewards given`);
    }

    //spawn pack :packId
    static spawnPack(msg:Message,client:Client,params:any){
        const pack=PackManager.getInstance().getItemById(params.packId);
        const cards=pack.open();
        for (let i = 0; i < cards.length; i++) {
            PlayerController.claimableCardPost(msg,undefined,cards[i]);
        }
    }
}