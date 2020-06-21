export declare class DropGenerator {
    luckModifier: number;
    rare: number;
    epic: number;
    legendary: number;
    ultra: number;
    constructor(luckModifier?: number);
    get ultraRange(): Array<number>;
    get legendaryRange(): Array<number>;
    get epicRange(): Array<number>;
    get rareRange(): Array<number>;
    generateRandomRarity(): number;
    private isUltraDrop;
    private isLegendaryDrop;
    private isEpicDrop;
    private isRareDrop;
}
