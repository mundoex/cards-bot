import { MessageReaction, User } from "discord.js";

const emojis:any={0: '0️⃣', 1: '1️⃣',2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣',6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣',10: '🔟'};

export class EmbedsUtils{

    static needersEmojiFilter(reaction:MessageReaction, user:User){
        return (reaction.emoji.name==="⭐" || reaction.emoji.name==="👍") && user.bot===false;
    }
}