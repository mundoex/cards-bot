import { Message, User, MessageReaction } from "discord.js";

export class DiscordUtils{
    static getMentionFromMessage(msg:Message) : User{
        return msg.mentions.users.first();
    }

    static getUserFromMessageReaction(msgr:MessageReaction,id:string) : User{
        return msgr.users.cache.get(id);
    }

    static getUserFromMessageById(msg:Message,id:string) : User{
        return msg.guild.members.cache.get(id).user;
    }
}