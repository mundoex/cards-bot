import { Message, Client } from "discord.js";
import { server } from "../main";
import { PlayerHandler } from "../player/PlayerHandler";
import { Pack } from "../packs/Pack";
import { PackManager } from "../packs/PackManager";
import { ShopEmbeds } from "../embeds/ShopEmbeds";
import { ControllerUtils } from "../utils/ControllerUtils";
import { isNullOrUndefined } from "util";
import { NoPackFoundException } from "../player/exceptions/NoPackFoundException";
import { NoPlayerFoundException } from "../player/exceptions/NoPlayerFoundException";
import { GameConstants } from "../global/GameConstants";
import { Shop } from "../shop/Shop";
import { Player } from "../player/Player";
import { OutOfStockException } from "../player/exceptions/OutOfStockException";
import { NotEnoughStockException } from "../player/exceptions/NotEnoughStockException";
import { NoEnoughLevelException } from "../player/exceptions/NotEnoughLevelException";
import { Mathf } from "../utils/Mathf";

export class ShopController{
    //###################### SHOP COMMANDS ######################    
    //shop info
    static shopInfo(msg:Message, client:Client, params:any){
        msg.channel.send(ShopEmbeds.shopInfoEmbedMessage(server.shop));
    }

    //shop buy :packName*
    static shopBuy(msg:Message, client:Client, params:any){
        try {
            const packName=ControllerUtils.parsePackName(params.packName);
            let pack;
            Mathf.isNumeric(packName) ? pack=PackManager.getInstance().getItemById(parseInt(packName)) : pack=PackManager.getInstance().getItemByName(packName);
            if(isNullOrUndefined(pack)) throw new NoPackFoundException();

            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();

            const sucess=ShopController.shopBuyLogic(player,pack,server.shop);
            if(sucess){
                msg.channel.send(`${pack.name} bought.`);
                player.save();
            }
        } catch (err) {
            msg.channel.send(err.toString());
        }
    }

    //shop buyx :ammount :packName*
    static shopBuyX(msg:Message, client:Client, params:any){
        try {
            const packName=ControllerUtils.parsePackName(params.packName);
            let pack;
            Mathf.isNumeric(packName) ? pack=PackManager.getInstance().getItemById(parseInt(packName)) : pack=PackManager.getInstance().getItemByName(packName);
            if(isNullOrUndefined(pack)) throw new NoPackFoundException();
    
            const ammountSelected=parseInt(params.ammount);
    
            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();
    
            const sucess=ShopController.shopBuyXLogin(player,pack,server.shop,ammountSelected);
            if(sucess){
                msg.channel.send(`x${ammountSelected} ${pack.name} bought.`);
                player.save();
            }
        } catch (err) {
            msg.channel.send(err.toString());
        }
    }

    //shop2 info
    static shop2Info(msg:Message, client:Client, params:any){
        msg.channel.send(ShopEmbeds.shopInfoEmbedMessage(server.superShop));
    }

    //shop2 buy :packName*
    static shop2Buy(msg:Message, client:Client, params:any){
        try {
            const packName=ControllerUtils.parsePackName(params.packName);
            let pack;
            Mathf.isNumeric(packName) ? pack=PackManager.getInstance().getItemById(parseInt(packName)) : pack=PackManager.getInstance().getItemByName(packName);
            if(isNullOrUndefined(pack)) throw new NoPackFoundException();

            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();

            if(player.level<GameConstants.SHOP_2_LVL_REQUIRED) throw new NoPlayerFoundException();

            const sucess=ShopController.shopBuyLogic(player,pack,server.superShop);
            if(sucess){
                msg.channel.send(`${pack.name} bought.`);
                player.save();
            }
        } catch (error) {
            
        }
    }

    //shop2 buyx :ammount :packName*
    static shop2BuyX(msg:Message, client:Client, params:any){
        try {
            const packName=ControllerUtils.parsePackName(params.packName);
            let pack;
            Mathf.isNumeric(packName) ? pack=PackManager.getInstance().getItemById(parseInt(packName)) : pack=PackManager.getInstance().getItemByName(packName);
            if(isNullOrUndefined(pack)) throw new NoPackFoundException();

            let player=PlayerHandler.getInstance().playerAPI.getPlayerById(msg.author.id);
            if(isNullOrUndefined(player)) throw new NoPlayerFoundException();

            if(player.level<GameConstants.SHOP_2_LVL_REQUIRED) throw new NoEnoughLevelException();

            const ammountSelected=parseInt(params.ammount);
            const sucess=ShopController.shopBuyXLogin(player,pack,server.superShop,ammountSelected);
            if(sucess){
                msg.channel.send(`x${ammountSelected} ${pack.name} bought.`);
                player.save();
            }
        } catch (error) {
            
        }
    }

    private static shopBuyLogic(player:Player,pack:Pack,shop:Shop){
        const hasPackInStore=shop.hasStock(pack.id);
        if(hasPackInStore){
            const bought=player.buyPack(pack);
            if(bought){
                shop.sellItem(pack.id);
                player.save();
                return bought;
            }
        }else{
            throw new OutOfStockException();
        }
    }

    private static shopBuyXLogin(player:Player,pack:Pack,shop:Shop,ammountSelected:number){
        const hasPackInStore=shop.hasStock(pack.id);
        const ammountInStore=shop.inventory.items.get(pack.id);
        if(hasPackInStore){
            if(ammountSelected<=ammountInStore){
                const bought=player.buyXPack(pack,ammountSelected);
                if(bought){
                    shop.sellItem(pack.id,ammountSelected);
                    player.save();
                    return bought;
                }
            }else{
                throw new NotEnoughStockException();
            }
        }else{
            throw new OutOfStockException();
        } 
    }
}