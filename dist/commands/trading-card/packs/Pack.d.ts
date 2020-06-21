import { Card } from "../cards/Card";
import { Rarity } from "../drop-generation/Rarity";
import { ItemGenerator } from "../structure/ItemGenerator";
import { PackSaveData } from "./PackSaveData";
export declare class Pack extends ItemGenerator<Card> {
    static readonly CARDS_PER_PACK = 5;
    id: number;
    name: string;
    rarity: Rarity;
    constructor(id: number, name: string, rarity: Rarity, possibleCardsIds: Array<number>);
    static fromSaveData(packSaveData: PackSaveData): Pack;
    toSaveData(): PackSaveData;
    fillRarityItemIds(): void;
    get goldValue(): number;
    private static shouldEndDryStreak;
    shouldGrantWish(wishedCard: Card, rarities: Array<number>): boolean;
    generatePackRarities(luckModifier: number): Array<number>;
    open(dryStreak?: number, luckModifier?: number, cardWishId?: number): Array<Card>;
}
