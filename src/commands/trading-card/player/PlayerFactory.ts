import { Player } from "./Player";
import { Inventory } from "../inventory/Inventory";
import { InventorySaveData } from "../inventory/InventorySaveData";
import { Slot } from "../inventory/Slot";

export class PlayerFactory{
    private static readonly STARTER_GOLD:number=300;
    private static readonly STARTER_CLAIMS:number=3;
    private static readonly STARTER_TRADES:number=1;

    private static readonly STARTER_CARDS:Inventory=Inventory.fromSaveData(new InventorySaveData(Number.MAX_SAFE_INTEGER,new Array<Slot>()));
    private static readonly STARTER_PACKS:Inventory=Inventory.fromSaveData(new InventorySaveData(Number.MAX_SAFE_INTEGER,new Array<Slot>()));
    private static readonly STARTER_TOP10_CARDS_IDS:Array<number>=[];

    private static readonly STARTER_PACKS_OPENED=0;
    private static readonly STARTER_DRY_STREAK:number=0;
    private static readonly STARTER_CARD_WISH_ID:number=0;
    private static readonly STARTER_LUCK_MODIFIER:number=0;
    

    static createStarterPlayer(id:string) : Player{
        return new Player(id,PlayerFactory.STARTER_GOLD,PlayerFactory.STARTER_CLAIMS,PlayerFactory.STARTER_TRADES,
            PlayerFactory.STARTER_CARDS,PlayerFactory.STARTER_PACKS,PlayerFactory.STARTER_TOP10_CARDS_IDS,
            PlayerFactory.STARTER_PACKS_OPENED,PlayerFactory.STARTER_DRY_STREAK,PlayerFactory.STARTER_CARD_WISH_ID,PlayerFactory.STARTER_LUCK_MODIFIER);
    }
}