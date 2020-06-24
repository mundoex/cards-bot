import { PlayerHandler } from "../player/PlayerHandler";
import { Shop } from "../shop/Shop";
import { Trader } from "../trader/Trader";
import { TimedEventsManager } from "../game-events/TimedEventsManager";

export class CardServer{
    shop:Shop;
    trader:Trader;
    timedEventsManager:TimedEventsManager;

    constructor(){
        this.shop=new Shop();
        this.trader=new Trader();
        this.timedEventsManager=new TimedEventsManager(this.shop, this.trader, PlayerHandler.getInstance());
    }

    start(){
        this.shop.forceRestock();
        this.trader.forceRestock();
        this.timedEventsManager.start();
    }

}