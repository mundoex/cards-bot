import { Message, Client } from "discord.js";
import { EmbedsManager } from "../client/EmbedsManager";
import { server } from "../main";
import { PlayerHandler } from "../player/PlayerHandler";
import { Pack } from "../packs/Pack";
import { PackManager } from "../packs/PackManager";

export class ShopController{
    //###################### SHOP COMMANDS ######################    
    //shop info
    static shopInfo(msg:Message, client:Client, params:any){
        msg.channel.send(EmbedsManager.shopInfoEmbedMessage(server.shop));
    }

    //shop buy :packName*
    static shopBuy(msg:Message, client:Client, params:any){
        const packName=params.packName.join(" ");
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack:Pack=PackManager.getInstance().getItemByName(packName);
        if(player!==undefined && pack!==undefined){
            const hasPackInStore=server.shop.hasStock(pack.id);
            if(hasPackInStore){
                const bought=player.buyPack(pack);
                if(bought){
                    server.shop.sellItem(pack.id);
                    msg.channel.send(`Sold x1 ${pack.name} pack`);
                }else{
                    msg.channel.send("You don't have enough money");
                }
            }else{
                msg.channel.send("Pack not in store");
            }     
        }else{
            msg.channel.send("No player or pack found");
        }
    }

    //shop buyx :ammount :packName*
    static shopBuyX(msg:Message, client:Client, params:any){
        const packName=params.packName.join(" ");
        const ammountSelected=parseInt(params.ammount);
        let player=PlayerHandler.getInstance().getPlayerById(msg.author.id);
        const pack:Pack=PackManager.getInstance().getItemByName(packName);
        if(player!==undefined && pack!==undefined){
            const hasPackInStore=server.shop.contains(pack.id);
            const ammountInStore=server.shop.inventory.items.get(pack.id);
            if(hasPackInStore){
                if(ammountSelected<=ammountInStore){
                    const bought=player.buyXPack(pack,ammountSelected);
                    if(bought){
                        server.shop.sellItem(pack.id,ammountSelected);
                        msg.channel.send(`Sold x${ammountSelected} ${pack.name} packs`);
                    }else{
                        msg.channel.send("You don't have enough money");
                    }
                }else{
                    msg.channel.send("Not enough packs available");
                }
            }else{
                msg.channel.send("Player or pack not found");
            }      
        }else{
            msg.channel.send("No player or pack found");
        } 
    }
}