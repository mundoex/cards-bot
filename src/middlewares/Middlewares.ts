import { Message, Client, Role } from "discord.js";

const DEVELOPER_IDS:Array<string>=["112900545299136512"];

export class Middlewares{

    static isDeveloper(msg:Message,client:Client,params:any,next:any){
        return DEVELOPER_IDS.includes(msg.member.id) ? next() : msg.channel.send("No permission for that command");
    }

    static isNotRetarded(msg:Message,client:Client,params:any,next:any){
        return ["206067072906690571"].includes(msg.member.id)===false ? next() : msg.channel.send("Nah you stealing piece of shit\n https://tenor.com/8pOE.gif ");
    }
}