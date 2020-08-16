import { MessageEmbed } from "discord.js";

export class HelpEmbeds{

    static getHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Help Commands")
        .addField("game help","Gives some knowledge about the game")
        .addField("card help","Displays card related commands")
        .addField("pack help","Displays pack related commands")
        .addField("profile help","Displays profile related commands")
        .addField("player help","Displays player related commands")
        .addField("shop help","Displays shop related commands")
        .addField("trader help","Displays trader related commands");
    }

    static getGameHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Game help")
        .setDescription("Buy pack and open it");
    }

    static getCardHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Card Commands")
        .addField("card info <card name or id>","Displays card info")
        .addField("card search <search text>","Displays list of cards with that contain that text");
    }

    static getPackHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Pack Commands")
        .addField("pack info <pack name or id>","Displays pack info")
        .addField("pack list","Displays list of packs available");
    }

    static getProfileHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Profile Commands")
        .addField("my profile","Shows your profile")
        .addField("my cards","Displays your card collection")
        .addField("my packs","Displays your packs")
        .addField("profile <mention>","Displays the mentioned user profile")
        .addField("profile cards <mention>","Displays mentioned user card collection")
        .addField("profile packs <mention>","Displays mentioned user packs")
        .addField("leaderboard gold","Shows leaderboard for most gold")
        .addField("leaderboard cards","Shows leaderboard for most cards")
        .addField("leaderboard stars","Shows leaderboard for most stars");
    }

    static getPlayerHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Player Commands")
        .addField("wish <card name>","Sets your current wished card")
        .addField("trade <mention> <card to give>$<card to receive> ","Sends trade request")
        .addField("open pack <pack name>","Opens a pack from your inventory with that name")
        .addField("top10 <position> <card name>","Sets card into your top 10");
    }

    static getShopHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Shop Commands")
        .addField("shop info","Shows shop stock")
        .addField("shop buy <pack name>","Buys a pack")
        .addField("shop buyx <ammount> <pack name>","Buys X ammount of packs");
    }

    static getTraderHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Trader Commands")
        .addField("trader info","Shows Trader bounty cards")
        .addField("trader sell <card name>","Sells card to trader")
        .addField("trader reroll <card name1>$<card name2>$<card name3>","Rerolls 3 of your cards into a new card")
        .addField("trader guess <stars>","Guess a random card star number for a price");
    }
}