"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mathf_1 = require("./utils/Mathf");
const PlayerHandler_1 = require("./player/PlayerHandler");
class LootingSystem {
    static splitLoot(packOwner, needers, card) {
        const lootResult = LootingSystem.getLootResult(packOwner, needers);
        if (lootResult.winner) {
            lootResult.winner.addCard(card); //give winner card
        }
        if (lootResult.losers.length > 0) {
            lootResult.losers.forEach((loser) => { loser.addClaim(); }); //give loser claim back
        }
        return lootResult;
    }
    static getLootResult(packOwner, needers) {
        let lootResult = { winner: undefined, losers: undefined };
        LootingSystem.isOwnerNeeder(packOwner, needers) ? lootResult.winner = packOwner : lootResult.winner = needers[Mathf_1.Mathf.randomInt(0, needers.length - 1)];
        lootResult.losers = LootingSystem.removeWinnerFromNeeders(lootResult.winner, needers);
        return lootResult;
    }
    static validNeeders(usersIds) {
        return usersIds.map((id) => { return PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(id); }).filter((player) => { return player.claims > 0; });
    }
    static isOwnerNeeder(packOwner, needers) {
        for (let i = 0; i < needers.length; i++) {
            if (packOwner.id === needers[i].id) {
                return true;
            }
        }
        return false;
    }
    static removeWinnerFromNeeders(winner, needers) {
        return needers.filter((needer) => { return needer.id !== winner.id; });
    }
}
exports.LootingSystem = LootingSystem;
