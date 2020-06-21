import { PlayerHandler } from "../player/PlayerHandler";
import { Shop } from "../shop/Shop";
import { Trader } from "../trader/Trader";
export declare class TimedEventsManager {
    private static readonly PLAYER_RATE;
    private static readonly SHOP_RATE;
    private static readonly TRADER_RATE;
    shop: Shop;
    trader: Trader;
    playersHandler: PlayerHandler;
    constructor(shop: Shop, trader: Trader, playersHandler: PlayerHandler);
    start(): void;
    startRewardPlayerJob(): void;
    startShopUpdateJob(): void;
    startTraderUpdateJob(): void;
    private static rewardAllCachedPlayers;
}
