import { Pack } from "./Pack";
import { IManager } from "../structure/IManager";
export declare class PackManager implements IManager<Pack> {
    private static instance;
    packs: Map<number, Pack>;
    packsNameIdMap: Map<string, number>;
    constructor();
    static getInstance(): PackManager;
    static getPacksFromJSON(): Array<Pack>;
    fillMaps(): void;
    getItemById(itemId: number): Pack;
    getItemsByIds(itemIds: number[]): Pack[];
    getItemByName(itemName: string): Pack;
    getCardPack(cardId: number): Pack;
}
