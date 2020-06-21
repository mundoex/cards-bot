"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerHandler_1 = require("../player/PlayerHandler");
const Shop_1 = require("../shop/Shop");
const Trader_1 = require("../trader/Trader");
const TimedEventsManager_1 = require("../game-events/TimedEventsManager");
class CardServer {
    constructor() {
        this.shop = new Shop_1.Shop();
        this.trader = new Trader_1.Trader();
        this.timedEventsManager = new TimedEventsManager_1.TimedEventsManager(this.shop, this.trader, PlayerHandler_1.PlayerHandler.getInstance());
    }
    start() {
        this.shop.forceRestock();
        this.trader.forceRestock();
        this.timedEventsManager.start();
    }
}
exports.CardServer = CardServer;
