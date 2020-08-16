import { Trader } from "../trader/Trader";
import { MessageEmbed } from "discord.js";
import { CardManager } from "../cards/CardManager";
import { PackManager } from "../packs/PackManager";
import { GameConstants } from "../global/GameConstants";
import { AsciiTableWrapper } from "./AsciiTableWrapper";

export class TraderEmbeds{
    static traderInfoEmbedMessage(trader:Trader) : MessageEmbed{
        let table=new AsciiTableWrapper();
        table.setHeading("Bounty Card Name","Pack","Rarity","Bounty Price");
        trader.needIds.forEach((id:number)=>{
            const card=CardManager.getInstance().getItemById(id);
            if(card){
                table.addRow(card.name, PackManager.getInstance().getCardPack(card.id).name, card.rarity.stars, trader.bountyPrice(card.rarity.stars));
            } 
        });
        return new MessageEmbed().setTitle("Trader").setDescription(table.toMarkDownString()).setImage(GameConstants.TRADER_IMAGE);
    }
}