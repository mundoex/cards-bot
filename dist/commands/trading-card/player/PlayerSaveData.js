"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerSaveData {
    constructor(id, gold, claims, trades, cards, packs, top10CardsIds, packsOpened, dryStreak, cardWishId, luckModifier) {
        this.id = id;
        this.gold = gold;
        this.claims = claims;
        this.trades = trades;
        this.cards = cards;
        this.packs = packs;
        this.top10CardsIds = top10CardsIds;
        this.packsOpened = packsOpened;
        this.dryStreak = dryStreak;
        this.cardWishId = cardWishId;
        this.luckModifier = luckModifier;
    }
}
exports.PlayerSaveData = PlayerSaveData;
