"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CardManager_1 = require("../cards/CardManager");
const PackManager_1 = require("../packs/PackManager");
const EmbedsManager_1 = require("./EmbedsManager");
const CardMain_1 = require("../CardMain");
const PlayerHandler_1 = require("../player/PlayerHandler");
const LootingSystem_1 = require("../LootingSystem");
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
        msg.channel.send(EmbedsManager_1.EmbedsManager.getGameHelpEmbed());
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
    //give :player claims :claims
    static givePlayerClaims(msg, client, params) {
        const user = msg.mentions.users.first();
        if (user) {
            let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(user.id);
            const claims = parseInt(params.claims);
            if (player !== undefined) {
                player.addClaim(claims);
                msg.channel.send(`Admin has given ${user.username} ${claims} claims.`);
            }
            else {
                msg.channel.send("Error finding player");
            }
        }
        else {
            msg.channel.send("Error finding mention");
        }
    }
    //give :player trades :trades
    static givePlayerTrades(msg, client, params) {
        const user = msg.mentions.users.first();
        if (user) {
            let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(user.id);
            const trades = parseInt(params.trades);
            if (player !== undefined) {
                player.addTrade(trades);
                msg.channel.send(`Admin has given ${user.username} ${trades} trades.`);
            }
            else {
                msg.channel.send("Error finding player");
            }
        }
        else {
            msg.channel.send("Error finding mention");
        }
    }
    //give :player luck :luckModifier
    static givePlayerLuck(msg, client, params) {
        const user = msg.mentions.users.first();
        if (user) {
            let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(user.id);
            const luck = parseInt(params.luckModifier);
            if (player !== undefined) {
                player.addLuck(luck);
                msg.channel.send(`Admin has given ${user.username} ${luck} luck.`);
            }
            else {
                msg.channel.send("Error finding player");
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
    //shop buy :packName*
    static shopBuy(msg, client, params) {
        const packName = params.packName.join(" ");
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack = PackManager_1.PackManager.getInstance().getItemByName(packName);
        if (player !== undefined && pack !== undefined) {
            const hasPackInStore = CardMain_1.server.shop.contains(pack.id);
            if (hasPackInStore) {
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
    }
    //shop buyx :ammount :packName*
    static shopBuyX(msg, client, params) {
        const packName = params.packName.join(" ");
        const ammountSelected = parseInt(params.ammount);
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack = PackManager_1.PackManager.getInstance().getItemByName(packName);
        if (player !== undefined && pack !== undefined) {
            const hasPackInStore = CardMain_1.server.shop.contains(pack.id);
            const ammountInStore = CardMain_1.server.shop.inventory.items.get(pack.id);
            if (hasPackInStore) {
                if (ammountSelected <= ammountInStore) {
                    const bought = player.buyXPack(pack, ammountSelected);
                    if (bought) {
                        CardMain_1.server.shop.sellItem(pack.id, ammountSelected);
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
    //open pack :packName
    static packOpen(msg, client, params) {
        const packName = params.packName.join(" ");
        let player = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(msg.member.id);
        const pack = PackManager_1.PackManager.getInstance().getItemByName(packName);
        if (player !== undefined && pack !== undefined) {
            const cards = player.openPack(pack);
            if (cards) {
                cards.forEach((card) => CardClient.claimableCardPost(msg, player, card));
            }
            else {
                msg.channel.send("You don't have that pack.");
            }
        }
        else {
            msg.channel.send("No such pack");
        }
    }
    static claimableCardPost(msg, packOwnerPlayer, card) {
        const embed = EmbedsManager_1.EmbedsManager.cardEmbedMessage(card);
        msg.channel.send(embed).then((sentMsg) => {
            sentMsg.react("👍");
            const collector = sentMsg.createReactionCollector(EmbedsManager_1.EmbedsManager.needersEmojiFilter, { max: 5, time: 13000 });
            const usersSet = new Set();
            const neederPlayers = new Array();
            const neederFilter = (user) => { return user.bot === false && usersSet.has(user.id) === false; };
            collector.on("collect", (msgr) => {
                const user = msgr.users.cache.array().filter(neederFilter)[0];
                if (user) {
                    usersSet.add(user.id);
                    let neederPlayer = PlayerHandler_1.PlayerHandler.getInstance().getPlayerById(user.id);
                    if (neederPlayer.hasClaims()) {
                        neederPlayer.removeClaim();
                        neederPlayers.push(neederPlayer);
                    }
                }
            });
            collector.on("end", (msgr) => {
                const lootResult = LootingSystem_1.LootingSystem.splitLoot(packOwnerPlayer, neederPlayers, card);
                if (lootResult.winner) {
                    const winnerName = msg.guild.members.cache.get(lootResult.winner.id).user.username;
                    sentMsg.channel.send(`${winnerName} has won ${card.name}.`);
                }
                else {
                    sentMsg.channel.send(`${card.name} got away unclaimed.`);
                }
            });
        });
    }
}
exports.CardClient = CardClient;
