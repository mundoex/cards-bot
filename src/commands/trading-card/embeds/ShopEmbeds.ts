import { Shop } from "../shop/Shop";
import { MessageEmbed } from "discord.js";
import { PackManager } from "../packs/PackManager";
import { GameConstants } from "../global/GameConstants";
import { AsciiTableWrapper } from "./AsciiTableWrapper";

export class ShopEmbeds{
    static shopInfoEmbedMessage(shop:Shop) : MessageEmbed{
        let table=new AsciiTableWrapper();
        table.setHeading("Pack Name","Stock","Rarity","Price");
        for(const [key,value] of shop.inventory.items.entries()){
            const pack=PackManager.getInstance().getItemById(key);
            table.addRow(pack.name,value,pack.rarity.stars,pack.goldValue);
        }
        return new MessageEmbed().setTitle("Packs Shop").setDescription(table.toMarkDownString()).setImage(GameConstants.SHOP_IMAGE);
    }
}