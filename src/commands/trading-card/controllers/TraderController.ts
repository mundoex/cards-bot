import { Message, Client } from "discord.js";
import { EmbedsManager } from "../client/EmbedsManager";
import { server } from "../main";
import { PlayerHandler } from "../player/PlayerHandler";
import { CardManager } from "../cards/CardManager";

export class TraderController{
    //###################### TRADER COMMANDS ######################  
    //trader info
    static traderInfo(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.traderInfoEmbedMessage(server.trader));
    }

    //trader sell :cardName
    static traderSell(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const card=CardManager.getInstance().getItemByName(params.cardName.join(" "));
        if(player!==undefined && card!==undefined){
            if(player.hasCard(card) && server.trader.hasBounty(card)){
                player.removeCard(card);
                const gold=server.trader.bountyPrice(card.stars);
                player.addGold(gold);
                msg.channel.send(`You sold ${card.name} for ${gold} gold.`)
            }else{
                msg.channel.send("You or the trader dont have that card");
            }
        }else{
            msg.channel.send("Player or card not found");
        }
    }

    //trader reroll :cards*
    static traderReroll(msg:Message, client:Client, params:any){
        const cardsNames=params.cards.slit("$").join(" ");
        console.log(cardsNames);
    }

    //trader guess :stars
    static traderGuess(msg:Message, client:Client, params:any) {
        msg.channel.send("Nah no gambling yet");
    }
}