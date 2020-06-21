import { Card } from "./cards/Card";
import { Player } from "./player/Player";
interface LootResult {
    winner: Player;
    losers: Array<Player>;
}
export declare class LootingSystem {
    static splitLoot(packOwner: Player, needers: Array<Player>, card: Card): LootResult;
    private static getLootResult;
    static validNeeders(usersIds: Array<string>): Player[];
    static isOwnerNeeder(packOwner: Player, needers: Array<Player>): boolean;
    static removeWinnerFromNeeders(winner: Player, needers: Array<Player>): Array<Player>;
}
export {};
