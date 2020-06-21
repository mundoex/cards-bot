"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CardServer_1 = require("./server/CardServer");
exports.server = new CardServer_1.CardServer();
function startCardGame() {
    exports.server.start();
}
exports.startCardGame = startCardGame;
