import { Mathf } from "../utils/Mathf";

export class Rarity{
    //FAKE ENUM
    public static readonly ULTRA=5;
    public static readonly LEGENDARY=4;
    public static readonly EPIC=3;
    public static readonly RARE=2;
    public static readonly COMMON=1;
    //STAR RANGE
    public static readonly ULTRA_RANGE=[10,10];
    public static readonly LEGENDARY_RANGE=[8,9];
    public static readonly EPIC_RANGE=[6,7];
    public static readonly RARE_RANGE=[4,5];
    public static readonly COMMON_RANGE=[1,3];

    stars:number;
    rarity:number;
    
    constructor(stars:number){
        this.stars=stars;
        this.rarity=Rarity.getRarityFromStars(stars);
    }

    get toString() : string{
        switch(this.rarity){
            case(Rarity.ULTRA): return "Ultra";
            case(Rarity.LEGENDARY): return "Legendary";
            case(Rarity.EPIC): return "Epic";
            case(Rarity.RARE): return "Rare";
            case(Rarity.COMMON): 
            default: return "Common"; 
        }
    }

    static starsToString(stars:number) : string{
        return ":star:".repeat(stars);
    }

    get colorString() : string{
        switch(this.rarity){
            case(Rarity.ULTRA): return ":red_circle:";
            case(Rarity.LEGENDARY): return ":orange_circle:";
            case(Rarity.EPIC): return ":purple_circle:";
            case(Rarity.RARE): return ":blue_circle:";
            case(Rarity.COMMON): 
            default: return ":white_circle:"; 
        }
    }

    static getRarityFromStars(stars:number){
        if(Rarity.isInUltraRange(stars)){
            return Rarity.ULTRA;
        }else if(Rarity.isInLegendaryRange(stars)){
            return Rarity.LEGENDARY;
        }else if(Rarity.isInEpicRange(stars)){
            return Rarity.EPIC;
        }else if(Rarity.isInRareRange(stars)){
            return Rarity.RARE;
        }else{
            return Rarity.COMMON;
        }
    }

    static averageRarity(rarities:Array<number>) : number{
        return Mathf.average(rarities);
    }

    static isInUltraRange(stars:number) : boolean{
        return Mathf.inRange(Rarity.ULTRA_RANGE, stars);
    }

     static isInLegendaryRange(stars:number) : boolean{
        return Mathf.inRange(Rarity.LEGENDARY_RANGE, stars);
    }

    static isInEpicRange(stars:number) : boolean{
        return Mathf.inRange(Rarity.EPIC_RANGE, stars);
    }

    static isInRareRange(stars:number) : boolean{
        return Mathf.inRange(Rarity.RARE_RANGE, stars);
    }

    static isInCommonRange(stars:number) : boolean{
        return Mathf.inRange(Rarity.COMMON_RANGE, stars);
    }
}