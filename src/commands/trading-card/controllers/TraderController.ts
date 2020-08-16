import { Message, Client } from "discord.js";
import { server } from "../main";
import { PlayerHandler } from "../player/PlayerHandler";
import { CardManager } from "../cards/CardManager";
import { TraderEmbeds } from "../embeds/TraderEmbeds";
import { ControllerUtils } from "../utils/ControllerUtils";
import { GameConstants } from "../global/GameConstants";
import { NoEnoughLevelException } from "../player/exceptions/NotEnoughLevelException";

export class TraderController{
    //###################### TRADER COMMANDS ######################  
    //trader info
    static traderInfo(msg:Message, client:Client, params:any){
        msg.channel.send(TraderEmbeds.traderInfoEmbedMessage(server.trader));
    }

    //trader sell :cardName*
    static traderSell(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            const card=CardManager.getInstance().getItemByName(ControllerUtils.parsePokemonName(params.cardName));
            const result=server.trader.buyBounty(player,card);
            if(result){
                msg.channel.send(`You sold ${card.name} for ${server.trader.bountyPrice(card.stars)} gold.`);
            }else{
                msg.channel.send("You or the trader dont have that card");
            }
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //trader check
    static traderCheckIfPlayerHasBounties(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
        let text:string="You have: ";
        if(player){
            server.trader.needIds.forEach((id:number)=>{
                const card=CardManager.getInstance().getItemById(id);
                if(player.hasCard(card)){
                    text+=card.name+" ";
                }
            });
            msg.channel.send(text);
        }else{
            msg.channel.send("Error finding player");
        }
    }

    //trader2 info
    static trader2Info(msg:Message, client:Client, params:any){
        msg.channel.send(TraderEmbeds.traderInfoEmbedMessage(server.superTrader));
    }

    //trader2 sell :cardName*
    static trader2Sell(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(player.level<GameConstants.TRADER_2_LVL_REQUIRED) throw new NoEnoughLevelException();
            const card=CardManager.getInstance().getItemByName(ControllerUtils.parsePokemonName(params.cardName));
            const result=server.superTrader.buyBounty(player,card);
            if(result){
                msg.channel.send(`You sold ${card.name} for ${server.trader.bountyPrice(card.stars)} gold.`);
            }else{
                msg.channel.send("You or the trader dont have that card");
            }
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //trader2 check
    static trader2CheckIfPlayerHasBounties(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            let text:string="You have: ";
            if(player){
                if(player.level<GameConstants.TRADER_2_LVL_REQUIRED) throw new NoEnoughLevelException();
                server.superTrader.needIds.forEach((id:number)=>{
                    const card=CardManager.getInstance().getItemById(id);
                    if(player.hasCard(card)){
                        text+=card.name+" ";
                    }
                });
                msg.channel.send(text);
            }else{
                msg.channel.send("Error finding player");
            }
        }catch(err){
            msg.channel.send(err.toString());
        }
    }
}