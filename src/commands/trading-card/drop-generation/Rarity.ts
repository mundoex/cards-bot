import { Mathf } from "../utils/Mathf";
import { GameConstants } from "../global/GameConstants";

export class Rarity{
    stars:number;
    rarity:number;
    
    constructor(stars:number){
        this.stars=stars;
        this.rarity=Rarity.getRarityFromStars(stars);
    }

    get toString() : string{
        switch(this.rarity){
            case(GameConstants.RARITY_ULTRA): return "Ultra";
            case(GameConstants.RARITY_LEGENDARY): return "Legendary";
            case(GameConstants.RARITY_EPIC): return "Epic";
            case(GameConstants.RARITY_RARE): return "Rare";
            case(GameConstants.RARITY_COMMON): 
            default: return "Common"; 
        }
    }

    static starsToString(stars:number) : string{
        return ":star:".repeat(stars);
    }

    get colorString() : string{
        switch(this.rarity){
            case(GameConstants.RARITY_ULTRA): return ":red_circle:";
            case(GameConstants.RARITY_LEGENDARY): return ":orange_circle:";
            case(GameConstants.RARITY_EPIC): return ":purple_circle:";
            case(GameConstants.RARITY_RARE): return ":blue_circle:";
            case(GameConstants.RARITY_COMMON): 
            default: return ":white_circle:"; 
        }
    }

    static getRarityFromStars(stars:number){
        if(Rarity.isInUltraRange(stars)){
            return GameConstants.RARITY_ULTRA;
        }else if(Rarity.isInLegendaryRange(stars)){
            return GameConstants.RARITY_LEGENDARY;
        }else if(Rarity.isInEpicRange(stars)){
            return GameConstants.RARITY_EPIC;
        }else if(Rarity.isInRareRange(stars)){
            return GameConstants.RARITY_RARE;
        }else{
            return GameConstants.RARITY_COMMON;
        }
    }

    static averageRarity(rarities:Array<number>) : number{
        return Mathf.average(rarities);
    }

    static isInUltraRange(stars:number) : boolean{
        return Mathf.inRange(GameConstants.ULTRA_RANGE, stars);
    }

     static isInLegendaryRange(stars:number) : boolean{
        return Mathf.inRange(GameConstants.LEGENDARY_RANGE, stars);
    }

    static isInEpicRange(stars:number) : boolean{
        return Mathf.inRange(GameConstants.EPIC_RANGE, stars);
    }

    static isInRareRange(stars:number) : boolean{
        return Mathf.inRange(GameConstants.RARE_RANGE, stars);
    }

    static isInCommonRange(stars:number) : boolean{
        return Mathf.inRange(GameConstants.COMMON_RANGE, stars);
    }
}