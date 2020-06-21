"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CardManager_1 = require("../cards/CardManager");
const Mathf_1 = require("../utils/Mathf");
const Rarity_1 = require("../drop-generation/Rarity");
const GoldSystem_1 = require("../GoldSystem");
class Trader {
    constructor() {
        this.needIds = new Array();
        this.fillNeedIds();
    }
    fillNeedIds() {
        const idsRange = [1, CardManager_1.CardManager.getInstance().cards.size];
        for (let i = 0; i < Trader.NEED_CAPACITY; i++) {
            const random = Mathf_1.Mathf.randomInt(idsRange[0], idsRange[1]);
            this.needIds.push(random);
        }
    }
    bountyPrice(stars) {
        return GoldSystem_1.GoldSystem.starsToGold(stars) * Trader.MULTIPLIER;
    }
    reRoll(cardId1, cardId2, cardId3) {
        const cards = CardManager_1.CardManager.getInstance().getItemsByIds([cardId1, cardId2, cardId3]);
        const avgRarity = Rarity_1.Rarity.averageRarity(cards.map(card => { return card.rarity.stars; }));
        return avgRarity;
    }
    guessStar() { }
    forceRestock() {
        this.needIds = new Array();
        this.fillNeedIds();
    }
    hasBounty(card) {
        for (let index = 0; index < this.needIds.length; index++) {
            if (this.needIds[index] === card.id) {
                return true;
            }
        }
        return false;
    }
}
exports.Trader = Trader;
Trader.NEED_CAPACITY = 5;
Trader.MULTIPLIER = 5;
