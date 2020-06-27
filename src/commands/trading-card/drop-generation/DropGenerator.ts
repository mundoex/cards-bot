import { Mathf } from "../utils/Mathf";
import { GameConstants } from "../global/GameConstants";
import { Rarity } from "./Rarity";

export class DropGenerator{
    luckModifier:number;
    rare:number;
    epic:number;
    legendary:number;
    ultra:number;

    constructor(luckModifier:number=0){
        this.luckModifier=luckModifier;
        this.rare=GameConstants.DROP_RATE_RARE+Mathf.percentageOf(GameConstants.DROP_RATE_RARE,luckModifier);
        this.epic=GameConstants.DROP_RATE_EPIC+Mathf.percentageOf(GameConstants.DROP_RATE_EPIC,luckModifier);
        this.legendary=GameConstants.DROP_RATE_LEGENDARY+Mathf.percentageOf(GameConstants.DROP_RATE_LEGENDARY,luckModifier);
        this.ultra=GameConstants.DROP_RATE_ULTRA+Mathf.percentageOf(GameConstants.DROP_RATE_ULTRA,luckModifier);
    }

    private get ultraRange() : Array<number>{
        return [0, this.ultra];
    }

    private get legendaryRange() : Array<number>{
        return [GameConstants.DROP_RATE_ULTRA,GameConstants.DROP_RATE_ULTRA+this.legendary];
    }
    
    private get epicRange() : Array<number>{
        return [GameConstants.DROP_RATE_LEGENDARY, GameConstants.DROP_RATE_LEGENDARY+this.epic];
    }

    private get rareRange() : Array<number>{
        return [GameConstants.DROP_RATE_EPIC, GameConstants.DROP_RATE_EPIC+this.rare];
    }

    generateRandomRarity() : number{
        const random=Mathf.randomDecimal(0,100,4)/100;
        if(this.isUltraDrop(random)){
            return GameConstants.RARITY_ULTRA;
        }else if(this.isLegendaryDrop(random)){
            return GameConstants.RARITY_LEGENDARY;
        }else if(this.isEpicDrop(random)){
            return GameConstants.RARITY_EPIC;
        }else if(this.isRareDrop(random)){
            return GameConstants.RARITY_RARE;
        }else{
            return GameConstants.RARITY_COMMON;
        }
    }

    private isUltraDrop(random:number) : boolean{
        return Mathf.inRange(this.ultraRange, random);
    }

    private isLegendaryDrop(random:number) : boolean{
        return Mathf.inRange(this.legendaryRange, random);
    }

    private isEpicDrop(random:number) : boolean{
        return Mathf.inRange(this.epicRange, random);
    }

    private isRareDrop(random:number) : boolean{
        return Mathf.inRange(this.rareRange, random);
    }
}