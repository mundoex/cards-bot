import { Message, Client, MessageEmbed } from "discord.js";
import { AchievmentSystem } from "../systems/achievments/AchievmentSystem";
import { ControllerUtils } from "../utils/ControllerUtils";
import { AchievmentsEmbed } from "../embeds/AchievmentEmbeds";
import { isNullOrUndefined } from "util";
import { AchievmentNotFoundException } from "../player/exceptions/AchievmentNotFoundException";

export class AchievmentController{
    //achievements list
    static getAchievmentList(msg:Message,client:Client,params:any){
        AchievmentsEmbed.achievmentsList().forEach((embed:MessageEmbed)=>msg.channel.send(embed));
    }
    //achievement :achievmentName*
    static getAchievmentDescription(msg:Message,client:Client,params:any){
        try{
            const achievment=AchievmentSystem.getInstance().getItemByName(ControllerUtils.parsePokemonName(params.achievmentName));
            if(isNullOrUndefined(achievment)) throw new AchievmentNotFoundException();
            msg.channel.send(AchievmentsEmbed.getAchievmentEmbed(achievment));
        }catch(err){
            msg.channel.send(err.toString());
        }
    }
}