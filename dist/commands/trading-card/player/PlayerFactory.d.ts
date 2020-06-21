import { Player } from "./Player";
export declare class PlayerFactory {
    private static readonly STARTER_GOLD;
    private static readonly STARTER_CLAIMS;
    private static readonly STARTER_TRADES;
    private static readonly STARTER_CARDS;
    private static readonly STARTER_PACKS;
    private static readonly STARTER_TOP10_CARDS_IDS;
    private static readonly STARTER_PACKS_OPENED;
    private static readonly STARTER_DRY_STREAK;
    private static readonly STARTER_CARD_WISH_ID;
    private static readonly STARTER_LUCK_MODIFIER;
    static createStarterPlayer(id: string): Player;
}
