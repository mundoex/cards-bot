import { ItemContainer } from "./ItemContainer";
import { InventorySaveData } from "./InventorySaveData";
import { ISaveable } from "../structure/ISaveable";
import { Slot } from "./Slot";
export declare class Inventory extends ItemContainer<number> implements ISaveable<InventorySaveData> {
    constructor(capacity: number, slots: Array<Slot>);
    static fromSaveData(inventorySaveData: InventorySaveData): Inventory;
    toSaveData(): InventorySaveData;
}
