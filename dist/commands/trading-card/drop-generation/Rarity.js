"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mathf_1 = require("../utils/Mathf");
class Rarity {
    constructor(stars) {
        this.stars = stars;
        this.rarity = Rarity.getRarityFromStars(stars);
    }
    get toString() {
        switch (this.rarity) {
            case (Rarity.ULTRA): return "Ultra";
            case (Rarity.LEGENDARY): return "Legendary";
            case (Rarity.EPIC): return "Epic";
            case (Rarity.RARE): return "Rare";
            case (Rarity.COMMON):
            default: return "Common";
        }
    }
    static starsToString(stars) {
        return ":star:".repeat(stars);
    }
    get colorString() {
        switch (this.rarity) {
            case (Rarity.ULTRA): return ":red_circle:";
            case (Rarity.LEGENDARY): return ":orange_circle:";
            case (Rarity.EPIC): return ":purple_circle:";
            case (Rarity.RARE): return ":blue_circle:";
            case (Rarity.COMMON):
            default: return ":white_circle:";
        }
    }
    static getRarityFromStars(stars) {
        if (Rarity.isInUltraRange(stars)) {
            return Rarity.ULTRA;
        }
        else if (Rarity.isInLegendaryRange(stars)) {
            return Rarity.LEGENDARY;
        }
        else if (Rarity.isInEpicRange(stars)) {
            return Rarity.EPIC;
        }
        else if (Rarity.isInRareRange(stars)) {
            return Rarity.RARE;
        }
        else {
            return Rarity.COMMON;
        }
    }
    static averageRarity(rarities) {
        return Mathf_1.Mathf.average(rarities);
    }
    static isInUltraRange(stars) {
        return Mathf_1.Mathf.inRange(Rarity.ULTRA_RANGE, stars);
    }
    static isInLegendaryRange(stars) {
        return Mathf_1.Mathf.inRange(Rarity.LEGENDARY_RANGE, stars);
    }
    static isInEpicRange(stars) {
        return Mathf_1.Mathf.inRange(Rarity.EPIC_RANGE, stars);
    }
    static isInRareRange(stars) {
        return Mathf_1.Mathf.inRange(Rarity.RARE_RANGE, stars);
    }
    static isInCommonRange(stars) {
        return Mathf_1.Mathf.inRange(Rarity.COMMON_RANGE, stars);
    }
}
exports.Rarity = Rarity;
//FAKE ENUM
Rarity.ULTRA = 5;
Rarity.LEGENDARY = 4;
Rarity.EPIC = 3;
Rarity.RARE = 2;
Rarity.COMMON = 1;
//STAR RANGE
Rarity.ULTRA_RANGE = [10, 10];
Rarity.LEGENDARY_RANGE = [8, 9];
Rarity.EPIC_RANGE = [6, 7];
Rarity.RARE_RANGE = [4, 5];
Rarity.COMMON_RANGE = [1, 3];
