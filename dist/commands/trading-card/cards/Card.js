"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rarity_1 = require("../drop-generation/Rarity");
class Card {
    constructor(id, name, show, imageUrl, rarity) {
        this.id = id;
        this.name = name;
        this.show = show;
        this.imageURL = imageUrl;
        this.rarity = rarity;
    }
    get stars() {
        return this.rarity.stars;
    }
    toString() {
        return this.name + "-" + this.rarity.stars;
    }
    static fromSaveData(cardSaveData) {
        return new Card(cardSaveData.id, cardSaveData.name, cardSaveData.show, cardSaveData.imageURL, new Rarity_1.Rarity(cardSaveData.stars));
    }
}
exports.Card = Card;
