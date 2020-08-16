import { MessageEmbed } from "discord.js";
import { AchievmentFactory } from "../systems/achievments/AchievmentFactory";
import { Achievment } from "../systems/achievments/Achievment";
import { Arrayf } from "../utils/Arrayf";
import { GameConstants } from "../global/GameConstants";

export class AchievmentsEmbed{
    static achievmentsList() : Array<MessageEmbed>{
        const achievmentsPages:Array<Array<Achievment>>=Arrayf.slitArrayInChunks(AchievmentFactory.ACHIEVMENTS,GameConstants.ACHIEVEMENTS_PER_TABLE);

        return achievmentsPages.map((achievPage:Array<Achievment>)=>{
            let embed=new MessageEmbed().setTitle("Achievements List");
            achievPage.forEach((achiev:Achievment)=>{
                embed.addField(achiev.name,`${achiev.rewardText} ${achiev.tag}`,true);
            });
            return embed;
        });
    }

    static getAchievmentEmbed(achievment:Achievment) : MessageEmbed{
        const embed=new MessageEmbed().setTitle(achievment.name+" "+achievment.tag);
        embed.addField("Reward:",achievment.rewardText,true);
        embed.setDescription(achievment.description);
        return embed;
    }
}