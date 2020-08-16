import { Card } from "../../cards/Card";
import { Player } from "../../player/Player";
import { Mathf } from "../../utils/Mathf";
import { LootResult } from "./LootResult";
import { GameConstants } from "../../global/GameConstants";

export class LootingSystem{
    static splitLoot(packOwner:Player, needers:Array<[number,Player]>, card:Card){
        const lootResult:LootResult=LootingSystem.getLootResult(packOwner,needers);
        if(lootResult.winner){
            lootResult.winner.addCard(card);    //give winner card
            lootResult.winner.addExperience(GameConstants.EXP_CLAIM);
        }
        lootResult.losers.forEach((loser:Player)=>{
            loser.addClaim();
        }); //give loser claim back
        return lootResult;
    }

    private static getLootResult(packOwner:Player, needers:Array<[number,Player]>) : LootResult{
        let lootResult:LootResult={winner:undefined,losers:new Array<Player>()};
        LootingSystem.updateOwnerPriority(packOwner,needers);
        if(needers.length>0){
            const highestPriority=needers.map((needer:[number,Player])=>{return needer[0];}).reduce((max:number,current:number)=>{return Math.max(max,current);});
            const highestPriorityPlayers=needers.filter((needer:[number,Player])=>{return needer[0]===highestPriority;});
            const rng=Mathf.randomInt(0,highestPriorityPlayers.length-1);
            lootResult.winner=highestPriorityPlayers[rng][1];
            lootResult.losers=LootingSystem.removeWinnerFromNeeders(lootResult.winner,needers);
        }
        return lootResult;
    }

    private static removeWinnerFromNeeders(winner:Player,needers:Array<[number,Player]>) : Array<Player>{
        return needers.filter((currentTuple:[number,Player])=>{return currentTuple[1].getId!==winner.getId;})
            .map((tuple:[number,Player])=>{return tuple[1]});
    }

    private static updateOwnerPriority(packOwner:Player, needers:Array<[number,Player]>) : void{
        if(packOwner){
            for(let i=0;i<needers.length;i++){
                const [currentPriority, currentPlayer] = needers[i];
                if(packOwner.getId===currentPlayer.getId){
                    needers[i][0]++;    //increment current player priority if packOwner
                }
            }
        }
    }
}