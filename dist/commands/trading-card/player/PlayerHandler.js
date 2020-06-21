"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const fs_1 = require("fs");
const PlayerFactory_1 = require("./PlayerFactory");
const Paths_1 = require("../utils/Paths");
const util_1 = require("util");
class PlayerHandler {
    constructor() {
        this.cachedPlayersMap = new Map();
        this.addRegularsToCache();
    }
    static getInstance() {
        if (util_1.isNullOrUndefined(PlayerHandler.instance)) {
            PlayerHandler.instance = new PlayerHandler();
        }
        return PlayerHandler.instance;
    }
    load(id) {
        const playerFilePath = Paths_1.Paths.getPlayerFilePath(id);
        let player;
        if (fs_1.existsSync(playerFilePath)) {
            const playerSaveData = JSON.parse(fs_1.readFileSync(playerFilePath).toString());
            player = Player_1.Player.fromSaveData(playerSaveData);
        }
        else {
            player = PlayerFactory_1.PlayerFactory.createStarterPlayer(id);
        }
        this.addToPlayersCache(player);
        player.save();
        return player;
    }
    addToPlayersCache(player) {
        this.cachedPlayersMap.set(player.id, player);
    }
    addRegularsToCache() {
        const playerFolder = fs_1.readdirSync(Paths_1.Paths.PLAYERS_FOLDER_PATH);
        playerFolder.forEach((playerFile) => {
            const playerFilePath = Paths_1.Paths.getPlayerFilePath(playerFile.split(".")[0]);
            const playerSaveData = JSON.parse(fs_1.readFileSync(playerFilePath).toString());
            this.addToPlayersCache(Player_1.Player.fromSaveData(playerSaveData));
        });
    }
    getPlayerById(id) {
        let player = this.cachedPlayersMap.get(id);
        if (player) {
            return player;
        }
        else {
            return this.load(id);
        }
    }
}
exports.PlayerHandler = PlayerHandler;
