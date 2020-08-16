import { Message, Client, MessageEmbed, User, MessageReaction } from "discord.js";
import { PlayerHandler } from "../player/PlayerHandler";
import { PackManager } from "../packs/PackManager";
import { Card } from "../cards/Card";
import { Player } from "../player/Player";
import { LootingSystem } from "../systems/looting/LootingSystem";
import { CardManager } from "../cards/CardManager";
import { ControllerUtils } from "../utils/ControllerUtils";
import { NoMentionFoundException } from "../player/exceptions/NoMentionFoundException";
import { isNullOrUndefined } from "util";
import { NoPlayerFoundException } from "../player/exceptions/NoPlayerFoundException";
import { NoCardFoundException } from "../player/exceptions/NoCardFoundException";
import { NoPackFoundException } from "../player/exceptions/NoPackFoundException";
import { DiscordUtils } from "../utils/DiscordUtils";
import { NoSortException } from "../player/exceptions/NoSortException";
import { CardEmbeds } from "../embeds/CardEmbeds";
import { SacrificeManager } from "../sacrifices/SacrificesManager";
import { EmbedsUtils } from "../utils/EmbedsUtils";
import { UniqueAlreadyOwnerException } from "../player/exceptions/UniqueAlreadyOwnedException";
import { GameConstants } from "../global/GameConstants";
import { Sacrifice } from "../sacrifices/Sacrifice";
import { Mathf } from "../utils/Mathf";
import { Achievment } from "../systems/achievments/Achievment";
import { AchievmentSystem } from "../systems/achievments/AchievmentSystem";
import { CardController } from "./CardController";
const paginationEmbed=require("discord.js-pagination");

export class PlayerController{
    //###################### PLAYER COMMANDS ######################
    //gift :mention :cardName*
    static giftCard(msg:Message, client:Client, params:any){
        try{
            const mention=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(mention)) throw new NoMentionFoundException();

            const gifter=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            const receiver=PlayerHandler.getInstance().playerAPI.getPlayerById(mention.id);
            if(isNullOrUndefined(gifter) || isNullOrUndefined(receiver)) throw new NoPlayerFoundException();

            const card=CardManager.getInstance().getItemByName(ControllerUtils.parsePokemonName(params.cardName));
            if(isNullOrUndefined(card)) throw new NoCardFoundException();

            msg.channel.send(`${mention.username} do you accept ${card.name} as a gift?`).then((sentMsg:Message)=>{
                sentMsg.react("👍");
                const collector=sentMsg.createReactionCollector(EmbedsUtils.needersEmojiFilter,{time:13000});           
                collector.on("collect",(msgr:MessageReaction)=>{
                    const accepted=DiscordUtils.getUserFromMessageReaction(msgr,receiver.getId)!==null;
                    if(accepted){
                        const giftWorked:boolean=gifter.giveCard(receiver,card);
                        if(giftWorked){
                            msg.channel.send(`${mention.username} was gifted ${card.name} by ${msg.author.username}.`);
                            gifter.save();
                            receiver.save();
                            collector.stop();
                        }else{
                            msg.channel.send("Gift didn't work. Check if you have the card and trades.");
                            collector.stop();
                        }
                    }
                });
            });
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //wish :cardName*
    static wish(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            const cardName=ControllerUtils.parsePokemonName(params.cardName);
            const result=player.wish(cardName);
            result ? msg.channel.send("Wish set sucessfully") : msg.channel.send("Error setting wish");
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //trade :mention :cards*
    static trade(msg:Message, client:Client, params:any){
        try{
            const mention=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(mention)) throw new NoMentionFoundException();

            const cardNames=ControllerUtils.parsePokemonNames(params.cards);
            if(cardNames.length!==2) throw new NoCardFoundException();

            const requester:Player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            const accepter:Player=PlayerHandler.getInstance().playerAPI.getPlayerById(mention.id);
            if(isNullOrUndefined(requester) || isNullOrUndefined(accepter)) throw new NoPlayerFoundException();

            const cardSend:Card=CardManager.getInstance().getItemByName(cardNames[0]);
            const cardReceive:Card=CardManager.getInstance().getItemByName(cardNames[1]);
            if(isNullOrUndefined(cardSend) || isNullOrUndefined(cardReceive)) throw new NoCardFoundException();

            msg.channel.send(`${mention} do you accept ${cardSend.name} for ${cardReceive.name}?`).then((sentMsg:Message)=>{
                sentMsg.react("👍");
                const collector=sentMsg.createReactionCollector(EmbedsUtils.needersEmojiFilter,{time:13000});
                collector.on("collect",(msgr:MessageReaction)=>{
                    try{
                        const accepted=!isNullOrUndefined(DiscordUtils.getUserFromMessageReaction(msgr,accepter.getId));
                    if(accepted){
                        const tradeWorked:boolean=requester.trade(cardSend,cardReceive,accepter);
                        if(tradeWorked){
                            requester.save();
                            accepter.save();
                            msg.channel.send(`${msg.author.username} has traded ${cardSend.name} for ${cardReceive.name} with ${mention}.`);
                            collector.stop();
                        }else{
                            msg.channel.send("Trade didn't work. Check if you and the other player have trades and both have the card.");
                            collector.stop();
                        }
                    }
                    }catch(err){
                        msg.channel.send(err.toString());
                    }
                });
            });
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //open pack :packName*
    static packOpen(msg:Message, client:Client, params:any){
        try{
            const packName=ControllerUtils.parsePackName(params.packName);
            let pack;
            Mathf.isNumeric(packName) ? pack=PackManager.getInstance().getItemById(parseInt(packName)) : pack=PackManager.getInstance().getItemByName(packName);
            if(isNullOrUndefined(pack)) throw new NoPackFoundException();

            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();

            const cards:Array<Card>=player.openPack(pack);
            if(cards){
                for (let i=0;i<cards.length-1;i++) {
                    const card = cards[i];
                    player.hasCard(card) ?  PlayerController.claimableCardPost(msg,player,card) : PlayerController.claimableCardPost(msg,player,card,"🆕");
                }
                const lastCard=cards[cards.length-1];
                player.hasCard(lastCard) ? 
                    PlayerController.claimableCardPost(msg,undefined,lastCard,"----- No priority card -----") :  
                    PlayerController.claimableCardPost(msg,undefined,lastCard,"🆕"+"\n----- No priority card -----");
                    player.save();
            }
        }catch(err){
           msg.channel.send(err.toString());
        }
    }

    //Individual Card Claiming Logic
    static claimableCardPost(msg:Message,packOwnerPlayer:Player,card:Card,footer:string=undefined){
        const embed:MessageEmbed=CardEmbeds.cardEmbedMessage(card);
        if(footer){ embed.setFooter(footer);}
        msg.channel.send(embed).then((sentMsg:Message)=>{
            sentMsg.react("👍");
            const collector=sentMsg.createReactionCollector(EmbedsUtils.needersEmojiFilter,{max:15,time:13000});
            const usersSet=new Set<string>();
            const neederPlayers=new Array<[number,Player]>();
            const neederFilter=(user:User)=>{return user.bot===false && usersSet.has(user.id)===false};
            collector.on("collect",(msgr:MessageReaction)=>{
                const user:User=msgr.users.cache.array().filter(neederFilter)[0];
                if(user){
                    let neederPlayer=PlayerHandler.getInstance().playerAPI.getPlayerById(user.id);
                    if(msgr.emoji.name==="👍"){
                        if(neederPlayer.hasClaims()){
                            neederPlayer.removeClaim();
                            neederPlayers.push([1,neederPlayer]);
                            usersSet.add(user.id);
                        }else{
                            msg.channel.send(`${user} has no claims left.`);
                        }
                    }
                    if(msgr.emoji.name==="⭐"){
                        if(neederPlayer.hasPriorityClaims()){
                            neederPlayer.removePriorityClaim();
                            neederPlayers.push([2,neederPlayer]);
                            usersSet.add(user.id);
                        }else{
                            msg.channel.send(`${user} has no priority claims left`);
                        }
                    }   
                }
            });

            collector.on("end",(msgr:MessageReaction)=>{
                const lootResult=LootingSystem.splitLoot(packOwnerPlayer,neederPlayers,card);
                if(lootResult.winner){
                    const winnerName=DiscordUtils.getUserFromMessageById(msg,lootResult.winner.getId);
                    sentMsg.channel.send(`${winnerName} has won ${card.name}.`);
                    lootResult.winner.save();
                }else{
                    sentMsg.channel.send(`${card.name} got away unclaimed.`)
                }
            });
        });
    }

    //sort :type
    static sort(msg:Message,client:Client,params:any){
        try{
            if(isNullOrUndefined(params) || isNullOrUndefined(params.type)) throw new NoSortException();

            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();
            player.sort(params.type) ? msg.channel.send("Sorted") : msg.channel.send("No sort type found for that word");
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //my profile
    static myProfile(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();
            const embed=player.getPlayerCachedEmbeds.profileEmbed.setTitle(msg.member.displayName+" Profile").setThumbnail(msg.author.avatarURL({format:"png"}));
            msg.channel.send(embed);
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //my cards
    static myCards(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();
           const embeds=player.getPlayerCachedEmbeds.cardsEmbedPages;
           paginationEmbed(msg,embeds,['⏪', '⏩'],GameConstants.PAGINATION_TIMEOUT);
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //my collection
    static collection(msg:Message,client:Client,params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();
           const embeds=player.getPlayerCachedEmbeds.collectionEmbedPages;
           paginationEmbed(msg,embeds,['⏪', '⏩'],GameConstants.PAGINATION_TIMEOUT);
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //my collection :page
    static collectionPage(msg:Message,client:Client,params:any){
        try{
            const page=parseInt(params.page)-1;
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();
            const embedPage=player.getPlayerCachedEmbeds.collectionEmbedPages[page] || new MessageEmbed().setTitle("Page unavailable");
            msg.channel.send(embedPage);
        }catch(err){
            msg.channel.send(err.toString());
        }
    }
        
    //my packs
    static myPacks(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            const embed=player.getPlayerCachedEmbeds.packsEmbedPage;
            msg.channel.send(embed);
        }catch(err){
           msg.channel.send(err.toString());
        }
    }

    //sacrifice for :cardName*
    static sacrificeFor(msg:Message, client:Client, params:any){
        try{
            const cardName=ControllerUtils.parsePokemonName(params.cardName);
            const possibleResult:Card=CardManager.getInstance().getItemByName(cardName);
            const sacrifice:Sacrifice=SacrificeManager.getInstance().getSacrifice(possibleResult);
            const cardNeeded:Card=CardManager.getInstance().getItemById(sacrifice.preSacrificeId);

            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);

            const isUniqueOwned=PlayerHandler.getInstance().playerAPI.findUsersWithCard(possibleResult).length>0;
            if(cardNeeded.unique && isUniqueOwned) throw new UniqueAlreadyOwnerException();
            const sucess=player.sacrificeFor(possibleResult);
            sucess ?
                msg.channel.send(`You have upgraded your: ${cardNeeded.name} to ${possibleResult.name}.`) :
                msg.channel.send(`You have failed upgrading your: ${cardNeeded.name} to ${possibleResult.name}.`);
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //steal :mention :cardName*
    static stealCard(msg:Message, client:Client, params:any){
        try{
            const mention=DiscordUtils.getMentionFromMessage(msg);
            if(isNullOrUndefined(mention)) throw new NoMentionFoundException();
    
            const cardName=ControllerUtils.parsePokemonName(params.cardName);
            const card=CardManager.getInstance().getItemByName(cardName);
    
            let thief=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            let victim=PlayerHandler.getInstance().playerAPI.getPlayerById(mention.id);
    
            const sucess=thief.stealCard(card,victim);
            if(sucess){
                msg.channel.send(`${msg.author} has stolen ${card.name} from ${mention}.`);
            }
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //missing :packId
    static missingCards(msg:Message, client:Client, params:any){
        try{
            const packId=parseInt(params.packId);
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            const pack=PackManager.getInstance().getItemById(packId);
            let missingCardNames="";
            pack.possibleItemsIds.forEach((cardId:number)=>{
                const card=CardManager.getInstance().getItemById(cardId);
                if(!player.hasCard(card) && missingCardNames.length<2048) missingCardNames+=card.name+" | ";
            });
            msg.channel.send(missingCardNames);
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //my achievements
    static myAchievements(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            let text="";
            player.getAchievements.forEach((achievId:number)=>{
                const achiev=AchievmentSystem.getInstance().getItemById(achievId);
                text+=`${achiev.name}-${achiev.description}\n`;
            });
            msg.channel.send(new MessageEmbed().setTitle("My Achievements").setDescription(text));
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //transform ditto :cardName*
    static transformDitto(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            const cardName=ControllerUtils.parsePokemonName(params.cardName);
            const ditto=CardManager.getInstance().getItemByName("Ditto");
            const wantedCard=CardManager.getInstance().getItemByName(cardName);
            const transformWorked=player.transformCard(ditto,wantedCard);
            transformWorked ? msg.channel.send("Transform Sucess") : msg.channel.send("Transform Failed");
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //transform mew :cardName*
    static transformMew(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            const cardName=ControllerUtils.parsePokemonName(params.cardName);
            const ditto=CardManager.getInstance().getItemByName("Mew");
            const wantedCard=CardManager.getInstance().getItemByName(cardName);
            const transformWorked=player.transformCard(ditto,wantedCard,2);
            transformWorked ? msg.channel.send("Transform Sucess") : msg.channel.send("Transform Failed");
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //bidoof roll
    static bidoofRoll(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            const bidoof:Card=CardManager.getInstance().getItemByName("Bidoof");
            if(player.hasCard(bidoof)){
                player.removeCard(bidoof);
                player.addExperience(GameConstants.EXP_CLAIM);
                const rng=Mathf.randomInt(0,100);
                const randomPack=PackManager.getInstance().getItemById(Mathf.randomInt(1,PackManager.getInstance().packs.size));
                let wonCard:Card;
                if(Mathf.inRange([0,5],rng)){
                    const rngIndex=Mathf.randomInt(0,randomPack.ultraItemsIds.length-1);
                    wonCard=CardManager.getInstance().getItemById(randomPack.ultraItemsIds[rngIndex]);
                }else if(Mathf.inRange([5,15],rng)){
                    const rngIndex=Mathf.randomInt(0,randomPack.legendaryItemsIds.length-1);
                    wonCard=CardManager.getInstance().getItemById(randomPack.legendaryItemsIds[rngIndex]);
                }else if(Mathf.inRange([15,40],rng)){
                    const rngIndex=Mathf.randomInt(0,randomPack.epicItemsIds.length-1);
                    wonCard=CardManager.getInstance().getItemById(randomPack.epicItemsIds[rngIndex]);
                }else{
                    player.addGold(-1);
                    msg.channel.send("You unlucky, you lose 1 Gold");
                }
                if(wonCard){
                    player.addCard(wonCard);
                    msg.channel.send(CardEmbeds.cardEmbedMessage(wonCard).setFooter(`You lucky, you win ${wonCard.name}`));
                }
                player.save();
            }
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    //delete pack :amount :packName*
    static deletePacks(msg:Message, client:Client, params:any){
        try{
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            const ammount=parseInt(params.amount);
            const packName=ControllerUtils.parsePackName(params.packName);
            let packToDelete;
            Mathf.isNumeric(packName) ? packToDelete=PackManager.getInstance().getItemById(parseInt(packName)) : packToDelete=PackManager.getInstance().getItemByName(packName);
            for (let index = 0; index < ammount; index++) {
                player.removePack(packToDelete);
                player.addExperience(GameConstants.EXP_PACK);
            }
            player.save();
        }catch(err){
            msg.channel.send(err.toString());
        }
    }

    
}