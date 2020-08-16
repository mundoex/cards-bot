import { MessageEmbed } from "discord.js";
import { PlayerHandler } from "../player/PlayerHandler";
import { Player } from "../player/Player";
import { Broadcaster } from "../broadcaster/Broadcaster";

export class LeaderboardEmbed{
    static leaderboardGoldEmbed() : MessageEmbed{
        const embed=new MessageEmbed().setTitle("Gold Leaderboard");
        let players:Array<Player>=Array.from(PlayerHandler.getInstance().playerAPI.cachedPlayersMap.values());
        players=players.sort((p1:Player,p2:Player)=>p2.getTotalGoldEarned-p1.getTotalGoldEarned);
        for (let index = 0; index < 11; index++) {
            const player=players[index];
            if(player){
                embed.addField(Broadcaster.getInstance().getPlayerNameFromId(player.getId).username,player.getTotalGoldEarned);
            }

        }
        return embed;
    }

    static leaderboardPacksOpenedEmbed() : MessageEmbed{
        const embed=new MessageEmbed().setTitle("Packs Leaderboard");
        let players:Array<Player>=Array.from(PlayerHandler.getInstance().playerAPI.cachedPlayersMap.values());
        players=players.sort((p1:Player,p2:Player)=>p2.getPacksOpened.totalItemsAmmount()-p1.getPacksOpened.totalItemsAmmount());
        for (let index = 0; index < 11; index++) {
            const player=players[index];
            if(player){
                embed.addField(Broadcaster.getInstance().getPlayerNameFromId(player.getId).username,player.getPacksOpened.totalItemsAmmount());
            }
        }
        return embed;
    }

    static leaderboardLevelEmbed(): MessageEmbed{
        const embed=new MessageEmbed().setTitle("Level Leaderboard");
        let players:Array<Player>=Array.from(PlayerHandler.getInstance().playerAPI.cachedPlayersMap.values());
        players=players.sort((p1:Player,p2:Player)=>p2.getExperience-p1.getExperience);
        for (let index = 0; index < 11; index++) {
            const player=players[index];
            if(player){
                embed.addField(Broadcaster.getInstance().getPlayerNameFromId(player.getId).username,player.level);
            }
        }
        return embed;
    }

    static leaderboardCollectionEmbed(): MessageEmbed{
        const embed=new MessageEmbed().setTitle("Collection Leaderboard");
        let players:Array<Player>=Array.from(PlayerHandler.getInstance().playerAPI.cachedPlayersMap.values());
        players=players.sort((p1:Player,p2:Player)=>p2.getCollectionPercentage-p1.getCollectionPercentage);
        for (let index = 0; index < 11; index++) {
            const player=players[index];
            if(player){
                embed.addField(Broadcaster.getInstance().getPlayerNameFromId(player.getId).username,player.getCollectionString);
            }
        }
        return embed;
    }
    
    static leaderboardCardsCaughtEmbed(): MessageEmbed{
        const embed=new MessageEmbed().setTitle("Total Cards Caught Leaderboard");
        let players:Array<Player>=Array.from(PlayerHandler.getInstance().playerAPI.cachedPlayersMap.values());
        players=players.sort((p1:Player,p2:Player)=>p2.getCardsCaught-p1.getCardsCaught);
        for (let index = 0; index < 11; index++) {
            const player=players[index];
            if(player){
                embed.addField(Broadcaster.getInstance().getPlayerNameFromId(player.getId).username,player.getCardsCaught);
            }       
        }
        return embed;
    }

    static leaderboardUltrasEmbed(): MessageEmbed{
        const embed=new MessageEmbed().setTitle("Ultras Leaderboard");
        let players:Array<Player>=Array.from(PlayerHandler.getInstance().playerAPI.cachedPlayersMap.values());
        players=players.sort((p1:Player,p2:Player)=>p2.ultrasTotal-p1.ultrasTotal);
        for (let index = 0; index < 11; index++) {
            const player=players[index];
            if(player){
                embed.addField(Broadcaster.getInstance().getPlayerNameFromId(player.getId).username,player.ultrasTotal);
            }
        }
        return embed;
    }
}