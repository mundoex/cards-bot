import { Shop } from "../shop/Shop";
import { Trader } from "../trader/Trader";
import { TimedEventsManager } from "../game-events/TimedEventsManager";
export declare class CardServer {
    shop: Shop;
    trader: Trader;
    timedEventsManager: TimedEventsManager;
    constructor();
    start(): void;
}
