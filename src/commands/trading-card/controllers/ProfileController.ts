import { Message, Client, MessageEmbed } from "discord.js";
import { PlayerHandler } from "../player/PlayerHandler";
import { EmbedsManager } from "../client/EmbedsManager";
import { GameConstants } from "../global/GameConstants";
const paginationEmbed=require("discord.js-pagination");

export class ProfileController{
    //###################### PROFILE COMMANDS ######################
    //profile :mention
    static profile(msg:Message, client:Client, params:any){
        let user=msg.mentions.users.first();
        if(user===undefined){
            user=msg.author;
        }
        let player=PlayerHandler.getInstance().getPlayerById(user.id);
        if(player){
            msg.channel.send(EmbedsManager.playerEmbedMessage(user.username,player));
        }else{
            msg.channel.send("Error finding player");
        }
    }

    //profile cards :mention
    static profileCards(msg:Message,client:Client,params:any){
        let user=msg.mentions.users.first();
        if(user===undefined){
            user=msg.author;
        }
        let player=PlayerHandler.getInstance().getPlayerById(user.id);
        if(player){
            const embeds=player.playerEmbeds.cardsEmbedPages;
            paginationEmbed(msg,embeds,['⏪', '⏩'],GameConstants.PAGINATION_TIMEOUT);
        }else{
            msg.channel.send("Error finding player");
        }
    }

    //profile packs :mention
    static profilePacks(msg:Message, client:Client, params:any){
        let user=msg.mentions.users.first();
        if(user===undefined){
            user=msg.author;
        }
        let player=PlayerHandler.getInstance().getPlayerById(user.id);
        if(player){
            const embeds=player.playerEmbeds.packsEmbedPage;
                msg.channel.send(embeds);
        }else{
            msg.channel.send("Error finding player");
        }
    }
}