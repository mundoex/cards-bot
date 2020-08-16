import { Card } from "../cards/Card";
import { MessageEmbed } from "discord.js";
import { Rarity } from "../drop-generation/Rarity";
import { PackManager } from "../packs/PackManager";

export class CardEmbeds{
    static cardEmbedMessage(card:Card) : MessageEmbed{
        const rarity=new Rarity(card.stars);
        const embed=new MessageEmbed()
            .setTitle(card.rarity.colorString +"   "+ card.name)
            .setThumbnail(card.imageURL)
            .addField("Show: ", card.show)
            .addField(rarity.toString+": ",Rarity.starsToString(card.stars));
        return embed;
    }

    static cardInfoEmbedMessage(card:Card) : MessageEmbed{
        const rarity=new Rarity(card.stars);
        const pack=PackManager.getInstance().getCardPack(card.id);
        let packName;
        pack ? packName=pack.name :packName="Not available";
        const embed=new MessageEmbed()
            .setTitle(card.rarity.colorString +"   "+ card.name)
            .setThumbnail(card.imageURL)
            .addField("Id: ",card.id)
            .addField("Pack Set: ",packName)
            .addField("Show: ", card.show)
            .addField(rarity.toString+": ",Rarity.starsToString(card.stars));
        return embed;
    }
}