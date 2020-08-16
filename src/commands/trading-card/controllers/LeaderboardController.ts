import { Message, Client } from "discord.js";
import { LeaderboardEmbed } from "../embeds/LeaderboardEmbed";

export class LeaderboardController{
    //###################### LEADERBOARD COMMANDS ######################
    //leaderboard gold
    static leaderboardGold(msg:Message,client:Client,params:any){
        msg.channel.send(LeaderboardEmbed.leaderboardGoldEmbed());
    }
    //leaderboard packs
    static leaderboardPacksOpened(msg:Message,client:Client,params:any){
        msg.channel.send(LeaderboardEmbed.leaderboardPacksOpenedEmbed());
    }
    //leaderboard level
    static leaderboardLevel(msg:Message,client:Client,params:any){
        msg.channel.send(LeaderboardEmbed.leaderboardLevelEmbed());
    }

    //leaderboard collection
    static leaderboardCollectionPercentage(msg:Message,client:Client,params:any){
        msg.channel.send(LeaderboardEmbed.leaderboardCollectionEmbed());
    }

    //leaderboard cards
    static leaderboardMostCardsCaught(msg:Message,client:Client,params:any){
        msg.channel.send(LeaderboardEmbed.leaderboardCardsCaughtEmbed());
    }

    //leaderboard ultras
    static leaderboardUltras(msg:Message,client:Client,params:any){
        msg.channel.send(LeaderboardEmbed.leaderboardUltrasEmbed());
    }
}