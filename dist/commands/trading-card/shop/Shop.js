"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = require("../inventory/Inventory");
const ItemGenerator_1 = require("../structure/ItemGenerator");
const PackManager_1 = require("../packs/PackManager");
const Rarity_1 = require("../drop-generation/Rarity");
const Mathf_1 = require("../utils/Mathf");
const DropGenerator_1 = require("../drop-generation/DropGenerator");
class Shop extends ItemGenerator_1.ItemGenerator {
    constructor() {
        super(Shop.AVAILABLE_PACKS_IDS, PackManager_1.PackManager.getInstance());
        this.inventory = new Inventory_1.Inventory(Shop.SHOP_CAPACITY, Shop.SHOP_SLOTS);
    }
    get slotsSize() {
        return this.inventory.items.size;
    }
    fillRarityItemIds() {
        const possibleCards = this.managerInstance.getItemsByIds(this.possibleItemsIds);
        possibleCards.forEach((pack) => {
            switch (pack.rarity.rarity) {
                case (Rarity_1.Rarity.ULTRA):
                    this.ultraItemsIds.push(pack.id);
                    break;
                case (Rarity_1.Rarity.LEGENDARY):
                    this.legendaryItemsIds.push(pack.id);
                    break;
                case (Rarity_1.Rarity.EPIC):
                    this.epicItemsIds.push(pack.id);
                    break;
                case (Rarity_1.Rarity.RARE):
                    this.rareItemsIds.push(pack.id);
                    break;
                case (Rarity_1.Rarity.COMMON):
                    this.commonItemsIds.push(pack.id);
                    break;
                default:
                    this.commonItemsIds.push(pack.id);
                    break;
            }
        });
    }
    generateRandomPackRarities() {
        const dropGenerator = new DropGenerator_1.DropGenerator();
        const rarities = new Array();
        for (let i = 0; i < Shop.SHOP_CAPACITY; i++) {
            rarities.push(dropGenerator.generateRandomRarity());
        }
        return rarities;
    }
    generatePacksRandomAmmount() {
        return Mathf_1.Mathf.randomInt(Shop.PACK_AMMOUNT_RANGE[0], Shop.PACK_AMMOUNT_RANGE[1]);
    }
    fillShop() {
        const rarities = this.generateRandomPackRarities();
        rarities.forEach((rarity) => { this.inventory.add(this.randomItemByRarity(rarity).id, this.generatePacksRandomAmmount()); });
    }
    forceRestock() {
        this.inventory.clear();
        this.fillShop();
        console.log("Shop Restocked");
    }
    sellItem(itemId, ammount = 1) {
        this.inventory.remove(itemId, ammount);
        if (this.inventory.empty()) {
            this.fillShop();
        }
    }
    print() {
        for (const [key, value] of this.inventory.items.entries()) {
            console.log(key, value);
        }
    }
}
exports.Shop = Shop;
Shop.SHOP_CAPACITY = 7;
Shop.AVAILABLE_PACKS_IDS = [1, 2, 3, 4];
Shop.SHOP_SLOTS = new Array();
Shop.PACK_AMMOUNT_RANGE = [2, 5];
