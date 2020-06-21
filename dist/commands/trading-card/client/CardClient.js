"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CardManager_1 = require("../cards/CardManager");
const PackManager_1 = require("../packs/PackManager");
const EmbedsManager_1 = require("./EmbedsManager");
const CardMain_1 = require("../CardMain");
const PlayerHandler_1 = require("../player/PlayerHandler");
const Mathf_1 = require("../utils/Mathf");
const paginationEmbed = require('discord.js-pagination');
class CardClient {
    //###################### HELP COMMANDS ######################
    //help
    static help(msg, client, params) {
        msg.channel.send(EmbedsManager_1.EmbedsManager.getHelpEmbed());
    }
    //game help
    static gameHelp(msg, client, params) {
        msg.channel.send(EmbedsManager_1.EmbedsManager.getHelpEmbed());
    }
    //card help
    static cardHelp(msg, client, params) {
        msg.channel.send(EmbedsManager_1.EmbedsManager.getCardHelpEmbed());
    }
    //pack help
    static packHelp(msg, client, params) {
        msg.channel.send(EmbedsManager_1.EmbedsManager.getPackHelpEmbed());
    }
    //profile help
    static profileHelp(msg, client, params) {
        msg.channel.send(EmbedsManager_1.EmbedsManager.getProfileHelpEmbed());
    }
    //player help
    static playerHelp(msg, client, params) {
        msg.channel.send(EmbedsManager_1.EmbedsManager.getPlayerHelpEmbed());
    }
    //shop help
    static shopHelp(msg, client, params) {
        msg.channel.send(EmbedsManager_1.EmbedsManager.getShopHelpEmbed());
    }
    //trader help
    static traderHelp(msg, client, params) {
        msg.channel.send(EmbedsManager_1.EmbedsManager.getTraderHelpEmbed());
    }
    //###################### ADMIN COMMANDS ######################
    //shop restock
    static shopRestock(msg, client, params) {
        CardMain_1.server.shop.forceRestock();
        msg.channel.send("Shop force restocked").then((sentMsg) => CardClient.shopInfo(sentMsg, client, params));
    }
    //trader restock
    static traderRestock(msg, client, params) {
        CardMain_1.server.trader.forceRestock();
        msg.channel.send("Trader force restocked").then((sentMsg) => CardClient.traderInfo(sentMsg, client, params));
    }
    //give :player gold :ammount
    static givePlayerGold(msg, client, params) {
        const user = msg.mentions.users.first();
        if (user) {
            let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(user.id);
            if (player) {
                const goldAmmount = parseInt(params.ammount);
                player.addGold(goldAmmount);
                msg.channel.send(`Admin has given ${user.username} ${goldAmmount} gold.`);
            }
            else {
                msg.channel.send("Error finding player");
            }
        }
        else {
            msg.channel.send("Error finding mention");
        }
    }
    //give :player pack :packId
    static givePlayerPack(msg, client, params) {
        const user = msg.mentions.users.first();
        if (user) {
            let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(user.id);
            const packId = parseInt(params.packId);
            const pack = PackManager_1.PackManager.getInstance().getItemById(packId);
            if (player !== undefined && pack !== undefined) {
                player.addPack(pack);
                msg.channel.send(`Admin has given ${user.username} ${pack.name} pack.`);
            }
            else {
                msg.channel.send("Error finding player or pack");
            }
        }
        else {
            msg.channel.send("Error finding mention");
        }
    }
    //give :player card :cardId
    static givePlayerCard(msg, client, params) {
        const user = msg.mentions.users.first();
        if (user) {
            let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(user.id);
            const cardId = parseInt(params.cardId);
            const card = CardManager_1.CardManager.getInstance().getItemById(cardId);
            if (player !== undefined && card !== undefined) {
                player.addCard(card);
                msg.channel.send(`Admin has given ${user.username} ${card.name}.`);
            }
            else {
                msg.channel.send("Error finding player or card");
            }
        }
        else {
            msg.channel.send("Error finding mention");
        }
    }
    //###################### SHOP COMMANDS ######################    
    //shop info
    static shopInfo(msg, client, params) {
        msg.channel.send(EmbedsManager_1.EmbedsManager.shopInfoEmbedMessage(CardMain_1.server.shop));
    }
    //shop buy :packName
    static shopBuy(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack = PackManager_1.PackManager.getInstance().getItemByName(params.packName);
        const hasPackInStore = CardMain_1.server.shop.contains(pack.id);
        if (player !== undefined && pack !== undefined && hasPackInStore) {
            const bought = player.buyPack(pack);
            if (bought) {
                CardMain_1.server.shop.sellItem(pack.id);
                msg.channel.send(`Sold x1 ${pack.name} pack`);
            }
            else {
                msg.channel.send("You don't have enough money");
            }
        }
        else {
            msg.channel.send("Player or pack not found");
        }
    }
    //shop buyx :packName :ammount
    static shopBuyX(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack = PackManager_1.PackManager.getInstance().getItemByName(params.packName);
        const hasPackInStore = CardMain_1.server.shop.contains(pack.id);
        const ammountSelected = parseInt(params.ammount);
        const ammountInStore = CardMain_1.server.shop.inventory.items.get(pack.id);
        if (player !== undefined && pack !== undefined && hasPackInStore) {
            if (ammountSelected <= ammountInStore) {
                const bought = player.buyXPack(pack, ammountSelected);
                if (bought) {
                    CardMain_1.server.shop.sellItem(pack.id);
                    msg.channel.send(`Sold x${ammountSelected} ${pack.name} packs`);
                }
                else {
                    msg.channel.send("You don't have enough money");
                }
            }
        }
        else {
            msg.channel.send("Player or pack not found");
        }
    }
    //###################### TRADER COMMANDS ######################  
    //trader info
    static traderInfo(msg, client, params) {
        msg.channel.send(EmbedsManager_1.EmbedsManager.traderInfoEmbedMessage(CardMain_1.server.trader));
    }
    //trader sell :cardName
    static traderSell(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const card = CardManager_1.CardManager.getInstance().getItemByName(params.cardName);
        if (player !== undefined && card !== undefined) {
            if (player.hasCard(card) && CardMain_1.server.trader.hasBounty(card)) {
                player.removeCard(card);
                player.addGold(CardMain_1.server.trader.bountyPrice(card.stars));
            }
            else {
                msg.channel.send("You or the trader dont have that card");
            }
        }
        else {
            msg.channel.send("Player or card not found");
        }
    }
    //trader reroll :cardName1 :cardName2 :cardName3 
    static traderReroll(msg, client, params) {
        msg.channel.send("Nah no gambling yet");
    }
    //trader guess :stars
    static traderGuess(msg, client, params) {
        msg.channel.send("Nah no gambling yet");
    }
    //###################### CARDS COMMANDS ######################
    //card info :cardValue
    static cardInfo(msg, client, params) {
        let card;
        Mathf_1.Mathf.isNumeric(params.cardValue) ? card = CardManager_1.CardManager.getInstance().getItemById(parseInt(params.cardValue)) : card = CardManager_1.CardManager.getInstance().getItemByName(params.cardValue);
        if (card) {
            const embed = EmbedsManager_1.EmbedsManager.cardInfoEmbedMessage(card);
            msg.channel.send(embed);
        }
        else {
            msg.channel.send("No result found.");
        }
    }
    //card search :cardName
    static cardSearch(msg, client, params) {
        const cards = CardManager_1.CardManager.getInstance().getCardSearch(params.cardName);
        if (cards.length > 0) {
            const names = cards.map((card) => { return card.name; }).join(",");
            msg.channel.send("Found: " + names);
        }
        else {
            msg.channel.send("No result found.");
        }
    }
    //###################### PACKS COMMANDS ######################
    //pack info :packValue
    static packInfo(msg, client, params) {
        let pack;
        Mathf_1.Mathf.isNumeric(params.packValue) ? pack = PackManager_1.PackManager.getInstance().getItemById(parseInt(params.packValue)) : pack = PackManager_1.PackManager.getInstance().getItemByName(params.packValue);
        if (pack) {
            paginationEmbed(msg, EmbedsManager_1.EmbedsManager.getPackEmbedPages(pack), ['⏪', '⏩'], EmbedsManager_1.EmbedsManager.PAGINATION_TIMEOUT);
        }
        else {
            msg.channel.send("No result found.");
        }
    }
    //###################### PROFILE COMMANDS ######################
    //my profile
    static myProfile(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.author.id);
        if (player) {
            const embed = EmbedsManager_1.EmbedsManager.playerEmbedMessage(msg.author.username, player);
            msg.channel.send(embed);
        }
        else {
            msg.channel.send("Error finding player");
        }
    }
    //my cards
    static myCards(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.author.id);
        if (player) {
            paginationEmbed(EmbedsManager_1.EmbedsManager.getPlayerCardsEmbedPages(player));
        }
        else {
            msg.channel.send("Error finding player");
        }
    }
    //my packs
    static myPacks(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.author.id);
        if (player) {
            paginationEmbed(EmbedsManager_1.EmbedsManager.getPlayerPacksEmbedPages(player));
        }
        else {
            msg.channel.send("Error finding player");
        }
    }
    //profile :mention
    static profile(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.mentions.users.first().id);
        if (player) {
            msg.channel.send(EmbedsManager_1.EmbedsManager.playerEmbedMessage(msg.member.displayName, player));
        }
        else {
            msg.channel.send("Error finding player");
        }
    }
    //profile cards :mention
    static profileCards(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.mentions.users.first().id);
        if (player) {
            paginationEmbed(EmbedsManager_1.EmbedsManager.getPlayerCardsEmbedPages(player));
        }
        else {
            msg.channel.send("Error finding player");
        }
    }
    //profile packs :mention
    static profilePacks(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.mentions.users.first().id);
        if (player) {
            paginationEmbed(EmbedsManager_1.EmbedsManager.getPlayerPacksEmbedPages(player));
        }
        else {
            msg.channel.send("Error finding player");
        }
    }
    //leaderboard gold
    static leaderboardGold(msg, client, params) {
        msg.channel.send("No gold stats");
    }
    //leaderboard cards
    static leaderboardCards(msg, client, params) {
        msg.channel.send("No cards stats");
    }
    //leaderboard cards
    static leaderboardStars(msg, client, params) {
        msg.channel.send("No star stats");
    }
    //###################### PLAYER COMMANDS ######################
    //wish :cardName
    static wish(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.member.id);
        const result = player.wish(params.cardName);
        if (result) {
            msg.channel.send("Wish set sucessfully");
        }
        else {
            msg.channel.send("Error setting wish");
        }
    }
    //pack open :packName
    static packOpen(msg, client, params) {
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.member.id);
        const pack = PackManager_1.PackManager.getInstance().getItemById(parseInt(params.packName));
        const cards = player.openPack(pack);
        if (cards) {
            cards.forEach((card) => CardClient.claimableCardPost(msg, player, card));
        }
        else {
            msg.channel.send("You don't have that pack");
        }
    }
    static claimableCardPost(msg, player, card) {
        const embed = EmbedsManager_1.EmbedsManager.cardEmbedMessage(CardManager_1.CardManager.getInstance().getItemById(3));
        msg.channel.send(embed).then((sentMsg) => {
            sentMsg.react("👍");
            sentMsg.awaitReactions(EmbedsManager_1.EmbedsManager.needersEmojiFilter, { max: 5, time: 15000 }).then((collected) => {
                const usersIds = collected.first().users.cache.array().filter((user) => { return user.bot === false; }).map((user) => { return user.id; });
                console.log(usersIds);
                //const validNeeders:Array<Player>=LootingSystem.validNeeders(usersIds);
                //const winner:Player=LootingSystem.splitLoot(player,validNeeders,card);
                // msg.channel.send(msg.guild.members.cache.get(winner.id).user.username+" has received: " + card.name);
            });
        });
    }
}
exports.CardClient = CardClient;
