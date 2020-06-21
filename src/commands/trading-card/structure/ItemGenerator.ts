import { IManager } from "./IManager";
import { Mathf } from "../utils/Mathf";
import { isNullOrUndefined } from "util";
import { Rarity } from "../drop-generation/Rarity";

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
            case(Rarity.ULTRA): return this.ultraItemsIds;
            case(Rarity.LEGENDARY): return this.legendaryItemsIds;
            case(Rarity.EPIC):  return this.epicItemsIds;
            case(Rarity.RARE):  return this.rareItemsIds;
            case(Rarity.COMMON):    return this.commonItemsIds;
            default:    return this.commonItemsIds;    
        }
    }

    contains(itemId:number) : boolean{
        return this.possibleItemsIds.find((id:number)=>{return itemId===id})!==undefined;
    }
}