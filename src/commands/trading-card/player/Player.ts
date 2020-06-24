import { Card } from "../cards/Card";
import { Inventory } from "../inventory/Inventory";
import { PlayerSaveData } from "./PlayerSaveData";
import { Paths } from "../utils/Paths";
import { writeFileSync } from "fs";
import { CardManager } from "../cards/CardManager";
import { Pack } from "../packs/Pack";
import { Rarity } from "../drop-generation/Rarity";
import { Trader } from "../trader/Trader";
import { DropRate } from "../drop-generation/DropRate";

export class Player{
    private static readonly GOLD_RATE=125;
    private static readonly CLAIM_RATE=3;
    private static readonly TRADE_RATE=1;

    private id:string;
    private gold:number;
    private claims:number;
    private trades:number;
    private cards:Inventory;
    private packs:Inventory;
    private top10CardIds:Array<number>;
    private packsOpened:number;
    private dryStreak:number;
    private cardWishId:number;
    private luckModifier:number;

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

    ////#region ############ METHODS ############
    trade(cardtoSend:Card,cardToReceive:Card,requestedPlayer:Player) : boolean{
        if(this.hasTrades() && requestedPlayer.hasTrades()){
            if(this.hasCard(cardtoSend) && requestedPlayer.hasCard(cardToReceive)){
                this.removeCard(cardtoSend);
                this.addCard(cardToReceive);
                this.removeTrade();

                requestedPlayer.removeCard(cardToReceive);
                requestedPlayer.addCard(cardtoSend);
                requestedPlayer.removeTrade();
                return true;
            }
        }
        return false;
    }

    wish(cardName:string) : boolean{
        const card=CardManager.getInstance().getItemByName(cardName);
        if(card){
            this.cardWishId=card.id;
            this.save();
            return true;
        }else{
            return false;
        }
    }

    buyPack(pack:Pack) : boolean{
        if(this.gold>=pack.goldValue){
            this.addPack(pack);
            this.removeGold(pack.goldValue);
            return true;
        }else{
            return false;
        }
    }

    buyXPack(pack:Pack,ammount:number) : boolean{
        const totalGoldAmmount=pack.goldValue*ammount;
        if(this.gold>=totalGoldAmmount){
            for (let index = 0; index < ammount; index++) {
                this.addPack(pack);
            }
            this.removeGold(totalGoldAmmount);
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
            const hasUltra=cards.filter((card:Card)=>{return Rarity.isInUltraRange(card.stars);}).length>0;
            (hasUltra || this.getDryStreak()>DropRate.DRY_STREAK_THRESHOLD) ? this.dryStreak=0 : this.dryStreak++;
            this.save();
            return cards;
        }else{
            return undefined;
        }
    }

    giveCard(player:Player,card:Card){
        if(this.hasTrades() && this.hasCard(card)){
            this.removeCard(card);
            this.removeTrade();
            player.addCard(card);
            return true;
        }else{
            return false;
        }
    }
    ////#endregion

    ////#region ############ GETTERS ############
    getId() : string{
        return this.id;
    }

    getGold() : number{
        return this.gold;
    }

    getClaims() : number{
        return this.claims;
    }

    getTrades() : number{
        return this.trades;
    }

    getWish() : number{
        return this.cardWishId;
    }

    getLuckModifier() : number{
        return this.luckModifier;
    }

    getDryStreak() : number{
        return this.dryStreak;
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

    hasTrades() : boolean{
        return this.trades>0;
    }

    getCards() : Map<number,number>{
        return this.cards.items;
    }

    getPacks() : Map<number,number>{
        return this.packs.items;
    }

    isEmptyCards() : boolean{
        return this.cards.items.size<=0;
    }

    isEmptyPacks() : boolean{
        return this.packs.items.size<=0;
    }


    ////#endregion

    ////#region ############ SETTERS ############
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
    ////#endregion
    
    reroll(card1:Card,card2:Card,card3:Card,trader:Trader) : Card{
        const hasCards=this.cards.contains(card1.id) && this.cards.contains(card2.id) && this.cards.contains(card3.id);
        if(hasCards){
            this.removeCard(card1);
            this.removeCard(card2);
            this.removeCard(card3);
            const cardResult:Card=trader.reRoll(card1,card2,card3);
            this.addCard(cardResult);
            return cardResult;
        }else{
            return undefined;
        }
    }

    save() : void{
        const playerPath=Paths.getPlayerFilePath(this.id);
        writeFileSync(playerPath,JSON.stringify(this.toSaveData()));
    }

}