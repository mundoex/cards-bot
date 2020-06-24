import { Player } from "../../player/Player";

export interface LootResult{
    winner:Player;
    losers:Array<Player>;
}
