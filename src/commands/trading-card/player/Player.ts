import { Card } from "../cards/Card";
import { Inventory } from "../inventory/Inventory";
import { PlayerSaveData } from "./PlayerSaveData";
import { Paths } from "../utils/Paths";
import { writeFileSync } from "fs";
import { CardManager } from "../cards/CardManager";
import { Pack } from "../packs/Pack";
import { PackManager } from "../packs/PackManager";
import { Rarity } from "../drop-generation/Rarity";

export class Player{
    private static readonly GOLD_RATE=125;
    private static readonly CLAIM_RATE=3;
    private static readonly TRADE_RATE=1;

    id:string;
    gold:number;
    claims:number;
    trades:number;
    cards:Inventory;
    packs:Inventory;
    top10CardIds:Array<number>;
    packsOpened:number;
    dryStreak:number;
    cardWishId:number;
    luckModifier:number;

    constructor(id:string,gold:number,claims:number,trades:number,cards:Inventory,packs:Inventory,top10CardIds:Array<number>,packsOpened:number,dryStreak:number,cardWishId:number,luckModifier:number){
        this.id=id;
        this.gold=gold;
        this.claims=claims;
        this.trades=trades;
        this.cards=cards;
        this.packs=packs;
        this.top10CardIds=top10CardIds
        this.packsOpened=packsOpened;
        this.dryStreak=dryStreak;
        this.cardWishId=cardWishId;
        this.luckModifier=luckModifier;
    }

    static fromSaveData(playerSaveData:PlayerSaveData) : Player{
        return new Player(playerSaveData.id,playerSaveData.gold,playerSaveData.claims,playerSaveData.trades,
            Inventory.fromSaveData(playerSaveData.cards),Inventory.fromSaveData(playerSaveData.packs),playerSaveData.top10CardsIds,
            playerSaveData.packsOpened,playerSaveData.dryStreak,playerSaveData.cardWishId,playerSaveData.luckModifier);
    }

    toSaveData() : PlayerSaveData{
        return new PlayerSaveData(this.id,this.gold,this.claims,this.trades,this.cards.toSaveData(),this.packs.toSaveData(),this.top10CardIds,this.packsOpened,this.dryStreak,this.cardWishId,this.luckModifier);
    }

    trade(){

    }

    wish(cardName:string){
        const card=CardManager.getInstance().getItemByName(cardName);
        if(card){
            this.cardWishId=card.id;
            this.save();
            return true;
        }else{
            return false;
        }
    }

    buyPack(pack:Pack){
        if(this.gold>=pack.goldValue){
            this.addPack(pack);
            this.gold-=pack.goldValue;
            return true;
        }else{
            return false;
        }
    }

    buyXPack(pack:Pack,ammount:number){
        const totalGoldAmmount=pack.goldValue*ammount;
        if(this.gold>=totalGoldAmmount){
            for (let index = 0; index < ammount; index++) {
                this.addPack(pack);
            }
            this.gold-=totalGoldAmmount;
            return true;
        }else{
            return false;
        }
    }

    openPack(pack:Pack) : Array<Card>{
        if(this.packs.contains(pack.id)){
            this.removePack(pack);
            this.packsOpened++;
            const cards=pack.open(this.dryStreak,this.luckModifier,this.cardWishId);
            const ultraCards=cards.map((card:Card)=>{ if(Rarity.isInUltraRange(card.stars)){ return card; }});
            ultraCards.length!==0 ? this.dryStreak=0 : this.dryStreak++;
            this.save();
            return cards;
        }else{
            return undefined;
        }
    }

    addCard(card:Card){
        this.cards.add(card.id, 1);
        this.save();
    }

    removeCard(card:Card){
        this.cards.remove(card.id, 1);
        this.save();
    }

    addPack(pack:Pack){
        this.packs.add(pack.id, 1);
        this.save();
    }

    addGold(ammount:number){
        this.gold+=ammount;
        this.save();
    }

    removeGold(ammount:number){
        this.gold-=ammount;
        this.save();
    }

    removePack(pack:Pack){
        this.packs.remove(pack.id, 1);
        this.save();
    }

    addRewards(){
        this.gold+=Player.GOLD_RATE;
        this.trades+=Player.TRADE_RATE;
        this.claims+=Player.CLAIM_RATE;
        this.save();
    }

    hasCard(card:Card) : boolean{
        return this.cards.contains(card.id);
    }

    hasPack(pack:Pack) : boolean{
        return this.cards.contains(pack.id);
    }

    hasClaims() : boolean{
        return this.claims>0;
    }

    addClaim(ammount:number=1){
        this.claims+=ammount;
        this.save();
    }

    removeClaim(ammount:number=1){
        this.claims-=ammount;
        this.save();
    }

    addTrade(ammount:number=1){
        this.trades+=ammount;
        this.save();
    }

    removeTrade(ammount:number=1){
        this.trades-=ammount;
        this.save();
    }

    addLuck(ammount:number=1){
        this.luckModifier+=ammount;
        this.save();
    }

    removeLuck(ammount:number=1){
        this.luckModifier-=ammount;
        this.save();
    }

    

    save() : void{
        const playerPath=Paths.getPlayerFilePath(this.id);
        writeFileSync(playerPath,JSON.stringify(this.toSaveData()));
    }



    
}