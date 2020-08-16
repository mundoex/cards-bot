import { MessageEmbed } from "discord.js";
import { CardManager } from "../cards/CardManager";
import { GameConstants } from "../global/GameConstants";
import { Arrayf } from "../utils/Arrayf";
import { Player } from "./Player";
import { Card } from "../cards/Card";
import { PackManager } from "../packs/PackManager";
import { Pack } from "../packs/Pack";
import { AsciiTableWrapper } from "../embeds/AsciiTableWrapper";
import { CollectionPositon } from "./CollectionPosition";

export class PlayerCachedEmbeds{
    private static positionsObject:any={};
    //cards
    private isCardsUpdated:boolean;
    private cardsTables:Array<AsciiTableWrapper>;
    private cachedCardsEmbedPages:Array<MessageEmbed>;
    public get cardsEmbedPages(){
        if(!this.isCardsUpdated) this.updateCards();
        return this.cachedCardsEmbedPages;
    }
    //packs
    private isPacksUpdated:boolean;
    private packsTable:AsciiTableWrapper;
    private cachedPacksEmbedPage:MessageEmbed;
    public get packsEmbedPage(){
        if(!this.isPacksUpdated) this.updatePacks();
        return this.cachedPacksEmbedPage;
    }
    
    //collection
    private isCollectionUpdated:boolean;
    private collectionTables:Array<AsciiTableWrapper>;
    private cachedCollectionEmbedPages:Array<MessageEmbed>;
    public get collectionEmbedPages(){
        if(!this.isCollectionUpdated) this.updateCollectionEmbed();
        return this.cachedCollectionEmbedPages;
    }

    //profile
    private isProfileUpdated:boolean;
    private profileTable:AsciiTableWrapper;
    private cachedProfileEmbed:MessageEmbed;
    public get profileEmbed(){
        if(!this.isProfileUpdated){
            this.updateProfile();
        }
        return this.cachedProfileEmbed;
    }

    private player:Player;

    constructor(player:Player){
        this.player=player;
        //cards
        this.cardsTables=new Array<AsciiTableWrapper>();
        this.cachedCardsEmbedPages=new Array<MessageEmbed>();
        this.isCardsUpdated=false;
        this.updateCards();
        //packs
        this.packsTable=new AsciiTableWrapper();
        this.cachedPacksEmbedPage=new MessageEmbed();
        this.isPacksUpdated=false;
        this.updatePacks();
        //cards collection
        this.cachedCollectionEmbedPages=new Array<MessageEmbed>();
        this.collectionTables=PlayerCachedEmbeds.getDefaultCollectionTables();
        this.isCollectionUpdated=false;
        this.setCurrentPlayerCollection();
        this.updateCollection();
        //profile embed
        this.profileTable=new AsciiTableWrapper();
        this.cachedProfileEmbed=new MessageEmbed();
        this.isProfileUpdated=false;
        this.updateProfile();
    }

    //############ PACKS ############
    public setCardsInNeedOfUpdate(){
        this.isCardsUpdated=false;
        this.isCollectionUpdated=false;
    }

    public setPacksInNeedOfUpdate(){
        this.isPacksUpdated=false;
    }

    public setProfileInNeedOfUpdate(){
        this.isProfileUpdated=false;
    }

    //############ PACKS ############
    private updatePacks() : void{
        this.updatePacksTable();
        this.updatePacksEmbed();
        this.isPacksUpdated=true;
    }

    private updatePacksTable() : void{
        let table=new AsciiTableWrapper().setHeading("Name","Quantity","Rarity");
        const packs=this.player.getPacks.entries();
        for (const [key,value] of packs) {
            const pack:Pack=PackManager.getInstance().getItemById(key);
            table.addRow(pack.name, value, pack.rarity.stars);
        }
        this.packsTable=table;
    }

    private updatePacksEmbed() : void{
        let embed=new MessageEmbed().setTitle("Packs Collection")
        embed.setDescription(this.packsTable.toMarkDownString());
        this.packsTable.__rows.length>0 ?  embed.setDescription(this.packsTable.toMarkDownString()) : embed.setDescription("Empty");
        this.cachedPacksEmbedPage=embed;
    }

    //############ CARDS ############
    private updateCards() : void{
        this.updateCardsTables();
        this.updateCardsEmbed();
        this.isCardsUpdated=true;
    }

    private updateCardsTables() : void{
        const cards=this.player.getCards.entries();
        let rows=new Array();
        for(const [key,value] of cards){
            const card:Card=CardManager.getInstance().getItemById(key);
            rows.push([card.name,value,card.stars]);
        }
        const rowPages=Arrayf.slitArrayInChunks(rows,GameConstants.CARDS_PER_TABLE);
        const tables=rowPages.map((rowPage:any)=>{
            let table=new AsciiTableWrapper();
            table.setHeading("Name","Ammount","Rarity");
            table.__maxCells=3;
            table.__rows=rowPage;
            return table;
        });
        this.cardsTables=tables;
    }

    private updateCardsEmbed(){
        if(this.cardsTables.length>0){
            this.cachedCardsEmbedPages=this.cardsTables.map((table:AsciiTableWrapper)=>{return new MessageEmbed().setDescription(table.toMarkDownString());});
        }else{
            this.cachedCardsEmbedPages=new Array<MessageEmbed>();
            this.cachedCardsEmbedPages.push(new MessageEmbed().setDescription("Empty"));
        }
    }
    //############ COLLECTION ############
    private updateCollection(){
        this.updateCollectionEmbed();
        this.isCollectionUpdated=true;
    }

    public setCardInCollection(card:Card,ammount:number) : void{
        if(!card.unique){
            const position:CollectionPositon=PlayerCachedEmbeds.getPosition(card.id);
            let tablePage=this.collectionTables[position.page];
            ammount>0 ? tablePage.__rows[position.index][2]=ammount : tablePage.__rows[position.index][2]="O";
            this.isCollectionUpdated=false;
        }
    }

    private setIdInCollection(cardId:number,ammount:number) : void{
            const position:CollectionPositon=PlayerCachedEmbeds.getPosition(cardId);
            let tablePage=this.collectionTables[position.page];
            ammount>0 ? tablePage.__rows[position.index][2]=ammount : tablePage.__rows[position.index][2]="O";
            this.isCollectionUpdated=false;
    }

    private setCurrentPlayerCollection() : void{
        this.player.getCards.forEach((value:number,key:number)=>{
            const isUnique=CardManager.getInstance().getItemById(key).unique;
            if(!isUnique){
                this.setIdInCollection(key,value);
            }
        });
    }

    private updateCollectionEmbed() : void{
        this.cachedCollectionEmbedPages=this.collectionTables.map((table:AsciiTableWrapper)=>{
            return new MessageEmbed().setDescription(table.toMarkDownString());
        });
        this.isCollectionUpdated=true;
    }

    //############ PROFILE ############
    private updateProfile(){
        this.updateProfileTable();
        this.updateProfileEmbed();
        this.isProfileUpdated=true;
    }

    private updateProfileTable() : void{
        const cardManagerInstance=CardManager.getInstance();
        let table=new AsciiTableWrapper();
        table.addRow("Level: ",this.player.level);
        table.addRow("Total Experience: ",Math.floor(this.player.getExperience));
        table.addRow("Next level: ",`${Math.floor(this.player.percentageToLevelUp)}%`);
        table.addRow("Gold: ", Math.floor(this.player.getGold));
        table.addRow("Claims left: ",this.player.getClaims);
        table.addRow("Priority claims left: ",this.player.getPriorityClaims);
        table.addRow("Trades left: ",this.player.getTrades);
        table.addRow("Luck Modifier: ",this.player.getLuckModifier);
        table.addRow("Gold Modifier: ",this.player.getGoldModifier);
        table.addRow("Experience Modifier: ",this.player.getExperienceModifier);
        table.addRow("Total Packs Opened: ",this.player.getPacksOpened.totalItemsAmmount());
        table.addRow("Collection Progress: ",this.player.getCollectionString+"|"+this.player.getCollectionPercentage+"%");
        const wishedCard:Card=cardManagerInstance.getItemById(this.player.getCardWishId);
        wishedCard ? table.addRow("Wish: ",wishedCard.name) : table.addRow("Wish: ","Nothing");
        this.profileTable=table;
    }

    private updateProfileEmbed() : void{
        this.cachedProfileEmbed=new MessageEmbed().setDescription(this.profileTable.toMarkDownString()).setFooter(this.player.achievmentsTags);
    }

    private static getDefaultCollectionTables() : Array<AsciiTableWrapper>{
        const cards=CardManager.getInstance().cardsList;
        let rows=new Array();
        for(const card of cards){
            rows.push([card.id,card.name,"O"]);
            const currentSize=rows.length;
            const page=Math.floor((currentSize-1)/GameConstants.CARDS_PER_TABLE);
            const index=(currentSize-1)-(page*GameConstants.CARDS_PER_TABLE);
            PlayerCachedEmbeds.positionsObject[card.id]=new CollectionPositon(page,index);
        }
        const rowPages=Arrayf.slitArrayInChunks(rows,GameConstants.CARDS_PER_TABLE);
        return rowPages.map((rowPage:any)=>{
            let table=new AsciiTableWrapper();
            table.setHeading("Id","Name","Ammount");
            table.__maxCells=3;
            table.__rows=rowPage;
            return table;
        });
    }

    private static getPosition(cardId:number) : CollectionPositon{
        return PlayerCachedEmbeds.positionsObject[cardId];
    }
}