"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Rarity_1 = require("../drop-generation/Rarity");
const PackManager_1 = require("../packs/PackManager");
const util_1 = require("util");
const CardManager_1 = require("../cards/CardManager");
const AsciiTable = require("ascii-table");
const emojis = { 0: '0️⃣', 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣', 6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣', 10: '🔟' };
class EmbedsManager {
    static getHelpEmbed() {
        return new discord_js_1.MessageEmbed().setTitle("Help Commands")
            .addField("game help", "Gives some knowledge about the game")
            .addField("card help", "Displays card related commands")
            .addField("pack help", "Displays pack related commands")
            .addField("profile help", "Displays profile related commands")
            .addField("player help", "Displays player related commands")
            .addField("shop help", "Displays shop related commands")
            .addField("trader help", "Displays trader related commands");
    }
    static getGameHelpEmbed() {
        return new discord_js_1.MessageEmbed().setTitle("Game help")
            .setDescription("NOT COMPLETE");
    }
    static getCardHelpEmbed() {
        return new discord_js_1.MessageEmbed().setTitle("Card Commands")
            .addField("card info <card name or id>", "Displays card info")
            .addField("card search <search text>", "Displays list of cards with that contain that text");
    }
    static getPackHelpEmbed() {
        return new discord_js_1.MessageEmbed().setTitle("Pack Commands")
            .addField("pack info <pack name or id>", "Displays pack info")
            .addField("pack list", "Displays list of packs available");
    }
    static getProfileHelpEmbed() {
        return new discord_js_1.MessageEmbed().setTitle("Profile Commands")
            .addField("my profile", "Shows your profile")
            .addField("my cards", "Displays your card collection")
            .addField("my packs", "Displays your packs")
            .addField("profile <mention>", "Displays the mentioned user profile")
            .addField("profile cards <mention>", "Displays mentioned user card collection")
            .addField("profile packs <mention>", "Displays mentioned user packs")
            .addField("leaderboard gold", "Shows leaderboard for most gold")
            .addField("leaderboard cards", "Shows leaderboard for most cards")
            .addField("leaderboard stars", "Shows leaderboard for most stars");
    }
    static getPlayerHelpEmbed() {
        return new discord_js_1.MessageEmbed().setTitle("Player Commands")
            .addField("wish <card name>", "Sets your current wished card")
            .addField("trade <card offer> <card request> <mention>", "Sends trade request")
            .addField("open pack <pack name>", "Opens a pack from your inventory with that name")
            .addField("top10 <position> <card name>", "Sets card into your top 10");
    }
    static getShopHelpEmbed() {
        return new discord_js_1.MessageEmbed().setTitle("Shop Commands")
            .addField("shop info", "Shows shop stock")
            .addField("shop buy <pack name>", "Buys a pack")
            .addField("shop buyx <ammount> <pack name>", "Buys X ammount of packs");
    }
    static getTraderHelpEmbed() {
        return new discord_js_1.MessageEmbed().setTitle("Trader Commands")
            .addField("trader info", "Shows Trader bounty cards")
            .addField("trader sell <card name>", "Sells card to trader")
            .addField("trader reroll <card name1> <card name2> <card name3>", "Rerolls 3 of your cards into a new card")
            .addField("trader guess <stars>", "Guess a random card star number for a price");
    }
    static getPackEmbedPages(pack) {
        let result = EmbedsManager.packsEmbedCache.get(pack.id);
        if (util_1.isNullOrUndefined(result)) {
            result = EmbedsManager.generatePackCardsEmbedPages(pack);
            EmbedsManager.packsEmbedCache.set(pack.id, result);
            setTimeout(() => EmbedsManager.packsEmbedCache.delete(pack.id), EmbedsManager.CLEAN_CACHE_TIMEOUT); //clean cache
            return result;
        }
        else {
            return result;
        }
    }
    static getPlayerCardsEmbedPages(player) {
        this.playerCardsEmbedCache.set(player.id, EmbedsManager.generatePlayerCardsEmbedPages(player));
        return this.playerCardsEmbedCache.get(player.id);
    }
    static getPlayerPacksEmbedPages(player) {
        this.playerPacksEmbedCache.set(player.id, EmbedsManager.generatePlayerPacksEmbedPages(player));
        return this.playerPacksEmbedCache.get(player.id);
    }
    static generatePlayerCardsEmbedPages(player) {
        let embedsResult = new Array();
        let table = new AsciiTable().setHeading("Name", "Quantity", "Rarity");
        let counter = 0;
        //empty
        if (player.cards.items.size <= 0) {
            embedsResult.push(new discord_js_1.MessageEmbed().setTitle("Cards Collection").setDescription("Empty"));
            return embedsResult;
        }
        for (const [key, value] of player.cards.items.entries()) {
            const card = CardManager_1.CardManager.getInstance().getItemById(key);
            if (counter === EmbedsManager.CARDS_PER_TABLE) {
                embedsResult.push(new discord_js_1.MessageEmbed().setTitle("Cards Collection").setDescription("```" + table.toString() + "```"));
                table = new AsciiTable().setHeading("Name", "Quantity", "Rarity");
                counter = 0;
            }
            else {
                table.addRow(card.name, value, card.stars);
                counter++;
            }
        }
        embedsResult.push(new discord_js_1.MessageEmbed().setTitle("Cards Collection").setDescription("```" + table.toString() + "```"));
        return embedsResult;
    }
    static generatePlayerPacksEmbedPages(player) {
        let embedsResult = new Array();
        let table = new AsciiTable().setHeading("Name", "Quantity", "Rarity");
        let counter = 0;
        //empty
        if (player.packs.items.size <= 0) {
            embedsResult.push(new discord_js_1.MessageEmbed().setTitle("Packs Collection").setDescription("Empty"));
            return embedsResult;
        }
        for (const [key, value] of player.packs.items.entries()) {
            const pack = PackManager_1.PackManager.getInstance().getItemById(key);
            if (counter === EmbedsManager.CARDS_PER_TABLE) {
                embedsResult.push(new discord_js_1.MessageEmbed().setTitle("Packs Collection").setDescription("```" + table.toString() + "```"));
                table = new AsciiTable().setHeading("Name", "Quantity", "Rarity");
                counter = 0;
            }
            else {
                table.addRow(pack.name, value, pack.rarity.stars);
                counter++;
            }
        }
        embedsResult.push(new discord_js_1.MessageEmbed().setTitle("Packs Collection").setDescription("```" + table.toString() + "```"));
        return embedsResult;
    }
    static generatePackCardsEmbedPages(pack) {
        let embedsResult = new Array();
        const cards = pack.managerInstance.getItemsByIds(pack.possibleItemsIds);
        let table = new AsciiTable().setHeading("Id", "Name", "Stars");
        let counter = 0;
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index];
            if (counter === EmbedsManager.CARDS_PER_TABLE) {
                embedsResult.push(new discord_js_1.MessageEmbed().setTitle(pack.name).setDescription("```" + table.toString() + "```"));
                table = new AsciiTable().setHeading("Id", "Name", "Stars");
                counter = 0;
            }
            else {
                table.addRow(card.id, card.name, card.stars);
                counter++;
            }
        }
        embedsResult.push(new discord_js_1.MessageEmbed().setTitle(pack.name).setDescription("```" + table.toString() + "```"));
        return embedsResult;
    }
    static cardEmbedMessage(card) {
        const rarity = new Rarity_1.Rarity(card.stars);
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(card.rarity.colorString + "   " + card.name)
            .setThumbnail(card.imageURL)
            .addField("Show: ", card.show)
            .addField(rarity.toString + ": ", Rarity_1.Rarity.starsToString(card.stars));
        return embed;
    }
    static cardInfoEmbedMessage(card) {
        const rarity = new Rarity_1.Rarity(card.stars);
        const pack = PackManager_1.PackManager.getInstance().getCardPack(card.id);
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(card.rarity.colorString + "   " + card.name)
            .setThumbnail(card.imageURL)
            .addField("Id: ", card.id)
            .addField("Pack Set: ", pack.name)
            .addField("Show: ", card.show)
            .addField(rarity.toString + ": ", Rarity_1.Rarity.starsToString(card.stars));
        return embed;
    }
    static shopInfoEmbedMessage(shop) {
        let table = new AsciiTable().setHeading("Pack Name", "Ammount", "Rarity", "Price");
        for (const [key, value] of shop.inventory.items.entries()) {
            const pack = PackManager_1.PackManager.getInstance().getItemById(key);
            table.addRow(pack.name, value, pack.rarity.stars, pack.goldValue);
        }
        return new discord_js_1.MessageEmbed().setTitle("Packs Shop").setDescription("```" + table.toString() + "```");
    }
    static traderInfoEmbedMessage(trader) {
        let table = new AsciiTable().setHeading("Bounty Card Name", "Rarity", "Bounty Price");
        trader.needIds.forEach((id) => {
            const card = CardManager_1.CardManager.getInstance().getItemById(id);
            table.addRow(card.name, card.rarity.stars, trader.bountyPrice(card.rarity.stars));
        });
        return new discord_js_1.MessageEmbed().setTitle("Trader").setDescription("```" + table.toString() + "```");
    }
    static playerEmbedMessage(title, player) {
        let table = new AsciiTable();
        table.addRow("Gold: ", player.gold);
        table.addRow("Claims left: ", player.claims);
        table.addRow("Trades left: ", player.trades);
        table.addRow("Dry Streak: ", player.dryStreak);
        table.addRow("Luck Modifier: ", player.luckModifier);
        const card = CardManager_1.CardManager.getInstance().getItemById(player.cardWishId);
        card !== undefined ? table.addRow("Wish: ", card.name) : table.addRow("Wish: ", "Nothing");
        return new discord_js_1.MessageEmbed().setTitle(title + " Profile").setAuthor(title).setDescription("```" + table.toString() + "```");
    }
    static needersEmojiFilter(reaction, user) {
        return reaction.emoji.name === "👍" && user.bot === false;
    }
    static shopInventoryEmbed(inv) {
        let table = new AsciiTable().setHeading("Item", "Ammount");
        if (inv.empty()) {
            for (const [key, value] of inv.items.entries()) {
                table.addRow(PackManager_1.PackManager.getInstance().getItemById(key).name, value);
            }
            return new discord_js_1.MessageEmbed().setTitle("Inventory").setDescription("```" + table.toString() + "```");
        }
        else {
            return new discord_js_1.MessageEmbed().setTitle("Inventory").setDescription("Empty");
        }
    }
}
exports.EmbedsManager = EmbedsManager;
EmbedsManager.CARDS_PER_TABLE = 30;
EmbedsManager.PAGINATION_TIMEOUT = 2000; //60*1000;
EmbedsManager.CLEAN_CACHE_TIMEOUT = 10 * 60 * 1000;
EmbedsManager.packsEmbedCache = new Map();
EmbedsManager.playerCardsEmbedCache = new Map();
EmbedsManager.playerPacksEmbedCache = new Map();
