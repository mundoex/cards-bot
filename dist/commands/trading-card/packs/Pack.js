"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CardManager_1 = require("../cards/CardManager");
const Mathf_1 = require("../utils/Mathf");
const DropGenerator_1 = require("../drop-generation/DropGenerator");
const Rarity_1 = require("../drop-generation/Rarity");
const util_1 = require("util");
const DropRate_1 = require("../drop-generation/DropRate");
const ItemGenerator_1 = require("../structure/ItemGenerator");
const PackSaveData_1 = require("./PackSaveData");
const GoldSystem_1 = require("../GoldSystem");
class Pack extends ItemGenerator_1.ItemGenerator {
    constructor(id, name, rarity, possibleCardsIds) {
        super(possibleCardsIds, CardManager_1.CardManager.getInstance());
        this.id = id;
        this.name = name;
        this.rarity = rarity;
    }
    static fromSaveData(packSaveData) {
        return new Pack(packSaveData.id, packSaveData.name, new Rarity_1.Rarity(packSaveData.stars), packSaveData.possibleItemsIds);
    }
    toSaveData() {
        return new PackSaveData_1.PackSaveData(this.id, this.name, this.rarity.stars, this.possibleItemsIds);
    }
    fillRarityItemIds() {
        const possibleCards = this.managerInstance.getItemsByIds(this.possibleItemsIds);
        possibleCards.forEach((card) => {
            switch (card.rarity.rarity) {
                case (Rarity_1.Rarity.ULTRA):
                    this.ultraItemsIds.push(card.id);
                    break;
                case (Rarity_1.Rarity.LEGENDARY):
                    this.legendaryItemsIds.push(card.id);
                    break;
                case (Rarity_1.Rarity.EPIC):
                    this.epicItemsIds.push(card.id);
                    break;
                case (Rarity_1.Rarity.RARE):
                    this.rareItemsIds.push(card.id);
                    break;
                case (Rarity_1.Rarity.COMMON):
                    this.commonItemsIds.push(card.id);
                    break;
                default:
                    this.commonItemsIds.push(card.id);
                    break;
            }
        });
    }
    get goldValue() {
        return GoldSystem_1.GoldSystem.starsToGold(this.rarity.stars);
    }
    static shouldEndDryStreak(dryStreak) {
        return dryStreak >= DropRate_1.DropRate.DRY_STREAK_THRESHOLD;
    }
    shouldGrantWish(wishedCard, rarities) {
        if (this.contains(wishedCard.id)) {
            const shouldGrantWish = Mathf_1.Mathf.randomInt(0, 100) / 100 <= DropRate_1.DropRate.WISH;
            const isRarityPossible = rarities.find((rarity) => { return rarity === Rarity_1.Rarity.getRarityFromStars(wishedCard.stars); }) !== undefined;
            return shouldGrantWish && isRarityPossible;
        }
        else {
            return false;
        }
    }
    generatePackRarities(luckModifier) {
        const dropGenerator = new DropGenerator_1.DropGenerator(luckModifier);
        const rarities = new Array();
        for (let i = 0; i < Pack.CARDS_PER_PACK; i++) {
            rarities.push(dropGenerator.generateRandomRarity());
        }
        return rarities;
    }
    open(dryStreak = 0, luckModifier = 0, cardWishId = 0) {
        let rarities = this.generatePackRarities(luckModifier);
        //HANDLE DRYSTREAK
        if (Pack.shouldEndDryStreak(dryStreak)) {
            while (Rarity_1.Rarity.averageRarity(rarities) < DropRate_1.DropRate.DRY_STREAK_PACK_AVG) {
                rarities = this.generatePackRarities(luckModifier);
            }
        }
        //GENERATE CARDS
        let cards = rarities.map((rarity) => { return this.randomItemByRarity(rarity); });
        //HANDLE WISH
        const wishedCard = this.managerInstance.getItemById(cardWishId);
        if (!util_1.isNullOrUndefined(wishedCard)) {
            const wishGranted = this.shouldGrantWish(wishedCard, rarities);
            if (wishGranted) {
                const sameRarityIndex = cards.findIndex((card) => { return card.stars === wishedCard.stars; });
                cards[sameRarityIndex] = wishedCard;
            }
        }
        return cards;
    }
}
exports.Pack = Pack;
Pack.CARDS_PER_PACK = 5;
