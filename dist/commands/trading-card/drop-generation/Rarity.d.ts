export declare class Rarity {
    static readonly ULTRA = 5;
    static readonly LEGENDARY = 4;
    static readonly EPIC = 3;
    static readonly RARE = 2;
    static readonly COMMON = 1;
    static readonly ULTRA_RANGE: number[];
    static readonly LEGENDARY_RANGE: number[];
    static readonly EPIC_RANGE: number[];
    static readonly RARE_RANGE: number[];
    static readonly COMMON_RANGE: number[];
    stars: number;
    rarity: number;
    constructor(stars: number);
    get toString(): string;
    static starsToString(stars: number): string;
    get colorString(): string;
    static getRarityFromStars(stars: number): 1 | 5 | 4 | 3 | 2;
    static averageRarity(rarities: Array<number>): number;
    static isInUltraRange(stars: number): boolean;
    static isInLegendaryRange(stars: number): boolean;
    static isInEpicRange(stars: number): boolean;
    static isInRareRange(stars: number): boolean;
    static isInCommonRange(stars: number): boolean;
}
