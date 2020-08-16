import { Player } from "./Player";
import { Inventory } from "../inventory/Inventory";
import { InventorySaveData } from "../inventory/InventorySaveData";
import { Slot } from "../inventory/Slot";

const STARTER_EXPERIENCE=0;
const STARTER_GOLD=350;
const STARTER_CLAIMS=7;
const STARTER_PRIORITY_CLAIMS=1;
const STARTER_TRADES=2;
const STARTER_CARD_WISH_ID=0;
//Modifiers
const STARTER_EXPERIENCE_MODIFIER=0;
const STARTER_LUCK_MODIFIER=0;
const STARTER_GOLD_MODIFIER=0;
const STATER_PROTECTION_EXPIRATION=0;
//Collection
const STARTER_TOP_10_CARDS_IDS=new Array<number>();
const STARTER_DRYSTREAKS=new Array<Slot>();
const STARTER_ACHIEVEMENTS=new Set<number>();
const STARTER_INV_SLOTS=30;
const STARTER_CARDS:Inventory=Inventory.fromSaveData(new InventorySaveData(Number.MAX_SAFE_INTEGER,new Array<Slot>()));
const STARTER_PACKS:Inventory=Inventory.fromSaveData(new InventorySaveData(STARTER_INV_SLOTS,new Array<Slot>()));
const STARTER_PACKS_OPENED=new Array<Slot>();
//Stats
const STARTER_CLAIMS_COMPLETE=0;
const STARTER_TOTAL_GOLD_EARNED=0;
const STARTER_VALUEABLE_STEALS_PREVENTED=0;
const STARTER_VALUEABLE_STEALS_COMPLETE=0;
const STARTER_BOUNTIES_COMPLETE=0;
const STARTER_TRADES_COMPLETE=0;
const STARTER_TRIVIAS_COMPLETE=0;
const STARTER_REROLLS_COMPLETE=0;
const STARTER_GAMBLES_COMPLETE=0;
const STARTER_SACRIFICES=0;
const STARTER_CARDS_CAUGHT=0;
const STARTER_TOTAL_PACKS_BOUGHT=0;
export class PlayerFactory{

    static createStarterPlayer(id:string) : Player{
        return Player.fromSaveData(
        {
            id:id,
            experience:STARTER_EXPERIENCE,
            gold:STARTER_GOLD,
            claims:STARTER_CLAIMS,
            priorityClaims:STARTER_PRIORITY_CLAIMS,
            trades:STARTER_TRADES,
            cardWishId:STARTER_CARD_WISH_ID,
            experienceModifier:STARTER_EXPERIENCE_MODIFIER,
            luckModifier:STARTER_LUCK_MODIFIER,
            goldModifier:STARTER_GOLD_MODIFIER,
            protectionExpiration:STATER_PROTECTION_EXPIRATION,
            top10CardsIds:new Array<number>(),
            dryStreaks:new Array<[number,number]>(),
            achievements:new Array<number>(),
            cards:new InventorySaveData(Number.MAX_SAFE_INTEGER,new Array<Slot>()),
            packs:new InventorySaveData(STARTER_INV_SLOTS,new Array<Slot>()),
            packsOpened:new InventorySaveData(Number.MAX_SAFE_INTEGER,new Array<Slot>()),
            claimsComplete:STARTER_CLAIMS_COMPLETE,
            totalGoldEarned:STARTER_TOTAL_GOLD_EARNED,
            valueableStealsPrevented:STARTER_VALUEABLE_STEALS_PREVENTED,
            valueableStealsCompleted:STARTER_VALUEABLE_STEALS_COMPLETE,
            bountiesComplete:STARTER_BOUNTIES_COMPLETE,
            tradesComplete:STARTER_TRADES_COMPLETE,
            triviasComplete:STARTER_TRIVIAS_COMPLETE,
            rerollsComplete:STARTER_REROLLS_COMPLETE,
            gamblesComplete:STARTER_GAMBLES_COMPLETE,
            sacrifices:STARTER_SACRIFICES,
            cardsCaught:STARTER_CARDS_CAUGHT,
            totalPacksBought:STARTER_TOTAL_PACKS_BOUGHT
        });
    }
}