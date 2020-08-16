import { Player } from "../../../player/Player";
import { Card } from "../../../cards/Card";

export interface PlayerDAO{
    cachedPlayersMap:Map<string,Player>;
    load() : Promise<boolean>;
    save(player:Player) : Promise<boolean>;
    createNewPlayer(id:string) : void;
    getPlayerById(id:string) : Player;
    findUsersWithCard(card:Card) : Array<Player>;
}