import { Message, Client } from "discord.js";
import { Card } from "../cards/Card";
import { Mathf } from "../utils/Mathf";
import { CardManager } from "../cards/CardManager";
import { EmbedsManager } from "../client/EmbedsManager";

export class CardController{
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
}