import { Message, Client } from "discord.js";
import { HelpEmbeds } from "../embeds/HelpEmbeds";

export class HelpController{
    //###################### HELP COMMANDS ######################
    //help
    static help(msg:Message, client:Client, params:any){
        msg.channel.send(HelpEmbeds.getHelpEmbed());
    }

    //game help
    static gameHelp(msg:Message, client:Client, params:any){
        msg.channel.send(HelpEmbeds.getGameHelpEmbed());
    }

    //card help
    static cardHelp(msg:Message, client:Client, params:any){
        msg.channel.send(HelpEmbeds.getCardHelpEmbed());
    }

    //pack help
    static packHelp(msg:Message, client:Client, params:any){
        msg.channel.send(HelpEmbeds.getPackHelpEmbed());
    }

    //profile help
    static profileHelp(msg:Message, client:Client, params:any){
        msg.channel.send(HelpEmbeds.getProfileHelpEmbed());
    }

    //player help
    static playerHelp(msg:Message, client:Client, params:any){
        msg.channel.send(HelpEmbeds.getPlayerHelpEmbed());
    }

    //shop help
    static shopHelp(msg:Message, client:Client, params:any){
        msg.channel.send(HelpEmbeds.getShopHelpEmbed());
    }

    //trader help
    static traderHelp(msg:Message, client:Client, params:any){
        msg.channel.send(HelpEmbeds.getTraderHelpEmbed());
    }

}