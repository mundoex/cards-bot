import { Mathf } from "../utils/Mathf";
import { DropRate } from "./DropRate";
import { Rarity } from "./Rarity";

export class DropGenerator{
    luckModifier:number;
    rare:number;
    epic:number;
    legendary:number;
    ultra:number;

    constructor(luckModifier:number=0){
        this.luckModifier=luckModifier;
        this.rare=DropRate.RARE+Mathf.percentageOf(DropRate.RARE,luckModifier);
        this.epic=DropRate.EPIC+Mathf.percentageOf(DropRate.EPIC,luckModifier);
        this.legendary=DropRate.LEGENDARY+Mathf.percentageOf(DropRate.LEGENDARY,luckModifier);
        this.ultra=DropRate.ULTRA+Mathf.percentageOf(DropRate.ULTRA,luckModifier);
    }

    get ultraRange() : Array<number>{
        return [0, this.ultra];
    }

    get legendaryRange() : Array<number>{
        return [DropRate.ULTRA, DropRate.ULTRA+this.legendary];
    }
    
    get epicRange() : Array<number>{
        return [DropRate.LEGENDARY, DropRate.LEGENDARY+this.epic];
    }

    get rareRange() : Array<number>{
        return [DropRate.EPIC, DropRate.EPIC+this.rare];
    }

    generateRandomRarity() : number{
        const random=Mathf.randomDecimal(0,100,3)/100;
        if(this.isUltraDrop(random)){
            return Rarity.ULTRA;
        }else if(this.isLegendaryDrop(random)){
            return Rarity.LEGENDARY;
        }else if(this.isEpicDrop(random)){
            return Rarity.EPIC;
        }else if(this.isRareDrop(random)){
            return Rarity.RARE;
        }else{
            return Rarity.COMMON;
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