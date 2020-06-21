import { Card } from "./Card";
import { IManager } from "../structure/IManager";
export declare class CardManager implements IManager<Card> {
    private static instance;
    cards: Map<number, Card>;
    cardsNameIdMap: Map<string, number>;
    constructor();
    static getInstance(): CardManager;
    private static getCardsFromJSON;
    fillMaps(): void;
    getItemById(itemId: number): Card;
    getItemsByIds(itemIds: number[]): Card[];
    getItemByName(itemName: string): Card;
    getCardSearch(cardName: string): Array<Card>;
}
