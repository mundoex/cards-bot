import { Message, Client } from "discord.js";
import { EmbedsManager } from "../client/EmbedsManager";

export class HelpController{
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

}