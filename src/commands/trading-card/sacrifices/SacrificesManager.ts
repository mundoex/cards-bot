import { Sacrifice } from "./Sacrifice";
import { Paths } from "../utils/Paths";
import { readFileSync } from "fs";
import { CardManager } from "../cards/CardManager";
import { isNullOrUndefined } from "util";
import { Card } from "../cards/Card";

export class SacrificeManager {
    private static instance:SacrificeManager;
    sacrificeMap:Map<string,Sacrifice>;

    private constructor(){
        this.sacrificeMap=new Map<string,Sacrifice>();
        this.fill();
    }

    public static getInstance(){
        if(isNullOrUndefined(SacrificeManager.instance)){
            SacrificeManager.instance=new SacrificeManager();
        }
        return SacrificeManager.instance;
    }

    private static getSacrificesFromJSON() : Array<[number,number,number,number]>{
        return JSON.parse(readFileSync(Paths.SACRIFICES_FOLDER_PATH).toString());
    }

    fill(){
        const sacrificesDataArray=SacrificeManager.getSacrificesFromJSON();
        sacrificesDataArray.map((sacrificeData:[number,number,number,number])=>{return new Sacrifice(sacrificeData);})
            .forEach((sacrifice:Sacrifice)=>{
                const card=CardManager.getInstance().getItemById(sacrifice.postSacrificeId);
                this.sacrificeMap.set(card.name,sacrifice);
            });
    }

    getSacrifice(card:Card) : Sacrifice{
        return this.sacrificeMap.get(card.name);
    }
}