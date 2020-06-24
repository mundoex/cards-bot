import { Message, Client, MessageEmbed } from "discord.js";
import { Pack } from "../packs/Pack";
import { Mathf } from "../utils/Mathf";
import { PackManager } from "../packs/PackManager";
import { EmbedsManager } from "../client/EmbedsManager";
import { Stringf } from "../utils/Stringf";
const paginationEmbed=require("discord.js-pagination");

export class PackController{
    //###################### PACKS COMMANDS ######################
    //pack info :packValue*
    static packInfo(msg:Message, client:Client, params:any){
        const packValue=params.packValue.join(" ");
        let pack:Pack;
        Mathf.isNumeric(packValue) ? pack=PackManager.getInstance().getItemById(parseInt(packValue)) : pack=PackManager.getInstance().getItemByName(Stringf.upperCaseFirstChars(packValue));
        if(pack){
            paginationEmbed(msg,EmbedsManager.getPackEmbedPages(pack),['⏪', '⏩'],EmbedsManager.PAGINATION_TIMEOUT);
        }else{
            msg.channel.send("No result found.");
        }
    }
    //pack list
    static packList(msg:Message, client:Client, params:any) {
        const embed=new MessageEmbed().setTitle("Available Packs")
        .setThumbnail("https://media.discordapp.net/attachments/643766430801592330/724404894873813112/1e06c0d354669e2ef3666f129eeb6d7a6b0f6a45_hq.png?width=349&height=465");
        PackManager.getInstance().packs.forEach((pack:Pack)=>embed.addField(pack.name,pack.rarity.toString));
        msg.channel.send(embed);
    }
}