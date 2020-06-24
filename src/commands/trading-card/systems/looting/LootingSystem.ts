import { Card } from "../../cards/Card";
import { Player } from "../../player/Player";
import { Mathf } from "../../utils/Mathf";
import { PlayerHandler } from "../../player/PlayerHandler";
import { LootResult } from "./LootResult";

export class LootingSystem{
    static splitLoot(packOwner:Player, needers:Array<Player>, card:Card){
        const lootResult:LootResult=LootingSystem.getLootResult(packOwner,needers);
        if(lootResult.winner){
            lootResult.winner.addCard(card);    //give winner card
        }
        if(lootResult.losers.length>0){
            lootResult.losers.forEach((loser:Player)=>{loser.addClaim();}); //give loser claim back
        }
        return lootResult;
    }

    private static getLootResult(packOwner:Player, needers:Array<Player>) : LootResult{
        let lootResult:LootResult={winner:undefined,losers:undefined};
        LootingSystem.isOwnerNeeder(packOwner,needers) ? lootResult.winner=packOwner : lootResult.winner=needers[Mathf.randomInt(0, needers.length-1)];
        lootResult.losers=LootingSystem.removeWinnerFromNeeders(lootResult.winner,needers);
        return lootResult;
    }

    static validNeeders(usersIds:Array<string>){
        return usersIds.map((id:string)=>{return PlayerHandler.getInstance().getPlayerById(id)}).filter((player:Player)=>{return player.hasClaims()});
    }

    static isOwnerNeeder(packOwner:Player, needers:Array<Player>) : boolean{
        for(let i=0;i<needers.length;i++){
            if(packOwner.getId()===needers[i].getId()){
                return true;
            }
        }
        return false;
    }

    static removeWinnerFromNeeders(winner:Player,needers:Array<Player>) : Array<Player>{
        return needers.filter((needer:Player)=>{return needer.getId()!==winner.getId()});
    }
}
