import { IManager } from "./IManager";
export declare abstract class ItemGenerator<T> {
    possibleItemsIds: Array<number>;
    ultraItemsIds: Array<number>;
    legendaryItemsIds: Array<number>;
    epicItemsIds: Array<number>;
    rareItemsIds: Array<number>;
    commonItemsIds: Array<number>;
    managerInstance: IManager<T>;
    constructor(possibleItemsIds: Array<number>, managerInstance: IManager<T>);
    abstract fillRarityItemIds(): void;
    randomItemByRarity(rarity: number): T;
    getIdsArrayByRarity(rarity: number): Array<number>;
    contains(itemId: number): boolean;
}
