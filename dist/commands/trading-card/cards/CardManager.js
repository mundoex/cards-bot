"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const Card_1 = require("./Card");
const Paths_1 = require("../utils/Paths");
const util_1 = require("util");
class CardManager {
    constructor() {
        this.cards = new Map();
        this.cardsNameIdMap = new Map();
        this.fillMaps();
    }
    static getInstance() {
        if (util_1.isNullOrUndefined(CardManager.instance)) {
            CardManager.instance = new CardManager();
        }
        return CardManager.instance;
    }
    static getCardsFromJSON() {
        return JSON.parse(fs_1.readFileSync(Paths_1.Paths.CARDS_JSON_PATH).toString()).map((cardSaveData) => { return Card_1.Card.fromSaveData(cardSaveData); });
    }
    fillMaps() {
        CardManager.getCardsFromJSON().forEach((card) => {
            this.cards.set(card.id, card);
            this.cardsNameIdMap.set(card.name, card.id);
        });
    }
    getItemById(itemId) {
        return this.cards.get(itemId);
    }
    getItemsByIds(itemIds) {
        return itemIds.map(id => { return this.getItemById(id); });
    }
    getItemByName(itemName) {
        return this.getItemById(this.cardsNameIdMap.get(itemName));
    }
    getCardSearch(cardName) {
        let result = new Array();
        for (const key of this.cardsNameIdMap.keys()) {
            if (key.includes(cardName)) {
                result.push(this.getItemByName(key));
            }
        }
        return result;
    }
}
exports.CardManager = CardManager;
