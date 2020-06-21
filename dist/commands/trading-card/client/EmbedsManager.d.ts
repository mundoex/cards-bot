import { Card } from "../cards/Card";
import { MessageEmbed, MessageReaction, User } from "discord.js";
import { Pack } from "../packs/Pack";
import { Shop } from "../shop/Shop";
import { Trader } from "../trader/Trader";
import { Player } from "../player/Player";
import { Inventory } from "../inventory/Inventory";
export declare class EmbedsManager {
    private static readonly CARDS_PER_TABLE;
    static readonly PAGINATION_TIMEOUT: number;
    private static readonly CLEAN_CACHE_TIMEOUT;
    private static packsEmbedCache;
    private static playerCardsEmbedCache;
    private static playerPacksEmbedCache;
    static getHelpEmbed(): MessageEmbed;
    static getGameHelpEmbed(): MessageEmbed;
    static getCardHelpEmbed(): MessageEmbed;
    static getPackHelpEmbed(): MessageEmbed;
    static getProfileHelpEmbed(): MessageEmbed;
    static getPlayerHelpEmbed(): MessageEmbed;
    static getShopHelpEmbed(): MessageEmbed;
    static getTraderHelpEmbed(): MessageEmbed;
    static getPackEmbedPages(pack: Pack): MessageEmbed[];
    static getPlayerCardsEmbedPages(player: Player): MessageEmbed[];
    static getPlayerPacksEmbedPages(player: Player): MessageEmbed[];
    static generatePlayerCardsEmbedPages(player: Player): Array<MessageEmbed>;
    static generatePlayerPacksEmbedPages(player: Player): Array<MessageEmbed>;
    private static generatePackCardsEmbedPages;
    static cardEmbedMessage(card: Card): MessageEmbed;
    static cardInfoEmbedMessage(card: Card): MessageEmbed;
    static shopInfoEmbedMessage(shop: Shop): MessageEmbed;
    static traderInfoEmbedMessage(trader: Trader): MessageEmbed;
    static playerEmbedMessage(title: string, player: Player): MessageEmbed;
    static needersEmojiFilter(reaction: MessageReaction, user: User): boolean;
    static inventoryEmbed(inv: Inventory): MessageEmbed;
}
