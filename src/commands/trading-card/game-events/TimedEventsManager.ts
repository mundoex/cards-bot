import { PlayerHandler } from "../player/PlayerHandler";
import { Shop } from "../shop/Shop";
import { Trader } from "../trader/Trader";
import { Player } from "../player/Player";

export class TimedEventsManager{
    private static readonly PLAYER_RATE=60*60*1000;
    private static readonly SHOP_RATE=2*60*60*1000;
    private static readonly TRADER_RATE=24*60*60*1000;
    
    shop:Shop;
    trader:Trader;
    playersHandler:PlayerHandler;

    constructor(shop:Shop,trader:Trader,playersHandler:PlayerHandler){
        this.shop=shop;
        this.trader=trader;
        this.playersHandler=playersHandler;
    }

    start(){
        this.startRewardPlayerJob();
        this.startShopUpdateJob();
        this.startTraderUpdateJob();
    }

    startRewardPlayerJob(){
        setInterval(this.rewardAllCachedPlayers,TimedEventsManager.PLAYER_RATE);
    }

    startShopUpdateJob(){
        setInterval(this.shop.forceRestock,TimedEventsManager.SHOP_RATE);
    }

    startTraderUpdateJob(){
        setInterval(this.trader.forceRestock,TimedEventsManager.TRADER_RATE);
    }

    private rewardAllCachedPlayers(){
        this.playersHandler.cachedPlayersMap.forEach((player:Player,playerId:string)=>player.addRewards());
    }
}