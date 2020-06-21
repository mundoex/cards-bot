"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const Inventory_1 = require("../inventory/Inventory");
const InventorySaveData_1 = require("../inventory/InventorySaveData");
class PlayerFactory {
    static createStarterPlayer(id) {
        return new Player_1.Player(id, PlayerFactory.STARTER_GOLD, PlayerFactory.STARTER_CLAIMS, PlayerFactory.STARTER_TRADES, PlayerFactory.STARTER_CARDS, PlayerFactory.STARTER_PACKS, PlayerFactory.STARTER_TOP10_CARDS_IDS, PlayerFactory.STARTER_PACKS_OPENED, PlayerFactory.STARTER_DRY_STREAK, PlayerFactory.STARTER_CARD_WISH_ID, PlayerFactory.STARTER_LUCK_MODIFIER);
    }
}
exports.PlayerFactory = PlayerFactory;
PlayerFactory.STARTER_GOLD = 300;
PlayerFactory.STARTER_CLAIMS = 3;
PlayerFactory.STARTER_TRADES = 1;
PlayerFactory.STARTER_CARDS = Inventory_1.Inventory.fromSaveData(new InventorySaveData_1.InventorySaveData(Number.MAX_SAFE_INTEGER, new Array()));
PlayerFactory.STARTER_PACKS = Inventory_1.Inventory.fromSaveData(new InventorySaveData_1.InventorySaveData(Number.MAX_SAFE_INTEGER, new Array()));
PlayerFactory.STARTER_TOP10_CARDS_IDS = [];
PlayerFactory.STARTER_PACKS_OPENED = 0;
PlayerFactory.STARTER_DRY_STREAK = 0;
PlayerFactory.STARTER_CARD_WISH_ID = 0;
PlayerFactory.STARTER_LUCK_MODIFIER = 0;
