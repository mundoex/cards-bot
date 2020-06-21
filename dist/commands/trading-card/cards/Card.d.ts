import { Rarity } from "../drop-generation/Rarity";
import { CardSaveData } from "./CardSaveData";
export declare class Card {
    id: number;
    name: string;
    show: string;
    imageURL: string;
    rarity: Rarity;
    constructor(id: number, name: string, show: string, imageUrl: string, rarity: Rarity);
    get stars(): number;
    toString(): string;
    static fromSaveData(cardSaveData: CardSaveData): Card;
}
