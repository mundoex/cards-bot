import { InventorySaveData } from "../inventory/InventorySaveData";

export class PlayerSaveData{
    id:string;
    gold:number;
    claims:number;
    trades:number;
    cards:InventorySaveData;
    packs:InventorySaveData;
    top10CardsIds:Array<number>;
    packsOpened:number;
    dryStreak:number;
    cardWishId:number;
    luckModifier:number;

    constructor(id:string,gold:number,claims:number,trades:number,cards:InventorySaveData,packs:InventorySaveData,top10CardsIds:Array<number>,packsOpened:number,dryStreak:number,cardWishId:number,luckModifier:number){
        this.id=id;
        this.gold=gold;
        this.claims=claims;
        this.trades=trades;
        this.cards=cards;
        this.packs=packs;
        this.top10CardsIds=top10CardsIds;
        this.packsOpened=packsOpened;
        this.dryStreak=dryStreak;
        this.cardWishId=cardWishId;
        this.luckModifier=luckModifier;
    }
}