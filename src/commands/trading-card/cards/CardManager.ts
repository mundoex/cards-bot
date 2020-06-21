import { readFileSync } from "fs";
import { Card } from "./Card";
import { Paths } from "../utils/Paths";
import { isNullOrUndefined } from "util";
import { IManager } from "../structure/IManager";
import { CardSaveData } from "./CardSaveData";

export class CardManager implements IManager<Card>{
    private static instance:CardManager;
    cards:Map<number,Card>;
    cardsNameIdMap:Map<string,number>;

    constructor(){
        this.cards=new Map<number,Card>();
        this.cardsNameIdMap=new Map<string,number>();
        this.fillMaps();
    }

    static getInstance() : CardManager{
        if(isNullOrUndefined(CardManager.instance)){
            CardManager.instance=new CardManager();
        }
        return CardManager.instance;
    }

    private static getCardsFromJSON() : Array<Card>{
        return JSON.parse(readFileSync(Paths.CARDS_JSON_PATH).toString()).map((cardSaveData:CardSaveData)=>{return Card.fromSaveData(cardSaveData);});
    }

    fillMaps() : void{
        CardManager.getCardsFromJSON().forEach((card:Card)=>{
            this.cards.set(card.id, card);
            this.cardsNameIdMap.set(card.name, card.id);
        });
    }

    getItemById(itemId: number): Card {
        return this.cards.get(itemId);
    }

    getItemsByIds(itemIds: number[]): Card[] {
        return itemIds.map(id=>{return this.getItemById(id);});
    }

    getItemByName(itemName: string): Card {
        return this.getItemById(this.cardsNameIdMap.get(itemName));
    }

    getCardSearch(cardName:string) : Array<Card>{
        let result=new Array<Card>();
        for(const key of this.cardsNameIdMap.keys()){
            if(key.includes(cardName)){
                result.push(this.getItemByName(key));
            }
        }
        return result;
    }
}