import { InventorySaveData } from "../../../inventory/InventorySaveData";

export interface PlayerData{
    id:string;
    experience:number;
    gold:number;
    claims:number;
    priorityClaims:number;
    trades:number;
    cardWishId:number;
    //Modifiers
    experienceModifier:number;
    luckModifier:number;
    goldModifier:number;
    protectionExpiration:number;
    //collection data
    top10CardsIds:Array<number>;
    dryStreaks:Array<[number,number]>;
    achievements:Array<number>;
    cards:InventorySaveData;
    packs:InventorySaveData;
    packsOpened:InventorySaveData;
    //Stats
    claimsComplete:number;
    totalGoldEarned:number;
    valueableStealsPrevented:number;
    valueableStealsCompleted:number;
    bountiesComplete:number;
    tradesComplete:number;
    triviasComplete:number;
    rerollsComplete:number;
    gamblesComplete:number;
    sacrifices:number;
    cardsCaught:number;
    totalPacksBought:number;
}