import { InventorySaveData } from "../inventory/InventorySaveData";
export declare class PlayerSaveData {
    id: string;
    gold: number;
    claims: number;
    trades: number;
    cards: InventorySaveData;
    packs: InventorySaveData;
    top10CardsIds: Array<number>;
    packsOpened: number;
    dryStreak: number;
    cardWishId: number;
    luckModifier: number;
    constructor(id: string, gold: number, claims: number, trades: number, cards: InventorySaveData, packs: InventorySaveData, top10CardsIds: Array<number>, packsOpened: number, dryStreak: number, cardWishId: number, luckModifier: number);
}
