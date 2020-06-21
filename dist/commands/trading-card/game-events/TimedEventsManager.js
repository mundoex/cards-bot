"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimedEventsManager {
    constructor(shop, trader, playersHandler) {
        this.shop = shop;
        this.trader = trader;
        this.playersHandler = playersHandler;
    }
    start() {
        this.startRewardPlayerJob();
        this.startShopUpdateJob();
        this.startTraderUpdateJob();
    }
    startRewardPlayerJob() {
        setInterval(TimedEventsManager.rewardAllCachedPlayers, TimedEventsManager.PLAYER_RATE, this.playersHandler);
    }
    startShopUpdateJob() {
        setInterval((shop) => { shop.forceRestock(); }, TimedEventsManager.SHOP_RATE, this.shop);
    }
    startTraderUpdateJob() {
        setInterval((trader) => { trader.forceRestock(); }, TimedEventsManager.TRADER_RATE, this.trader);
    }
    static rewardAllCachedPlayers(playersHandler) {
        playersHandler.cachedPlayersMap.forEach((player, playerId) => {
            player.addRewards();
        });
        console.log("Rewards Added");
    }
}
exports.TimedEventsManager = TimedEventsManager;
TimedEventsManager.PLAYER_RATE = 60 * 60 * 1000;
TimedEventsManager.SHOP_RATE = 2 * 60 * 60 * 1000;
TimedEventsManager.TRADER_RATE = 24 * 60 * 60 * 1000;
