import { Message, Client, MessageEmbed } from "discord.js";
import { PlayerHandler } from "../player/PlayerHandler";
import { GameConstants } from "../global/GameConstants";
import { Player } from "../player/Player";
import { CardManager } from "../cards/CardManager";
import { DiscordUtils } from "../utils/DiscordUtils";
import { isNullOrUndefined } from "util";
import { NoMentionFoundException } from "../player/exceptions/NoMentionFoundException";
import { NoPlayerFoundException } from "../player/exceptions/NoPlayerFoundException";
import { ControllerUtils } from "../utils/ControllerUtils";
import { NoCardFoundException } from "../player/exceptions/NoCardFoundException";
const paginationEmbed=require("discord.js-pagination");

export class ProfileController{
    //###################### PROFILE COMMANDS ######################
    //profile :mention
    static profile(msg:Message, client:Client, params:any){
        try{
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
    
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();

            const embed=player.getPlayerCachedEmbeds.profileEmbed.setTitle(user.username).setThumbnail(user.avatarURL({format:"png"}));
            msg.channel.send(embed);
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //find owner :cardName*
    static find(msg:Message, client:Client, params:any){
        try{
            const cardValue=ControllerUtils.parsePokemonName(params.cardName);
            const card=CardManager.getInstance().getItemByName(cardValue);
            if(isNullOrUndefined(card)) throw new NoCardFoundException();

            let result="Players with that card: ";
            PlayerHandler.getInstance().playerAPI.cachedPlayersMap.forEach((player:Player)=>{
                if(player.hasCard(card)){result+=`${msg.guild.members.cache.get(player.getId).user.username}`;};
            });
            msg.channel.send(result);
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //profile cards :mention
    static profileCards(msg:Message,client:Client,params:any){
        try {
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
    
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();

            const embeds=player.getPlayerCachedEmbeds.cardsEmbedPages;
            paginationEmbed(msg,embeds,['⏪', '⏩'],GameConstants.PAGINATION_TIMEOUT);
        } catch (err) {
            msg.channel.send(err.toString());
        }
    }

    //profile collection :mention
    static profileCollections(msg:Message,client:Client,params:any){
        try {
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
    
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();

            const embeds=player.getPlayerCachedEmbeds.collectionEmbedPages;
            paginationEmbed(msg,embeds,['⏪', '⏩'],GameConstants.PAGINATION_TIMEOUT);
        } catch (err) {
            msg.channel.send(err.toString());
        }
    }

    //profile packs :mention
    static profilePacks(msg:Message, client:Client, params:any){
        try {
            const user=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(user)) throw new NoMentionFoundException();
    
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();

            const embed=player.getPlayerCachedEmbeds.packsEmbedPage;
            msg.channel.send(embed);
        } catch (err) {
            msg.channel.send(err.toString());
        }
    }
}