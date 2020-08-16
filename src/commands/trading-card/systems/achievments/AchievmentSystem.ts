import { Achievment } from "./Achievment";
import { AchievmentFactory } from "./AchievmentFactory";
import { isNullOrUndefined } from "util";
import { Player } from "../../player/Player";
import { AchievmentNotFoundException } from "../../player/exceptions/AchievmentNotFoundException";

export class AchievmentSystem{
    private static instance:AchievmentSystem;
    private achievments:Array<Achievment>;

    private constructor(){
        this.achievments=new Array<Achievment>();
        this.fill();
    }

    static getInstance() : AchievmentSystem{
        if(isNullOrUndefined(AchievmentSystem.instance)){
            AchievmentSystem.instance=new AchievmentSystem();
        }
        return AchievmentSystem.instance;
    }

    updatePlayerAchievments(player:Player) : void{
        this.achievments.forEach((achievment:Achievment)=>{
            if(achievment.hasUnlockedAchievment(player)){
                achievment.addAchievment(player);
                player.save();
            }
        });
    }

    private fill(): void {
        AchievmentFactory.ACHIEVMENTS.forEach((achievment:Achievment)=>{
            this.achievments.push(achievment);
        });
    }

    getItemById(itemId: number): Achievment {
        return this.achievments[itemId-1];
    }

    getItemByName(itemName:string) : Achievment{
        for (let i = 0; i < this.achievments.length; i++) {
            const currentAchievment=this.achievments[i];
            if(currentAchievment.name.toLowerCase()===itemName.toLowerCase()){
                return currentAchievment;
            }
        }
        throw new AchievmentNotFoundException();
    }

    getTagsFor(achievmentsSet:Set<number>) : string{
        let arr=new Array<string>();
        achievmentsSet.forEach((achievId:number)=>arr.push(this.getItemById(achievId).tag));
        return arr.join("");
    }
}