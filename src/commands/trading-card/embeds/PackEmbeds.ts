import { Pack } from "../packs/Pack";
import { isNullOrUndefined } from "util";
import { GameConstants } from "../global/GameConstants";
import { MessageEmbed } from "discord.js";
import { PackManager } from "../packs/PackManager";
import { AsciiTableWrapper } from "./AsciiTableWrapper";
import { CardManager } from "../cards/CardManager";
import { Arrayf } from "../utils/Arrayf";
import { Card } from "../cards/Card";

export class PackEmbeds{
    public static packEmbedsMap=new Map<number,Array<MessageEmbed>>();

    static getPackEmbedPages(pack:Pack){
        if(PackEmbeds.packEmbedsMap.size===0){
            PackEmbeds.fillMaps();
        }
        return PackEmbeds.packEmbedsMap.get(pack.id);
    }

    public static fillMaps(){
        PackManager.getInstance().packs.forEach((pack:Pack)=>{
            this.packEmbedsMap.set(pack.id,PackEmbeds.getPackEmbedMessages(pack));
        });
    }

    public static getPackEmbedMessages(pack:Pack){
        const cards:Array<Card>=pack.possibleItemsIds.map((cardId:number)=>CardManager.getInstance().getItemById(cardId));
        let rows=new Array();
        for(const card of cards){
            rows.push([card.id,card.name,card.stars]);
        }
        const rowPages=Arrayf.slitArrayInChunks(rows,GameConstants.CARDS_PER_TABLE);
        return rowPages.map((rowPage:any)=>{
            let table=new AsciiTableWrapper();
            table.setHeading("Id","Name","Rarity");
            table.__maxCells=3;
            table.__rows=rowPage;
            return new MessageEmbed().setDescription(table.toMarkDownString());
        });
    }

    static getPackListEmbed() : MessageEmbed{
        const embed=new MessageEmbed().setTitle("Available Packs")
        .setThumbnail("https://media.discordapp.net/attachments/643766430801592330/724404894873813112/1e06c0d354669e2ef3666f129eeb6d7a6b0f6a45_hq.png?width=349&height=465");
        PackManager.getInstance().packs.forEach((pack:Pack)=>embed.addField(pack.name,pack.rarity.toString));
        return embed;
    }
}