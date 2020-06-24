import { Card } from "../cards/Card";
import { CardManager } from "../cards/CardManager";
import { Mathf } from "../utils/Mathf";
import { DropGenerator } from "../drop-generation/DropGenerator";
import { Rarity } from "../drop-generation/Rarity";
import { isNullOrUndefined } from "util";
import { DropRate } from "../drop-generation/DropRate";
import { ItemGenerator } from "../structure/ItemGenerator";
import { PackSaveData } from "./PackSaveData";
import { GoldSystem } from "../systems/GoldSystem";

export class Pack extends ItemGenerator<Card>{
    public static readonly CARDS_PER_PACK=5;
    id:number;
    name:string;
    rarity:Rarity;

    constructor(id:number, name:string, rarity:Rarity, possibleCardsIds:Array<number>) {
        super(possibleCardsIds, CardManager.getInstance());
        this.id=id;
        this.name=name;
        this.rarity=rarity;
    }

    static fromSaveData(packSaveData:PackSaveData) : Pack{
        return new Pack(packSaveData.id,packSaveData.name,new Rarity(packSaveData.stars),packSaveData.possibleItemsIds);
    }

    toSaveData() : PackSaveData{
        return new PackSaveData(this.id,this.name,this.rarity.stars,this.possibleItemsIds);
    }

    fillRarityItemIds(): void {
        const possibleCards:Array<Card>=this.managerInstance.getItemsByIds(this.possibleItemsIds);
        possibleCards.forEach((card:Card)=>{
            switch(card.rarity.rarity){
                case(Rarity.ULTRA): this.ultraItemsIds.push(card.id); break;
                case(Rarity.LEGENDARY): this.legendaryItemsIds.push(card.id); break;
                case(Rarity.EPIC): this.epicItemsIds.push(card.id); break;
                case(Rarity.RARE): this.rareItemsIds.push(card.id); break;
                case(Rarity.COMMON): this.commonItemsIds.push(card.id); break;
                default: this.commonItemsIds.push(card.id); break;
            }
        });
    }

    get goldValue(){
        return GoldSystem.starsToGold(this.rarity.stars);
    }

    private static shouldEndDryStreak(dryStreak:number) : boolean{
        return dryStreak>=DropRate.DRY_STREAK_THRESHOLD;
    }

    shouldGrantWish(wishedCard:Card, rarities:Array<number>) : boolean{
        if(this.contains(wishedCard.id)){
            const shouldGrantWish:boolean=Mathf.randomInt(0,100)/100 <= DropRate.WISH;
            const isRarityPossible:boolean=rarities.find((rarity:number)=>{return rarity===Rarity.getRarityFromStars(wishedCard.stars);})!==undefined;
            return shouldGrantWish && isRarityPossible;
        }else{
            return false;
        }
    }

    generatePackRarities(luckModifier:number) : Array<number>{
        const dropGenerator=new DropGenerator(luckModifier);
        const rarities=new Array<number>();
        for(let i=0;i<Pack.CARDS_PER_PACK;i++){
            rarities.push(dropGenerator.generateRandomRarity());   
        }
        return rarities;
    }

    open(dryStreak:number=0, luckModifier:number=0, cardWishId:number=0) : Array<Card>{
        let rarities:Array<number>=this.generatePackRarities(luckModifier);
        //HANDLE DRYSTREAK
        if(Pack.shouldEndDryStreak(dryStreak)){
            while(Rarity.averageRarity(rarities)<DropRate.DRY_STREAK_PACK_AVG){
                rarities=this.generatePackRarities(luckModifier);
            }
        }
        //GENERATE CARDS
        let cards:Array<Card>=rarities.map((rarity:number)=>{return this.randomItemByRarity(rarity);});
        //HANDLE WISH
        const wishedCard:Card=this.managerInstance.getItemById(cardWishId);
        if(!isNullOrUndefined(wishedCard)){
            const wishGranted:boolean=this.shouldGrantWish(wishedCard,rarities);
            if(wishGranted){
                const sameRarityIndex=cards.findIndex((card:Card)=>{return card.stars===wishedCard.stars});
                cards[sameRarityIndex]=wishedCard;
            }
        }
        return cards;
    }
}