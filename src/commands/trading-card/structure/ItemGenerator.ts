import { IManager } from "./IManager";
import { Mathf } from "../utils/Mathf";
import { isNullOrUndefined } from "util";
import { GameConstants } from "../global/GameConstants";

export abstract class ItemGenerator<T>{
    possibleItemsIds:Array<number>;
    ultraItemsIds:Array<number>;
    legendaryItemsIds:Array<number>;
    epicItemsIds:Array<number>;
    rareItemsIds:Array<number>;
    commonItemsIds:Array<number>;
    managerInstance:IManager<T>;

    constructor(possibleItemsIds:Array<number>, managerInstance:IManager<T>){
        this.possibleItemsIds=possibleItemsIds;
        this.ultraItemsIds=new Array<number>();
        this.legendaryItemsIds=new Array<number>();
        this.epicItemsIds=new Array<number>();
        this.rareItemsIds=new Array<number>();
        this.commonItemsIds=new Array<number>();
        this.managerInstance=managerInstance;
        this.fillRarityItemIds();
    }

    abstract fillRarityItemIds() : void;

    randomItemByRarity(rarity:number) : T{
        const idsArray:Array<number>=this.getIdsArrayByRarity(rarity);
        const random=Mathf.randomInt(0,idsArray.length-1);
        const item=this.managerInstance.getItemById(idsArray[random]);
        return !isNullOrUndefined(item) ? item : this.randomItemByRarity(rarity-1);
    }

    getIdsArrayByRarity(rarity:number) : Array<number>{
        switch(rarity){
            case(GameConstants.RARITY_ULTRA): return this.ultraItemsIds;
            case(GameConstants.RARITY_LEGENDARY): return this.legendaryItemsIds;
            case(GameConstants.RARITY_EPIC):  return this.epicItemsIds;
            case(GameConstants.RARITY_RARE):  return this.rareItemsIds;
            case(GameConstants.RARITY_COMMON):    return this.commonItemsIds;
            default:    return this.commonItemsIds;    
        }
    }

    contains(itemId:number) : boolean{
        return this.possibleItemsIds.find((id:number)=>{return itemId===id})!==undefined;
    }
}