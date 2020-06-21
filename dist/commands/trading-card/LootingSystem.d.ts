import { Card } from "./cards/Card";
import { Player } from "./player/Player";
export declare class LootingSystem {
    static splitLoot(packOwner: Player, needers: Array<Player>, card: Card): Player;
    private static decideCardWinner;
    static validNeeders(usersIds: Array<string>): Player[];
}
