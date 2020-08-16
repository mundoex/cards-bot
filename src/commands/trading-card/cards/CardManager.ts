import { readFileSync } from "fs";
import { Card } from "./Card";
import { Paths } from "../utils/Paths";
import { isNullOrUndefined } from "util";
import { IManager } from "../structure/IManager";
import { CardSaveData } from "./CardSaveData";

export class CardManager implements IManager<Card>{
    private static instance:CardManager;
    private cards:Map<number,Card>;
    cardsNameIdMap:Map<string,number>;
    uniqueCards:Map<number,Card>;
    uniqueCardsNameIdMap:Map<string,number>;

    get size() : number { return this.cards.size; }
    get cardsList() : IterableIterator<Card> { return this.cards.values();}
    private constructor(){
        this.cards=new Map<number,Card>();
        this.cardsNameIdMap=new Map<string,number>();
        this.uniqueCards=new Map<number,Card>();
        this.uniqueCardsNameIdMap=new Map<string,number>();
        this.fillMaps();
    }

    static getInstance() : CardManager{
        if(isNullOrUndefined(CardManager.instance)){
            CardManager.instance=new CardManager();
        }
        return CardManager.instance;
    }

    private static getCardsFromJSON() : Array<Card>{
        return JSON.parse(readFileSync(Paths.CARDS_JSON_PATH).toString())
        .map((cardData:[number,string,string,string,number,boolean])=>{return new CardSaveData(cardData);})
        .map((cardSaveData:CardSaveData)=>{return Card.fromSaveData(cardSaveData);});
    }

    fillMaps() : void{
        CardManager.getCardsFromJSON().forEach((card:Card)=>{
            if(card.unique){
                this.uniqueCards.set(card.id, card);
                this.uniqueCardsNameIdMap.set(card.name, card.id);
            }else{
                this.cards.set(card.id, card);
                this.cardsNameIdMap.set(card.name, card.id);
            }
        });
    }

    getItemById(itemId: number): Card {
        return this.cards.get(itemId) || this.uniqueCards.get(itemId);
    }

    getItemsByIds(itemIds: number[]): Card[] {
        return itemIds.map(id=>{return this.getItemById(id);});
    }

    getItemByName(itemName: string): Card {
        const id=this.cardsNameIdMap.get(itemName) || this.uniqueCardsNameIdMap.get(itemName);
        return this.getItemById(id);
    }

    getCardSearch(cardName:string) : Array<Card>{
        let result=new Array<Card>();
        for(const key of this.cardsNameIdMap.keys()){
            if(key.includes(cardName)){
                result.push(this.getItemByName(key));
            }
        }
        for(const key of this.uniqueCardsNameIdMap.keys()){
            if(key.includes(cardName)){
                result.push(this.getItemByName(key));
            }
        }
        return result;
    }
}