"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class Paths {
    static getPlayerFilePath(id) {
        return path_1.join(Paths.PLAYERS_FOLDER_PATH, id + ".json");
    }
}
exports.Paths = Paths;
Paths.CARDS_JSON_PATH = path_1.resolve("./src/commands/trading-card/database/cards.json");
Paths.PACKS_JSON_PATH = path_1.resolve("./src/commands/trading-card/database/packs.json");
Paths.PLAYERS_FOLDER_PATH = path_1.resolve("./src/commands/trading-card/database/players");
