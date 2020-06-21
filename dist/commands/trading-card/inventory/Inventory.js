"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemContainer_1 = require("./ItemContainer");
const InventorySaveData_1 = require("./InventorySaveData");
const Slot_1 = require("./Slot");
class Inventory extends ItemContainer_1.ItemContainer {
    constructor(capacity, slots) {
        super(capacity);
        slots.forEach((slot) => this.items.set(slot.itemId, slot.ammount));
    }
    static fromSaveData(inventorySaveData) {
        return new Inventory(inventorySaveData.capacity, inventorySaveData.slots);
    }
    toSaveData() {
        let slotsArray = new Array();
        for (let [key, value] of this.items) {
            slotsArray.push(new Slot_1.Slot(key, value));
        }
        return new InventorySaveData_1.InventorySaveData(this.capacity, slotsArray);
    }
}
exports.Inventory = Inventory;
