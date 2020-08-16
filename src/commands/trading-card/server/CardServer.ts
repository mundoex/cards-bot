import { PlayerHandler } from "../player/PlayerHandler";
import { Shop } from "../shop/Shop";
import { Trader } from "../trader/Trader";
import { TimedEventsManager } from "../game-events/TimedEventsManager";
import { GameConstants } from "../global/GameConstants";
import { JSONPlayerAPI } from "../database/player-apis/json-api/JSONPlayerAPI";

export class CardServer{
    shop:Shop;
    trader:Trader;
    timedEventsManager:TimedEventsManager;
    superShop:Shop;
    superTrader:Trader;
    superTimedEventsManager:TimedEventsManager;

    constructor(){
        this.shop=new Shop("Shop restocked",GameConstants.SHOP_CAPACITY,GameConstants.SHOP_PACK_AMMOUNT_RANGE);
        this.trader=new Trader("Trader restocked",GameConstants.TRADER_NEED_CAPACITY);
        this.timedEventsManager=new TimedEventsManager(this.shop, this.trader, PlayerHandler.getInstance());

        this.superShop=new Shop("Super Shop restocked",GameConstants.SHOP_CAPACITY+3,GameConstants.SHOP_PACK_AMMOUNT_RANGE);
        this.superTrader=new Trader("Super Trader restocked",GameConstants.TRADER_NEED_CAPACITY+3);
        this.superTimedEventsManager=new TimedEventsManager(this.superShop, this.superTrader, undefined);
    }

    start(){
        this.shop.forceRestock();
        this.trader.forceRestock();
        this.timedEventsManager.start();

        this.superShop.forceRestock();
        this.superTrader.forceRestock();
        this.superTimedEventsManager.start();

        PlayerHandler.getInstance().init(new JSONPlayerAPI());
    }

}