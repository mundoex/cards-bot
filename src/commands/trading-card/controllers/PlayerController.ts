import { Message, Client, MessageEmbed, User, MessageReaction } from "discord.js";
import { PlayerHandler } from "../player/PlayerHandler";
import { PackManager } from "../packs/PackManager";
import { Card } from "../cards/Card";
import { Player } from "../player/Player";
import { EmbedsManager } from "../client/EmbedsManager";
import { LootingSystem } from "../systems/looting/LootingSystem";
import { CardManager } from "../cards/CardManager";
import { Mathf } from "../utils/Mathf";

export class PlayerController{
    //###################### PLAYER COMMANDS ######################
    //wish :cardName
    static wish(msg:Message, client:Client, params:any){
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const result=player.wish(params.cardName);
        if(result){
            msg.channel.send("Wish set sucessfully");
        }else{
            msg.channel.send("Error setting wish");
        }
    }

    //trade :mention :cards*
    static trade(msg:Message, client:Client, params:any){
        const user=msg.mentions.users.first();
        if(user===undefined){return msg.channel.send("Can't find that user");}

        const cardNames:Array<string>=params.cards.join(" ").split("$");
        if(cardNames.length!==2){return msg.channel.send("Error with cards");}
        
        const requester:Player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const accepter:Player=PlayerHandler.getInstance().getPlayerById(user.id);
        if(requester===undefined && accepter===undefined){return msg.channel.send("Error finding players");}

        const cardSend:Card=CardManager.getInstance().getItemByName(cardNames[0]);
        const cardReceive:Card=CardManager.getInstance().getItemByName(cardNames[1]);
        if(cardSend===undefined && cardReceive===undefined){return msg.channel.send("Card name doesnt exist");}

        msg.channel.send(`${user.username} do you accept ${cardSend.name} for ${cardReceive.name}?`).then((sentMsg:Message)=>{
            sentMsg.react("👍");
            const collector=sentMsg.createReactionCollector(EmbedsManager.needersEmojiFilter,{time:13000});
            
            collector.on("collect",(msgr:MessageReaction)=>{
                const accepted=msgr.users.cache.get(accepter.getId())!==undefined;
                if(accepted){
                    const tradeWorked:boolean=requester.trade(cardSend,cardReceive,accepter);
                    if(tradeWorked){
                        msg.channel.send(`${msg.author.username} has traded ${cardSend.name} for ${cardReceive.name} with ${user.username}.`);
                        collector.stop();
                    }else{
                        msg.channel.send("Trade didn't work. Check if you and the other player have trades and both have the card");
                        collector.stop();
                    }
                }
            });
        });
    }

    //open pack :packName
    static packOpen(msg:Message, client:Client, params:any){
        const packName:string=params.packName.join(" ");
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack=PackManager.getInstance().getItemByName(packName);
        if(player!==undefined && pack!==undefined){
            const cards:Array<Card>=player.openPack(pack);
            if(cards){
                for (let index = 0; index < cards.length-1; index++) {
                    const card = cards[index];
                    PlayerController.claimableCardPost(msg,player,card);
                }
                PlayerController.claimableCardPost(msg,undefined,cards[cards.length-1]);
            }else{
                msg.channel.send("You dont have that pack");
            }
        }else{
            msg.channel.send("No such pack");
        }
    }

    static claimableCardPost(msg:Message,packOwnerPlayer:Player,card:Card){
        const embed:MessageEmbed=EmbedsManager.cardEmbedMessage(card);
        msg.channel.send(embed).then((sentMsg:Message)=>{
            sentMsg.react("👍");
            const collector=sentMsg.createReactionCollector(EmbedsManager.needersEmojiFilter,{max:5,time:13000});
            const usersSet=new Set<string>();
            const neederPlayers=new Array<Player>();
            const neederFilter=(user:User)=>{return user.bot===false && usersSet.has(user.id)===false};
            collector.on("collect",(msgr:MessageReaction)=>{
                const user:User=msgr.users.cache.array().filter(neederFilter)[0];
                if(user){
                    usersSet.add(user.id);
                    let neederPlayer=PlayerHandler.getInstance().getPlayerById(user.id);
                    if(neederPlayer.hasClaims()){
                        neederPlayer.removeClaim();
                        neederPlayers.push(neederPlayer);
                    }else{
                        msg.channel.send(`${user.username} has no claims left`);
                    }
                }
            });

            collector.on("end",(msgr:MessageReaction)=>{
                const lootResult=LootingSystem.splitLoot(packOwnerPlayer,neederPlayers,card);
                if(lootResult.winner){
                    const winnerName:string=msg.guild.members.cache.get(lootResult.winner.getId()).user.username;
                    sentMsg.channel.send(`${winnerName} has won ${card.name}.`);
                }else{
                    sentMsg.channel.send(`${card.name} got away unclaimed.`)
                }
            });
        });
    }
}