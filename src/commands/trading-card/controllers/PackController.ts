import { Message, Client, MessageEmbed } from "discord.js";
import { Pack } from "../packs/Pack";
import { Mathf } from "../utils/Mathf";
import { PackManager } from "../packs/PackManager";
import { GameConstants } from "../global/GameConstants";
import { ControllerUtils } from "../utils/ControllerUtils";
import { PackEmbeds } from "../embeds/PackEmbeds";
const paginationEmbed=require("discord.js-pagination");

export class PackController{
    //###################### PACKS COMMANDS ######################
    //pack info :packValue*
    static packInfo(msg:Message, client:Client, params:any){
        const packValue=ControllerUtils.parsePackName(params.packValue);
        let pack:Pack;
        Mathf.isNumeric(packValue) ? pack=PackManager.getInstance().getItemById(parseInt(packValue)) : pack=PackManager.getInstance().getItemByName(packValue);
        if(pack){
            paginationEmbed(msg,PackEmbeds.getPackEmbedPages(pack),['⏪', '⏩'],GameConstants.PAGINATION_TIMEOUT);
        }else{
            msg.channel.send("No result found.");
        }
    }

    //pack list
    static packList(msg:Message, client:Client, params:any) { 
        msg.channel.send(PackEmbeds.getPackListEmbed());
    }
}