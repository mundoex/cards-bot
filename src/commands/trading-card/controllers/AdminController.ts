import { Message, Client } from "discord.js";
import { server } from "../main";
import { PlayerHandler } from "../player/PlayerHandler";
import { PackManager } from "../packs/PackManager";
import { CardManager } from "../cards/CardManager";
import { Player } from "../player/Player";
import { ShopController } from "./ShopController";
import { TraderController } from "./TraderController";
import { PlayerController } from "./PlayerController";
import { DiscordUtils } from "../utils/DiscordUtils";
import { isNullOrUndefined } from "util";
import { NoMentionFoundException } from "../player/exceptions/NoMentionFoundException";
import { NoPlayerFoundException } from "../player/exceptions/NoPlayerFoundException";
import { NoPackFoundException } from "../player/exceptions/NoPackFoundException";
import { NoCardFoundException } from "../player/exceptions/NoCardFoundException";
import { Mathf } from "../utils/Mathf";
import { Card } from "../cards/Card";
import { PackController } from "./PackController";
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
       try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();

            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
            
            const goldAmmount=parseInt(params.ammount);
            player.addGold(goldAmmount);
            player.save();
            msg.channel.send(`${user} received: ${goldAmmount} gold.`);
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //give :player pack :packId :ammount
    static givePlayerPack(msg:Message, client:Client, params:any){
        try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
    
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
    
            const packId=parseInt(params.packId);
            const ammount=parseInt(params.ammount);
            const pack=PackManager.getInstance().getItemById(packId);
            if(isNullOrUndefined(pack)) throw new NoPackFoundException();

            player.addPack(pack,ammount);
            msg.channel.send(`Admin has given ${user.username} ${pack.name} pack.`);
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //give :player card :cardId :ammount
    static givePlayerCard(msg:Message, client:Client, params:any){
        try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
            
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
            const cardId=parseFloat(params.cardId);
            const ammount=parseInt(params.ammount);
            const card=CardManager.getInstance().getItemById(cardId);
            for (let index = 0; index < ammount; index++) {
                player.addCard(card);
            }
            msg.channel.send(`Admin has given ${user.username} ${card.name}.`);
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

<<<<<<< HEAD
    //give :player exp :exp
    static givePlayerExperience(msg:Message, client:Client, params:any){
        try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();

            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
            const exp=parseInt(params.exp);

            player.addExperience(exp);
            msg.channel.send(`Admin has given ${user.username} ${exp}exp.`);
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }
=======
    //remove :player card :cardId
    static removePlayerCard(msg:Message, client:Client, params:any){
        const user=msg.mentions.users.first();
        if(user){
            let player=PlayerHandler.getInstance().getPlayerById(user.id);
            const cardId=parseInt(params.cardId);
            const card=CardManager.getInstance().getItemById(cardId);
            if(player!==undefined && card!==undefined){
                player.removeCard(card);
                msg.channel.send(`Admin has given ${user.username} ${card.name}.`);
            }else{
                msg.channel.send("Error finding player or card");
            }
        }else{
            msg.channel.send("Error finding mention");
        }
    }

>>>>>>> c2a126510ab934820445335bfaba35a23792c019
    //give :player claims :claims
    static givePlayerClaims(msg:Message, client:Client, params:any){
        try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
        
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);

            const claims=parseInt(params.claims);
            player.addClaim(claims);
            msg.channel.send(`Admin has given ${user.username} ${claims} claims.`);
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }
    //give :player priority claims :claims
    static givePlayerPriorityClaims(msg:Message, client:Client, params:any){
        try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
        
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);

            const claims=parseInt(params.claims);
            player.addPriorityClaim(claims);
            msg.channel.send(`Admin has given ${user.username} ${claims} priority claims.`);
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //give :player trades :trades
    static givePlayerTrades(msg:Message, client:Client, params:any){
        try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
        
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);

            const trades=parseInt(params.trades);
            player.addTrade(trades);
            msg.channel.send(`Admin has given ${user.username} ${trades} trades.`);
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //give :player modifier luck :modifier
    static givePlayerLuckModifier(msg:Message, client:Client, params:any){
        try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
        
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
    
            const luck=parseInt(params.modifier);
            player.addLuckModifier(luck);
            msg.channel.send(`Admin has given ${user.username} ${luck} luck.`);
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //give :player gold modifier :modifier
    static givePlayeGoldModifier(msg:Message, client:Client, params:any){
        try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
            
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
        
            const goldMod=parseInt(params.modifier);
            player.addGoldModifier(goldMod);
            msg.channel.send(`Admin has given ${user.username} ${goldMod} gold modifier.`);
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //give :player exp modifier :modifier
    static givePlayeExpModifier(msg:Message, client:Client, params:any){
        try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
                
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
            
            const expMod=parseInt(params.modifier);
            player.addExperienceModifier(expMod);
            msg.channel.send(`Admin has given ${user.username} ${expMod} exp modifier.`);
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //giveall gold :ammount
    static giveAllGold(msg:Message, client:Client, params:any){
        try{
            const gold=parseInt(params.ammount);
            PlayerHandler.getInstance().playerAPI.cachedPlayersMap.forEach((player:Player,key:string)=>{
                player.addGold(gold);
                player.save();
            });
            msg.channel.send(`All regular players have received ${gold} gold`);
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //giveall rewards :times
    static giveAllRewards(msg:Message,client:Client,params:any){
        try{
            const times=parseInt(params.times);
            PlayerHandler.getInstance().playerAPI.cachedPlayersMap.forEach((player:Player)=>{
                for (let index = 0; index < times; index++) {
                    player.addRewards();
                    player.save();
                } 
            });
            msg.channel.send(`Rewards given`);
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //spawn pack :packId
    static spawnPack(msg:Message,client:Client,params:any){
        try{
            const pack=PackManager.getInstance().getItemById(parseInt(params.packId));
            if(isNullOrUndefined(pack)) throw new NoPackFoundException();
            const cards=pack.open();
            for (let i = 0; i < cards.length; i++) {
                PlayerController.claimableCardPost(msg,undefined,cards[i],"----- No priority card -----");
            }
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //spawn ultra
    static spawnUltra(msg:Message,client:Client,params:any){
        try{
            const randomPack:Pack=PackManager.getInstance().getItemById(Mathf.randomInt(1,PackManager.getInstance().packs.size));
            const rngIndex=Mathf.randomInt(0,randomPack.ultraItemsIds.length-1);
            const ultraCard:Card=CardManager.getInstance().getItemById(randomPack.ultraItemsIds[rngIndex]);
            PlayerController.claimableCardPost(msg,undefined,ultraCard,"----- No priority card -----");
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    saveAll(msg:Message,client:Client,params:any){
        PlayerHandler.getInstance().playerAPI.cachedPlayersMap.forEach((player:Player)=>player.save());
    }
}