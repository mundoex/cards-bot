import { Player } from "../player/Player";
import { PlayerHandler } from "../player/PlayerHandler";
import { Message, Client, MessageEmbed, MessageReaction, Collection, User } from "discord.js";
import { Pack } from "../packs/Pack";
import { Card } from "../cards/Card";
import { CardManager } from "../cards/CardManager";
import { LootingSystem } from "../LootingSystem";
import { PackManager } from "../packs/PackManager";
import { Shop } from "../shop/Shop";
import { Rarity } from "../drop-generation/Rarity";
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