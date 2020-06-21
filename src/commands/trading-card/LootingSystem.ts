import { Card } from "./cards/Card";
import { Player } from "./player/Player";
import { Mathf } from "./utils/Mathf";
import { PlayerHandler } from "./player/PlayerHandler";

export class LootingSystem{
    static splitLoot(packOwner:Player, needers:Array<Player>, card:Card){
        const winner:Player=LootingSystem.decideCardWinner(packOwner,needers);
        winner.addCard(card);
        return winner;
    }

    private static decideCardWinner(packOwner:Player, needers:Array<Player>) : Player{
        let winner:Player=needers[Mathf.randomInt(0, needers.length-1)];
        for(let i=0;i<needers.length;i++){
            if(needers[i].id===packOwner.id){
                return needers[i];
            }
        }
        return winner;
    }

    static validNeeders(usersIds:Array<string>){
        return usersIds.map((id:string)=>{return PlayerHandler.getInstance().getPlayerById(id)}).filter((player:Player)=>{return player.claims>0});
    }
}
