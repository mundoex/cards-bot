import { Player } from "../../player/Player";
import { PlayerEvents } from "../../player/PlayerEvents";
import { Broadcaster } from "../../broadcaster/Broadcaster";

export class Achievment{
    id:number;
    name:string;
    tag:string;
    description:string;
    rewardText:string;
    verificationFunction:Function;
    rewardFunction:Function;

    constructor(id:number, name:string, tag:string,description:string, rewardText:string, verificationFunction:Function, rewardFunction:Function){
        this.id=id;
        this.name=name;
        this.tag=tag;
        this.description=description;
        this.rewardText=rewardText;
        this.verificationFunction=verificationFunction;
        this.rewardFunction=rewardFunction;
    }

    hasUnlockedAchievment(player:Player) : boolean{
        return !player.getAchievements.has(this.id) && this.verificationFunction(player);
    }

    giveReward(player:Player){
        return this.rewardFunction(player);
    }

    addAchievment(player:Player){
        this.giveReward(player);
        player.getAchievements.add(this.id);
        player.eventListener.emit(PlayerEvents.ACHIEVMENT_UNLOCKED,player);
        const playerName=Broadcaster.getInstance().getPlayerNameFromId(player.getId);
        Broadcaster.getInstance().broadcast(`${playerName} has unlocked achievement: ${this.name}.`)
    }
}