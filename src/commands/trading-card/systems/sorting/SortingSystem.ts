import { Player } from "../../player/Player";
import { PlayerHandler } from "../../player/PlayerHandler";
import { CardManager } from "../../cards/CardManager";

export class SortingSystem{
    static sortById(player:Player){
        return Array.from(player.getCards).sort((a,b)=>{
            return a[0] > b[0] ? 1 : -1;
        });
    }

    static sortByAlphabetical(player:Player){
        return Array.from(player.getCards).sort((a,b)=>{
            const card1=CardManager.getInstance().getItemById(a[0]);
            const card2=CardManager.getInstance().getItemById(b[0]);
            return card1.name.localeCompare(card2.name);
        });
    }

    static sortByRarity(player:Player){
        return Array.from(player.getCards).sort((a,b)=>{
            const card1=CardManager.getInstance().getItemById(a[0]);
            const card2=CardManager.getInstance().getItemById(b[0]);
            return card1.rarity.stars < card2.rarity.stars ? 1 : -1;
        });
    }

    static sortByQuantity(player:Player){
        return Array.from(player.getCards).sort((a,b)=>{
            return a[1] < b[1] ? 1 : -1;
        });
    }
}