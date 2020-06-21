"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mathf_1 = require("../utils/Mathf");
const util_1 = require("util");
const Rarity_1 = require("../drop-generation/Rarity");
class ItemGenerator {
    constructor(possibleItemsIds, managerInstance) {
        this.possibleItemsIds = possibleItemsIds;
        this.ultraItemsIds = new Array();
        this.legendaryItemsIds = new Array();
        this.epicItemsIds = new Array();
        this.rareItemsIds = new Array();
        this.commonItemsIds = new Array();
        this.managerInstance = managerInstance;
        this.fillRarityItemIds();
    }
    randomItemByRarity(rarity) {
        const idsArray = this.getIdsArrayByRarity(rarity);
        const random = Mathf_1.Mathf.randomInt(0, idsArray.length - 1);
        const item = this.managerInstance.getItemById(idsArray[random]);
        return !util_1.isNullOrUndefined(item) ? item : this.randomItemByRarity(rarity - 1);
    }
    getIdsArrayByRarity(rarity) {
        switch (rarity) {
            case (Rarity_1.Rarity.ULTRA): return this.ultraItemsIds;
            case (Rarity_1.Rarity.LEGENDARY): return this.legendaryItemsIds;
            case (Rarity_1.Rarity.EPIC): return this.epicItemsIds;
            case (Rarity_1.Rarity.RARE): return this.rareItemsIds;
            case (Rarity_1.Rarity.COMMON): return this.commonItemsIds;
            default: return this.commonItemsIds;
        }
    }
    contains(itemId) {
        return this.possibleItemsIds.find((id) => { return itemId === id; }) !== undefined;
    }
}
exports.ItemGenerator = ItemGenerator;
