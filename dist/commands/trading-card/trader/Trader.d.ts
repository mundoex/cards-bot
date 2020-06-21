import { Card } from "../cards/Card";
export declare class Trader {
    private static readonly NEED_CAPACITY;
    private static readonly MULTIPLIER;
    needIds: Array<number>;
    constructor();
    fillNeedIds(): void;
    bountyPrice(stars: number): number;
    reRoll(cardId1: number, cardId2: number, cardId3: number): number;
    guessStar(): void;
    forceRestock(): void;
    hasBounty(card: Card): boolean;
}
