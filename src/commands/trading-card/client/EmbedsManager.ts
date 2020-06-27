import { Card } from "../cards/Card";
import { MessageEmbed, MessageReaction, User, Message, Client, Collection } from "discord.js";
import { Rarity } from "../drop-generation/Rarity";
import { PackManager } from "../packs/PackManager";
import { Pack } from "../packs/Pack";
import { isNullOrUndefined } from "util";
import { Shop } from "../shop/Shop";
import { Trader } from "../trader/Trader";
import { CardManager } from "../cards/CardManager";
import { Player } from "../player/Player";
import { Inventory } from "../inventory/Inventory";
import { GameConstants } from "../global/GameConstants";
import { Arrayf } from "../utils/Arrayf";

const  AsciiTable = require("ascii-table");
const emojis:any={0: '0️⃣', 1: '1️⃣',2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣',6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣',10: '🔟'};

export class EmbedsManager{

    private static packsEmbedCache=new Map<number,Array<MessageEmbed>>();
    private static playerCardsEmbedCache=new Map<string,Array<MessageEmbed>>();
    private static playerPacksEmbedCache=new Map<string,Array<MessageEmbed>>();
    private static defaultCollectionRows=EmbedsManager.getDefaultCollectionRows();

    static getHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Help Commands")
        .addField("game help","Gives some knowledge about the game")
        .addField("card help","Displays card related commands")
        .addField("pack help","Displays pack related commands")
        .addField("profile help","Displays profile related commands")
        .addField("player help","Displays player related commands")
        .addField("shop help","Displays shop related commands")
        .addField("trader help","Displays trader related commands");
    }

    static getGameHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Game help")
        .setDescription("Buy pack and open it");
    }

    static getCardHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Card Commands")
        .addField("card info <card name or id>","Displays card info")
        .addField("card search <search text>","Displays list of cards with that contain that text");
    }

    static getPackHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Pack Commands")
        .addField("pack info <pack name or id>","Displays pack info")
        .addField("pack list","Displays list of packs available");
    }

    static getProfileHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Profile Commands")
        .addField("my profile","Shows your profile")
        .addField("my cards","Displays your card collection")
        .addField("my packs","Displays your packs")
        .addField("profile <mention>","Displays the mentioned user profile")
        .addField("profile cards <mention>","Displays mentioned user card collection")
        .addField("profile packs <mention>","Displays mentioned user packs")
        .addField("leaderboard gold","Shows leaderboard for most gold")
        .addField("leaderboard cards","Shows leaderboard for most cards")
        .addField("leaderboard stars","Shows leaderboard for most stars");
    }

    static getPlayerHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Player Commands")
        .addField("wish <card name>","Sets your current wished card")
        .addField("trade <mention> <card to give>$<card to receive> ","Sends trade request")
        .addField("open pack <pack name>","Opens a pack from your inventory with that name")
        .addField("top10 <position> <card name>","Sets card into your top 10");
    }

    static getShopHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Shop Commands")
        .addField("shop info","Shows shop stock")
        .addField("shop buy <pack name>","Buys a pack")
        .addField("shop buyx <ammount> <pack name>","Buys X ammount of packs");
    }

    static getTraderHelpEmbed() : MessageEmbed{
        return new MessageEmbed().setTitle("Trader Commands")
        .addField("trader info","Shows Trader bounty cards")
        .addField("trader sell <card name>","Sells card to trader")
        .addField("trader reroll <card name1>$<card name2>$<card name3>","Rerolls 3 of your cards into a new card")
        .addField("trader guess <stars>","Guess a random card star number for a price");
    }

    static getPackEmbedPages(pack:Pack){
        let result:Array<MessageEmbed>=EmbedsManager.packsEmbedCache.get(pack.id);
        if(isNullOrUndefined(result)){
            result=EmbedsManager.generatePackCardsEmbedPages(pack);
            EmbedsManager.packsEmbedCache.set(pack.id, result);
            setTimeout(()=>EmbedsManager.packsEmbedCache.delete(pack.id),GameConstants.CLEAN_CACHE_TIMEOUT);  //clean cache
            return result;
        }else{
            return result;
        }
    }

    static getPlayerCardsEmbedPages(player:Player) : Array<MessageEmbed>{
        this.playerCardsEmbedCache.set(player.getId(),EmbedsManager.generatePlayerCardsEmbedPages(player));
        return this.playerCardsEmbedCache.get(player.getId());
    }

    static getPlayerPacksEmbedPages(player:Player): Array<MessageEmbed>{
        this.playerPacksEmbedCache.set(player.getId(),EmbedsManager.generatePlayerPacksEmbedPages(player));
        return this.playerPacksEmbedCache.get(player.getId());
    }

    static generatePlayerCardsEmbedPages(player:Player) : Array<MessageEmbed>{
        let embedsResult=new Array<MessageEmbed>();
        //empty
        if(player.isEmptyCards()){
            embedsResult.push(new MessageEmbed().setTitle("Cards Collection").setDescription("Empty"));
            return embedsResult;
        }
        let table=new AsciiTable().setHeading("Name","Quantity","Rarity");
        let counter=0;
        
        for (const [key,value] of player.getCards().entries()) {
            const card:Card=CardManager.getInstance().getItemById(key);
            if(counter===GameConstants.CARDS_PER_TABLE){  
                embedsResult.push(new MessageEmbed().setTitle("Cards Collection").setDescription("```"+table.toString()+"```"));
                table=new AsciiTable().setHeading("Name","Quantity","Rarity");
                counter=0;
            }else{
                table.addRow(card.name,value,card.stars);
                counter++;
            }
        }
        embedsResult.push(new MessageEmbed().setTitle("Cards Collection").setDescription("```"+table.toString()+"```"));
        return embedsResult;
    }

    static generatePlayerPacksEmbedPages(player:Player) : Array<MessageEmbed>{
        let embedsResult=new Array<MessageEmbed>();
        let table=new AsciiTable().setHeading("Name","Quantity","Rarity");
        let counter=0;
        //empty
        if(player.isEmptyPacks()){
            embedsResult.push(new MessageEmbed().setTitle("Packs Collection").setDescription("Empty"));
            return embedsResult;
        }
        for (const [key,value] of player.getPacks().entries()) {
            const pack:Pack=PackManager.getInstance().getItemById(key);
            if(counter===GameConstants.CARDS_PER_TABLE){  
                embedsResult.push(new MessageEmbed().setTitle("Packs Collection").setDescription("```"+table.toString()+"```"));
                table=new AsciiTable().setHeading("Name","Quantity","Rarity");
                counter=0;
            }else{
                table.addRow(pack.name,value,pack.rarity.stars);
                counter++;
            }
        }
        embedsResult.push(new MessageEmbed().setTitle("Packs Collection").setDescription("```"+table.toString()+"```"));
        return embedsResult;
    }

    private static generatePackCardsEmbedPages(pack:Pack) : Array<MessageEmbed>{
        let embedsResult=new Array<MessageEmbed>();
        const cards=pack.managerInstance.getItemsByIds(pack.possibleItemsIds);
        let table=new AsciiTable().setHeading("Id","Name","Stars");
        let counter=0;
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index];
            if(counter===GameConstants.CARDS_PER_TABLE){  
                embedsResult.push(new MessageEmbed().setTitle(pack.name).setDescription("```"+table.toString()+"```"));
                table=new AsciiTable().setHeading("Id","Name","Stars");
                counter=0;
            }else{
                table.addRow(card.id,card.name,card.stars);
                counter++;
            }
        }
        embedsResult.push(new MessageEmbed().setTitle(pack.name).setDescription("```"+table.toString()+"```"));
        return embedsResult;
    }


    static cardEmbedMessage(card:Card) : MessageEmbed{
        const rarity=new Rarity(card.stars);
        const embed=new MessageEmbed()
            .setTitle(card.rarity.colorString +"   "+ card.name)
            .setThumbnail(card.imageURL)
            .addField("Show: ", card.show)
            .addField(rarity.toString+": ",Rarity.starsToString(card.stars));
        return embed;
    }

    static cardInfoEmbedMessage(card:Card) : MessageEmbed{
        const rarity=new Rarity(card.stars);
        const pack=PackManager.getInstance().getCardPack(card.id);
        const embed=new MessageEmbed()
            .setTitle(card.rarity.colorString +"   "+ card.name)
            .setThumbnail(card.imageURL)
            .addField("Id: ",card.id)
            .addField("Pack Set: ",pack.name)
            .addField("Show: ", card.show)
            .addField(rarity.toString+": ",Rarity.starsToString(card.stars));
        return embed;
    }

    static shopInfoEmbedMessage(shop:Shop) : MessageEmbed{
        let table=new AsciiTable().setHeading("Pack Name","Stock","Rarity","Price");
        table.__edge="│";
        table.__fill="─";
        table.__top=";";
        table.__bottom=";";
        for(const [key,value] of shop.inventory.items.entries()){
            const pack=PackManager.getInstance().getItemById(key);
            table.addRow(pack.name,value,pack.rarity.stars,pack.goldValue);
        }
        return new MessageEmbed().setTitle("Packs Shop").setDescription(EmbedsManager.tableToStringMarkdown(table)).setImage(GameConstants.SHOP_IMAGE);
    }

    static traderInfoEmbedMessage(trader:Trader) : MessageEmbed{
        let table=new AsciiTable().setHeading("Bounty Card Name","Pack","Rarity","Bounty Price");
        table.__edge="│";
        table.__fill="─";
        table.__top=";";
        table.__bottom=";";
        trader.needIds.forEach((id:number)=>{
            const card=CardManager.getInstance().getItemById(id);
            if(card){
                table.addRow(card.name, PackManager.getInstance().getCardPack(card.id).name, card.rarity.stars, trader.bountyPrice(card.rarity.stars));
            } 
        });
        return new MessageEmbed().setTitle("Trader").setDescription(EmbedsManager.tableToStringMarkdown(table)).setImage(GameConstants.TRADER_IMAGE);;
    }

    static playerEmbedMessage(title:string,player:Player): MessageEmbed{
        let table=new AsciiTable();
        table.addRow("Gold: ",player.getGold());
        table.addRow("Claims left: ",player.getClaims());
        table.addRow("Trades left: ",player.getTrades());
        table.addRow("Dry Streak: ",player.getDryStreak());
        table.addRow("Luck Modifier: ",player.getLuckModifier());
        table.addRow("Total Packs Opened: ",player.getPacksOpened());
        const wishedCard=CardManager.getInstance().getItemById(player.getWish());
        wishedCard!==undefined ? table.addRow("Wish: ",wishedCard.name) : table.addRow("Wish: ","Nothing");
        return new MessageEmbed().setTitle(title+" Profile").setAuthor(title).setDescription("```"+table.toString()+"```");
    }

    static needersEmojiFilter(reaction:MessageReaction, user:User){
        return reaction.emoji.name==="👍" && user.bot===false;
    }

    static shopInventoryEmbed(inv:Inventory){
        let table=new AsciiTable().setHeading("Item","Ammount");
        if(inv.empty()){
            for(const [key,value] of inv.items.entries()){
                table.addRow(PackManager.getInstance().getItemById(key).name,value);
            }
            return new MessageEmbed().setTitle("Inventory").setDescription("```"+table.toString()+"```");
        }else{
            return new MessageEmbed().setTitle("Inventory").setDescription("Empty");
        }
        
    }

    static getCollecion(playerName:string, player:Player) : Array<MessageEmbed>{
        const heading=["Id","Name","Ammount"];
        return EmbedsManager.defaultCollectionRows.map(rowsPage=>{
            let table=new AsciiTable();
            table._heading=heading;
            table._rows=rowsPage;
            return new MessageEmbed().setTitle("playerName"+" Collection").setDescription("```js"+table.toString()+"```");
        });
    }

    private static getDefaultCollectionRows() : Array<any>{
        const cards=CardManager.getInstance().cards.values();
        let rows=new Array();
        for(const card of cards){
            rows.push(card.id,card.name,"O");
        }
        return Arrayf.slitArrayInChunks(rows,GameConstants.CARDS_PER_TABLE);
    }

    public static tableToStringMarkdown(table:typeof AsciiTable) : string{
        let resultText:string=table.toString();
        ["┌",,"┐","└","┘"].forEach((corner:string)=>resultText=resultText.replace(";",corner));
        return "```ts\n"+resultText+"```";
    }
}