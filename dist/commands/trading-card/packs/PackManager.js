"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pack_1 = require("./Pack");
const util_1 = require("util");
const fs_1 = require("fs");
const Paths_1 = require("../utils/Paths");
class PackManager {
    constructor() {
        this.packs = new Map();
        this.packsNameIdMap = new Map();
        this.fillMaps();
    }
    static getInstance() {
        if (util_1.isNullOrUndefined(PackManager.instance)) {
            PackManager.instance = new PackManager();
        }
        return PackManager.instance;
    }
    static getPacksFromJSON() {
        return JSON.parse(fs_1.readFileSync(Paths_1.Paths.PACKS_JSON_PATH).toString()).map((packSaveData) => { return Pack_1.Pack.fromSaveData(packSaveData); });
    }
    fillMaps() {
        PackManager.getPacksFromJSON().forEach((pack) => {
            this.packs.set(pack.id, pack);
            this.packsNameIdMap.set(pack.name, pack.id);
        });
    }
    getItemById(itemId) {
        return this.packs.get(itemId);
    }
    getItemsByIds(itemIds) {
        return itemIds.map(id => { return this.getItemById(id); });
    }
    getItemByName(itemName) {
        return this.getItemById(this.packsNameIdMap.get(itemName));
    }
    getCardPack(cardId) {
        for (const pack of this.packs.values()) {
            if (pack.contains(cardId)) {
                return pack;
            }
        }
        return undefined;
    }
}
exports.PackManager = PackManager;
