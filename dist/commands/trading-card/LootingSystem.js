"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mathf_1 = require("./utils/Mathf");
const PlayerHandler_1 = require("./player/PlayerHandler");
class LootingSystem {
    static splitLoot(packOwner, needers, card) {
        const winner = LootingSystem.decideCardWinner(packOwner, needers);
        winner.addCard(card);
        return winner;
    }
    static decideCardWinner(packOwner, needers) {
        let winner = needers[Mathf_1.Mathf.randomInt(0, needers.length - 1)];
        for (let i = 0; i < needers.length; i++) {
            if (needers[i].id === packOwner.id) {
                return needers[i];
            }
        }
        return winner;
    }
    static validNeeders(usersIds) {
        return usersIds.map((id) => { return PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(id); }).filter((player) => { return player.claims > 0; });
    }
}
exports.LootingSystem = LootingSystem;
