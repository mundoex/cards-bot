import { Message, Client } from "discord.js";
import { Card } from "../cards/Card";
import { Mathf } from "../utils/Mathf";
import { CardManager } from "../cards/CardManager";
import { ControllerUtils } from "../utils/ControllerUtils";
import { CardEmbeds } from "../embeds/CardEmbeds";

export class CardController{
    //###################### CARDS COMMANDS ######################
    //card info :cardValue*
    static cardInfo(msg:Message, client:Client, params:any){
        const cardValue=ControllerUtils.parsePokemonName(params.cardValue);
        let card:Card;
        Mathf.isNumeric(cardValue) ? card=CardManager.getInstance().getItemById(parseInt(cardValue)) : card=CardManager.getInstance().getItemByName(cardValue);
        if(card){
            const embed=CardEmbeds.cardInfoEmbedMessage(card);
            msg.channel.send(embed);
        }else{
            msg.channel.send("No result found.");
        }
    }

    //card search :cardName*
    static cardSearch(msg:Message, client:Client, params:any){
        const cardValue=ControllerUtils.parsePokemonName(params.cardName);
        const cards:Array<Card>=CardManager.getInstance().getCardSearch(cardValue);
        if(cards.length>0){
            const names:string=cards.map((card:Card)=>{ return card.name; }).join(",");
            msg.channel.send("Found: "+names);
        }else{
            msg.channel.send("No result found.");
        }
    }
}