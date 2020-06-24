import { Message, Client, MessageEmbed } from "discord.js";
import { PlayerHandler } from "../player/PlayerHandler";
import { EmbedsManager } from "../client/EmbedsManager";
const paginationEmbed=require("discord.js-pagination");

export class ProfileController{
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
            const embeds=EmbedsManager.getPlayerCardsEmbedPages(player);
            paginationEmbed(msg,embeds,['⏪', '⏩'],EmbedsManager.PAGINATION_TIMEOUT);
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
                const embeds=EmbedsManager.getPlayerPacksEmbedPages(player);
                paginationEmbed(msg,embeds,['⏪', '⏩'],EmbedsManager.PAGINATION_TIMEOUT);
        }else{
            msg.channel.send("Error finding player");
        }
    }
}