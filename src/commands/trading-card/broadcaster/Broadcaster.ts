import { TextChannel, Guild, GuildChannel, User } from "discord.js";
import { isNullOrUndefined } from "util";

export class Broadcaster{
    private static instance:Broadcaster;
    private broadcastChannel:TextChannel;

    private constructor(){
    }

    static getInstance() : Broadcaster{
        if(isNullOrUndefined(Broadcaster.instance)){
            Broadcaster.instance=new Broadcaster();
        }
        return Broadcaster.instance;
    }

    init(guild:Guild){
        this.findAndSetChannel(guild)
    }

    private findAndSetChannel(guild:Guild){
       guild.channels.cache.forEach((channel:GuildChannel)=>{
           const channelNameLowerCase=channel.name.toLowerCase();
            if((channelNameLowerCase.includes("pokecenter") || channelNameLowerCase.includes("cards-bot")  || channelNameLowerCase.includes("pack")) && channel.type==="text"){
                this.broadcastChannel=<TextChannel>channel;
            }
       });
    }

    broadcast(text:string){
        return this.broadcastChannel.send(text);
    }

    getPlayerNameFromId(id:string) : User {
        return this.broadcastChannel.members.get(id).user;
    }
}