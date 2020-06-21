import { Inventory } from "../inventory/Inventory";
import { ItemGenerator } from "../structure/ItemGenerator";
import { Pack } from "../packs/Pack";
export declare class Shop extends ItemGenerator<Pack> {
    private static readonly SHOP_CAPACITY;
    private static readonly AVAILABLE_PACKS_IDS;
    private static readonly SHOP_SLOTS;
    private static readonly PACK_AMMOUNT_RANGE;
    inventory: Inventory;
    constructor();
    get slotsSize(): number;
    fillRarityItemIds(): void;
    generateRandomPackRarities(): Array<number>;
    generatePacksRandomAmmount(): number;
    fillShop(): void;
    forceRestock(): void;
    sellItem(itemId: number, ammount?: number): void;
    print(): void;
}
