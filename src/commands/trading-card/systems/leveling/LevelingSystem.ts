import { Player } from "../../player/Player";
import { isNullOrUndefined } from "util";
import { Mathf } from "../../utils/Mathf";
import { Pack } from "../../packs/Pack";
import { PackManager } from "../../packs/PackManager";
import { PlayerEvents } from "../../player/PlayerEvents";
import { Broadcaster } from "../../broadcaster/Broadcaster";

export class LevelingSystem{
    private static instance:LevelingSystem;

    private constructor(){}

    static getInstance() : LevelingSystem{
        if(isNullOrUndefined(LevelingSystem.instance)){
            LevelingSystem.instance=new LevelingSystem();
        }
        return LevelingSystem.instance;
    }

    rewardPlayer(player:Player){
        if(Mathf.multipleOf(player.level,5)){
            player.addGoldModifier(5);
        }
        if(Mathf.multipleOf(player.level,3)){
            player.addGold(player.level*50)
        }
        const times=Math.floor(player.level/2)+1;
        let packs=new Array<Pack>();
        const instance=PackManager.getInstance();
        for (let i = 0; i < times; i++) {
            const rng=Mathf.randomInt(1,instance.packs.size);
            packs.push(instance.getItemById(rng));
        }
        player.addPacks(packs);
        player.addPriorityClaim();
        player.save();
        
        const playerName=Broadcaster.getInstance().getPlayerNameFromId(player.getId);
        Broadcaster.getInstance().broadcast(`${playerName} has reached level ${player.level}.`);
    }
}