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
        setInterval(this.rewardAllCachedPlayers, TimedEventsManager.PLAYER_RATE);
    }
    startShopUpdateJob() {
        setInterval(this.shop.forceRestock, TimedEventsManager.SHOP_RATE);
    }
    startTraderUpdateJob() {
        setInterval(this.trader.forceRestock, TimedEventsManager.TRADER_RATE);
    }
    rewardAllCachedPlayers() {
        console.log(this.shop);
        this.playersHandler.cachedPlayersMap.forEach((player, playerId) => {
            player.addRewards();
            console.log("Rewards Added");
        });
    }
}
exports.TimedEventsManager = TimedEventsManager;
TimedEventsManager.PLAYER_RATE = 10000; //60*60*1000;
TimedEventsManager.SHOP_RATE = 2 * 60 * 60 * 1000;
TimedEventsManager.TRADER_RATE = 24 * 60 * 60 * 1000;
