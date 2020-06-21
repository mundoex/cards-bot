"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mathf_1 = require("../utils/Mathf");
const DropRate_1 = require("./DropRate");
const Rarity_1 = require("./Rarity");
class DropGenerator {
    constructor(luckModifier = 0) {
        this.luckModifier = luckModifier;
        this.rare = DropRate_1.DropRate.RARE + Mathf_1.Mathf.percentageOf(DropRate_1.DropRate.RARE, luckModifier);
        this.epic = DropRate_1.DropRate.EPIC + Mathf_1.Mathf.percentageOf(DropRate_1.DropRate.EPIC, luckModifier);
        this.legendary = DropRate_1.DropRate.LEGENDARY + Mathf_1.Mathf.percentageOf(DropRate_1.DropRate.LEGENDARY, luckModifier);
        this.ultra = DropRate_1.DropRate.ULTRA + Mathf_1.Mathf.percentageOf(DropRate_1.DropRate.ULTRA, luckModifier);
    }
    get ultraRange() {
        return [0, this.ultra];
    }
    get legendaryRange() {
        return [DropRate_1.DropRate.ULTRA, DropRate_1.DropRate.ULTRA + this.legendary];
    }
    get epicRange() {
        return [DropRate_1.DropRate.LEGENDARY, DropRate_1.DropRate.LEGENDARY + this.epic];
    }
    get rareRange() {
        return [DropRate_1.DropRate.EPIC, DropRate_1.DropRate.EPIC + this.rare];
    }
    generateRandomRarity() {
        const random = Mathf_1.Mathf.randomDecimal(0, 100, 3) / 100;
        if (this.isUltraDrop(random)) {
            return Rarity_1.Rarity.ULTRA;
        }
        else if (this.isLegendaryDrop(random)) {
            return Rarity_1.Rarity.LEGENDARY;
        }
        else if (this.isEpicDrop(random)) {
            return Rarity_1.Rarity.EPIC;
        }
        else if (this.isRareDrop(random)) {
            return Rarity_1.Rarity.RARE;
        }
        else {
            return Rarity_1.Rarity.COMMON;
        }
    }
    isUltraDrop(random) {
        return Mathf_1.Mathf.inRange(this.ultraRange, random);
    }
    isLegendaryDrop(random) {
        return Mathf_1.Mathf.inRange(this.legendaryRange, random);
    }
    isEpicDrop(random) {
        return Mathf_1.Mathf.inRange(this.epicRange, random);
    }
    isRareDrop(random) {
        return Mathf_1.Mathf.inRange(this.rareRange, random);
    }
}
exports.DropGenerator = DropGenerator;
