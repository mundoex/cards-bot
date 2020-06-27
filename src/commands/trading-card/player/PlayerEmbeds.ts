import { MessageEmbed } from "discord.js";
import { CardManager } from "../cards/CardManager";
import { GameConstants } from "../global/GameConstants";
import { Arrayf } from "../utils/Arrayf";
import { Player } from "./Player";
import { Card } from "../cards/Card";
import { PackManager } from "../packs/PackManager";
import { Pack } from "../packs/Pack";
import { EventEmitter } from "events";
import { EmbedsManager } from "../client/EmbedsManager";
const  AsciiTable = require("ascii-table");

export class PlayerEmbeds{
    private static readonly defaultTables:Array<typeof AsciiTable>=PlayerEmbeds.getDefaultCollectionTables();
    //cards
    cardsEventListener:EventEmitter;
    cardsTables:Array<typeof AsciiTable>;
    cardsEmbedPages:Array<MessageEmbed>;
    
    //packs
    packsEventListener:EventEmitter;
    packsTable:typeof AsciiTable;
    packsEmbedPage:MessageEmbed;
    
    //collection
    collectionTables:Array<typeof AsciiTable>;
    collectionEmbedPages:Array<MessageEmbed>;
    
    //profile
    profileEmbed:MessageEmbed;
    profileEventListener:EventEmitter;
    //
    sortEventListener:EventEmitter;
    player:Player;

    constructor(player:Player){
        this.player=player;
        //cards
        this.cardsTables=new Array<typeof AsciiTable>();
        this.cardsEmbedPages=new Array<MessageEmbed>();
        this.cardsEventListener=new EventEmitter().addListener("card update",this.onCardUpdate);
        this.updatePlayerCardsTables();
        this.updatePlayerCardsEmbed();
        //packs
        this.packsTable=new AsciiTable();
        this.packsEmbedPage=new MessageEmbed();
        this.packsEventListener=new EventEmitter().addListener("pack update",this.onPackUpdate);
        this.updatePlayerPacksTable();
        this.updatePlayerPacksEmbed();
        //cards collection
        this.collectionEmbedPages=new Array<MessageEmbed>();
        this.collectionTables=PlayerEmbeds.getDefaultCollectionTables();
        this.updatePlayerCollectionTables();
        this.updatePlayerCollectionEmbed();
        //sort event
        this.sortEventListener=new EventEmitter().addListener("sort",this.onSort);
        //profile embed
        this.profileEmbed=new MessageEmbed();
        this.profileEventListener=new EventEmitter().addListener("profile update",this.onProfileUpdate);
        this.updateProfile();
    }

    //############ EVENT FUNCTIONS ############
    onPackUpdate(player:Player){
        player.playerEmbeds.updatePlayerPacksTable();
        player.playerEmbeds.updatePlayerPacksEmbed();
    }

    onCardUpdate(player:Player,cardId:number,ammont:number){
        //cards
        player.playerEmbeds.updatePlayerCardsTables();
        player.playerEmbeds.updatePlayerCardsEmbed();
        //collection
        player.playerEmbeds.setCardInCollection(cardId,ammont);
        player.playerEmbeds.updatePlayerCollectionEmbed();
    }

    onSort(player:Player){
        player.playerEmbeds.updatePlayerCardsTables();
        player.playerEmbeds.updatePlayerCardsEmbed();
    }

    onProfileUpdate(player:Player){
        player.playerEmbeds.updateProfile();
    }

    //############ PACKS ############
    updatePlayerPacksTable() : void{
        let table=new AsciiTable().setHeading("Name","Quantity","Rarity");
        table.__edge="│";
        table.__fill="─";
        table.__top=";";
        table.__bottom=";";
        const packs=this.player.getPacks().entries();
        for (const [key,value] of packs) {
            const pack:Pack=PackManager.getInstance().getItemById(key);
            table.addRow(pack.name, value, pack.rarity.stars);
        }
        this.packsTable=table;
    }

    updatePlayerPacksEmbed() : void{
        let embed=new MessageEmbed().setTitle("Packs Collection")
        embed.setDescription(EmbedsManager.tableToStringMarkdown(this.packsTable));
        this.packsTable.__rows.length>0 ?  embed.setDescription(EmbedsManager.tableToStringMarkdown(this.packsTable)) : embed.setDescription("Empty");
        this.packsEmbedPage=embed;
    }

    //############ CARDS ############
    updatePlayerCardsTables() : void{
        const cards=this.player.getCards().entries();
        let rows=new Array();
        for(const [key,value] of cards){
            const card:Card=CardManager.getInstance().getItemById(key);
            rows.push([card.name,value,card.stars]);
        }
        const rowPages=Arrayf.slitArrayInChunks(rows,GameConstants.CARDS_PER_TABLE);
        const tables=rowPages.map((rowPage:any)=>{
            let table=new AsciiTable();
            table.setHeading("Name","Ammount","Rarity");
            table.__edge="│";
            table.__fill="─";
            table.__top=";";
            table.__bottom=";";
            table.__maxCells=3;
            table.__rows=rowPage;
            return table;
        });
        this.cardsTables=tables;
    }

    updatePlayerCardsEmbed(){
        this.cardsEmbedPages=this.cardsTables.map((table:typeof AsciiTable)=>{
            return new MessageEmbed().setDescription(EmbedsManager.tableToStringMarkdown(table));
        });
    }
    //############ COLLECTION ############
    updatePlayerCollectionTables() : void{
        const cards=this.player.getCards().entries();
        for(const [key,value] of cards){
            this.setCardInCollection(key,value);
        }
    }

    updatePlayerCollectionEmbed() : void{
        this.collectionEmbedPages=this.collectionTables.map((table:typeof AsciiTable)=>{
            return new MessageEmbed().setDescription(EmbedsManager.tableToStringMarkdown(table));
        });
    }

    setCardInCollection(cardId:number,ammount:number) : void{
        const pageIndex=PlayerEmbeds.getPageIndex(cardId);
        const cardIndex=PlayerEmbeds.getCardIndex(cardId,pageIndex);
        let tablePage=this.collectionTables[pageIndex];
        let row=tablePage.__rows[cardIndex];
        ammount>0 ? row[2]=ammount : row[2]="O";
    }

    private static getDefaultCollectionTables() : Array<typeof AsciiTable>{
        const cards=CardManager.getInstance().cards.values();
        let rows=new Array();
        for(const card of cards){
            rows.push([card.id,card.name,"O"]);
        }
        const rowPages=Arrayf.slitArrayInChunks(rows,GameConstants.CARDS_PER_TABLE);
        return rowPages.map((rowPage:any)=>{
            let table=new AsciiTable();
            table.__edge="│";
            table.__fill="─";
            table.__top=";";
            table.__bottom=";";
            table.setHeading("Id","Name","Ammount");
            table.__maxCells=3;
            table.__rows=rowPage;
            return table;
        });
    }

    //profile
    updateProfile(){
        const cardManagerInstance=CardManager.getInstance();
        let table=new AsciiTable();
        table.__edge="│";
        table.__fill="─";
        table.__top=";";
        table.__bottom=";";
        table.addRow("Gold: ",this.player.getGold());
        table.addRow("Claims left: ",this.player.getClaims());
        table.addRow("Trades left: ",this.player.getTrades());
        table.addRow("Luck Modifier: ",this.player.getLuckModifier());
        table.addRow("Total Packs Opened: ",this.player.getPacksOpened());
        table.addRow("Collection Progress: ",`${this.player.getCards().size}/${cardManagerInstance.cards.size}`);
        const wishedCard=cardManagerInstance.getItemById(this.player.getWish());
        wishedCard!==undefined ? table.addRow("Wish: ",wishedCard.name) : table.addRow("Wish: ","Nothing");
        this.profileEmbed=new MessageEmbed().setDescription(EmbedsManager.tableToStringMarkdown(table));
    }

    private static getPageIndex(cardId:number) : number{
        return Math.ceil(cardId/GameConstants.CARDS_PER_TABLE)-1;
    }

    private static getCardIndex(cardId:number,pageIndex:number) : number{
        return  cardId-(pageIndex*GameConstants.CARDS_PER_TABLE)-1;
    }
}