import { PlayerHandler } from "../player/PlayerHandler";
import { Shop } from "../shop/Shop";
import { Trader } from "../trader/Trader";
import { Player } from "../player/Player";

export class TimedEventsManager{
    private static readonly PLAYER_RATE=60*60*1000;
    private static readonly SHOP_RATE=2*60*60*1000;
    private static readonly TRADER_RATE=2*60*60*1000;
    
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
        setInterval(TimedEventsManager.rewardAllCachedPlayers,TimedEventsManager.PLAYER_RATE,this.playersHandler);
    }

    startShopUpdateJob(){
        setInterval((shop:Shop)=>{shop.forceRestock();},TimedEventsManager.SHOP_RATE,this.shop);
    }

    startTraderUpdateJob(){
        setInterval((trader:Trader)=>{trader.forceRestock();},TimedEventsManager.TRADER_RATE,this.trader);
    }

    private static rewardAllCachedPlayers(playersHandler:PlayerHandler){
        playersHandler.cachedPlayersMap.forEach((player:Player,playerId:string)=>{
            player.addRewards();
        });
        console.log("Rewards Added");
    }
}