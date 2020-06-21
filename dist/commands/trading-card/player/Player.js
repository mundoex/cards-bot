"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = require("../inventory/Inventory");
const PlayerSaveData_1 = require("./PlayerSaveData");
const Paths_1 = require("../utils/Paths");
const fs_1 = require("fs");
const CardManager_1 = require("../cards/CardManager");
class Player {
    constructor(id, gold, claims, trades, cards, packs, top10CardIds, packsOpened, dryStreak, cardWishId, luckModifier) {
        this.id = id;
        this.gold = gold;
        this.claims = claims;
        this.trades = trades;
        this.cards = cards;
        this.packs = packs;
        this.top10CardIds = top10CardIds;
        this.packsOpened = packsOpened;
        this.dryStreak = dryStreak;
        this.cardWishId = cardWishId;
        this.luckModifier = luckModifier;
    }
    static fromSaveData(playerSaveData) {
        return new Player(playerSaveData.id, playerSaveData.gold, playerSaveData.claims, playerSaveData.trades, Inventory_1.Inventory.fromSaveData(playerSaveData.cards), Inventory_1.Inventory.fromSaveData(playerSaveData.packs), playerSaveData.top10CardsIds, playerSaveData.packsOpened, playerSaveData.dryStreak, playerSaveData.cardWishId, playerSaveData.luckModifier);
    }
    toSaveData() {
        return new PlayerSaveData_1.PlayerSaveData(this.id, this.gold, this.claims, this.trades, this.cards.toSaveData(), this.packs.toSaveData(), this.top10CardIds, this.packsOpened, this.dryStreak, this.cardWishId, this.luckModifier);
    }
    trade() {
    }
    wish(cardName) {
        const card = CardManager_1.CardManager.getInstance().getItemByName(cardName);
        if (card) {
            this.cardWishId = card.id;
            this.save();
            return true;
        }
        else {
            return false;
        }
    }
    buyPack(pack) {
        if (this.gold >= pack.goldValue) {
            this.addPack(pack);
            this.gold -= pack.goldValue;
            return true;
        }
        else {
            return false;
        }
    }
    buyXPack(pack, ammount) {
        const totalGoldAmmount = pack.goldValue * ammount;
        if (this.gold >= totalGoldAmmount) {
            for (let index = 0; index < ammount; index++) {
                this.addPack(pack);
            }
            this.gold -= totalGoldAmmount;
            return true;
        }
        else {
            return false;
        }
    }
    openPack(pack) {
        if (this.packs.contains(pack.id)) {
            this.removePack(pack);
            return pack.open(this.dryStreak, this.luckModifier, this.cardWishId);
        }
        else {
            return undefined;
        }
    }
    addCard(card) {
        this.cards.add(card.id, 1);
        this.save();
    }
    removeCard(card) {
        this.cards.remove(card.id, 1);
        this.save();
    }
    addPack(pack) {
        this.packs.add(pack.id, 1);
        this.save();
    }
    addGold(ammount) {
        this.gold += ammount;
        this.save();
    }
    removeGold(ammount) {
        this.gold -= ammount;
        this.save();
    }
    removePack(pack) {
        this.packs.remove(pack.id, 1);
        this.save();
    }
    addRewards() {
        this.gold += Player.GOLD_RATE;
        this.trades += Player.TRADE_RATE;
        this.claims += Player.CLAIM_RATE;
        this.save();
    }
    hasCard(card) {
        return this.cards.contains(card.id);
    }
    hasPack(pack) {
        return this.cards.contains(pack.id);
    }
    hasClaims() {
        return this.claims > 0;
    }
    addClaim(ammount = 1) {
        this.claims += ammount;
        this.save();
    }
    removeClaim(ammount = 1) {
        this.claims -= ammount;
        this.save();
    }
    addTrade(ammount = 1) {
        this.trades += ammount;
        this.save();
    }
    removeTrade(ammount = 1) {
        this.trades -= ammount;
        this.save();
    }
    addLuck(ammount = 1) {
        this.luckModifier += ammount;
        this.save();
    }
    removeLuck(ammount = 1) {
        this.luckModifier -= ammount;
        this.save();
    }
    save() {
        const playerPath = Paths_1.Paths.getPlayerFilePath(this.id);
        fs_1.writeFileSync(playerPath, JSON.stringify(this.toSaveData()));
    }
}
exports.Player = Player;
Player.GOLD_RATE = 125;
Player.CLAIM_RATE = 3;
Player.TRADE_RATE = 1;
