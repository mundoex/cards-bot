import { Card } from "../cards/Card";
import { Inventory } from "../inventory/Inventory";
import { CardManager } from "../cards/CardManager";
import { Pack } from "../packs/Pack";
import { Rarity } from "../drop-generation/Rarity";
import { Trader } from "../trader/Trader";
import { GameConstants } from "../global/GameConstants";
import { Mathf } from "../utils/Mathf";
import { PlayerCachedEmbeds } from "./PlayerCachedEmbeds";
import { SortingSystem } from "../systems/sorting/SortingSystem";
import { PlayerData } from "../database/player-apis/common/PlayerData";
import { EventEmitter } from "events";
import { PlayerEvents } from "./PlayerEvents";
import { PlayerHandler } from "./PlayerHandler";
import { NoSortException } from "./exceptions/NoSortException";
import { OutOfTradesException } from "./exceptions/OutOfTradesException";
import { MissingCardException } from "./exceptions/MissingCardException";
import { AchievmentSystem } from "../systems/achievments/AchievmentSystem";
import { NoCardFoundException } from "./exceptions/NoCardFoundException";
import { NotEnoughGoldException } from "./exceptions/NotEnoughGoldException";
import { LevelingSystem } from "../systems/leveling/LevelingSystem";
import { MissingPackException } from "./exceptions/MissingPackException";
import { isNullOrUndefined } from "util";
import { SacrificeManager } from "../sacrifices/SacrificesManager";
import { SacrificeException } from "./exceptions/SacrificeException";
import { InventoryFullException } from "./exceptions/InventoryFullException";

export class Player{
    private id:string;  public get getId(){ return this.id; }
    private experience:number;  public get getExperience(){ return this.experience; }
    private gold:number;    public get getGold(){ return this.gold; }
    private claims:number;  public get getClaims(){ return this.claims; }
    private priorityClaims:number;  public get getPriorityClaims(){ return this.priorityClaims; }
    private trades:number;  public get getTrades(){ return this.trades; }
    private cardWishId:number;  public get getCardWishId(){ return this.cardWishId; }
    //Modifiers
    private experienceModifier:number;  public get getExperienceModifier(){ return this.experienceModifier; }
    private luckModifier:number;    public get getLuckModifier(){ return this.luckModifier; }
    private goldModifier:number;    public get getGoldModifier(){ return this.goldModifier; }
    private protectionExpiration:number;    public get getProtectionExpiration(){ return this.protectionExpiration; }
    //collection data
    private top10CardIds:Array<number>; public get getTop10CardIds(){ return this.top10CardIds; }
    private dryStreaks:Map<number,number>; public get getDryStreaks(){ return this.dryStreaks; }
    private achievements:Set<number>; public get getAchievements(){ return this.achievements; }
    private cards:Inventory;    public get getCards(){ return this.cards.items; }
    private packs:Inventory;   public get getPacks(){ return this.packs.items; }
    private packsOpened:Inventory; public get getPacksOpened(){ return this.packsOpened; }

    //Stats
    private claimsComplete:number;  public get getClaimsComplete(){ return this.claimsComplete; }
    private totalGoldEarned:number; public get getTotalGoldEarned(){ return this.totalGoldEarned; }
    private valueableStealsPrevented:number;    public get getValueableStealsPrevented(){ return this.valueableStealsPrevented; }
    private valueableStealsCompleted:number;    public get getValueableStealsCompleted(){ return this.valueableStealsCompleted; }
    private bountiesComplete:number;    public get getBountiesComplete(){ return this.bountiesComplete; }
    private tradesComplete:number;  public get getTradesComplete(){ return this.tradesComplete; }
    private triviasComplete:number; public get getTriviasComplete(){ return this.triviasComplete; }
    private rerollsComplete:number; public get getRerollsComplete(){ return this.rerollsComplete; }
    private gamblesComplete:number; public get getGamblesComplete(){ return this.gamblesComplete; }
    private sacrifices:number; public get getSacrifices(){ return this.sacrifices; }
    private cardsCaught:number; public get getCardsCaught(){ return this.cardsCaught; }
    private totalPacksBought:number; public get getTotalPacksBought(){ return this.totalPacksBought; }

    //virtual getters
    public get level(){ return Math.floor(this.experience/GameConstants.LVL_DIVIDER);}
    public get getCollectionString(){ return this.getCards.size+"/"+CardManager.getInstance().size;}
    public get getCollectionPercentage(){ 
        const percentage=(this.getCards.size/CardManager.getInstance().size)*100;
        return Math.floor(percentage);
    }
    public get expToLevelUp(){ return this.experience-(this.level*GameConstants.LVL_DIVIDER);}
    public get percentageToLevelUp(){ return (this.expToLevelUp/GameConstants.LVL_DIVIDER)*100;}
    public get achievmentsTags(){ return AchievmentSystem.getInstance().getTagsFor(this.achievements);}
    public get ultrasTotal(){
        let totalUltras=0;
        this.getCards.forEach((cardAmmount:number,cardId:number)=>{
            const card=CardManager.getInstance().getItemById(cardId);
            if(card.rarity.rarity===GameConstants.RARITY_ULTRA){
                totalUltras+=cardAmmount;
            }
        });
        return totalUltras;
    }
    //other
    private playerCachedEmbeds:PlayerCachedEmbeds;  public get getPlayerCachedEmbeds(){ return this.playerCachedEmbeds; }
    private uniquesCache:Set<number>; public get getUniquesCache(){ return this.uniquesCache; }
    eventListener:EventEmitter;

    constructor(id:string,experience:number,gold:number,claims:number,priorityClaims:number,trades:number,cardWishId:number,
        experienceModifier:number,luckModifier:number,goldModifier:number,protectionExpiration:number,
        top10CardIds:Array<number>,dryStreaks:Map<number,number>,achievements:Set<number>,cards:Inventory,packs:Inventory,packsOpened:Inventory,
        claimsComplete:number,totalGoldEarned:number,valueableStealsPrevented:number,valueableStealsCompleted:number,bountiesComplete:number,tradesComplete:number,triviasComplete:number,rerollsComplete:number,gamblesComplete:number,sacrifices:number,cardsCaught:number,totalPacksBought:number){
        this.id=id;
        this.experience=experience;
        this.gold=gold;
        this.claims=claims;
        this.priorityClaims=priorityClaims;
        this.trades=trades;
        this.cardWishId=cardWishId;
        //Modifiers
        this.experienceModifier=experienceModifier;
        this.luckModifier=luckModifier;
        this.goldModifier=goldModifier;
        this.protectionExpiration=protectionExpiration;
        //collection
        this.top10CardIds=top10CardIds;
        this.dryStreaks=dryStreaks;
        this.achievements=achievements;
        this.cards=cards;
        this.packs=packs;
        this.packsOpened=packsOpened;
        //Stats
        this.claimsComplete=claimsComplete;
        this.totalGoldEarned=totalGoldEarned;
        this.valueableStealsPrevented=valueableStealsPrevented;
        this.valueableStealsCompleted=valueableStealsCompleted;
        this.bountiesComplete=bountiesComplete;
        this.tradesComplete=tradesComplete;
        this.triviasComplete=triviasComplete;
        this.rerollsComplete=rerollsComplete;
        this.gamblesComplete=gamblesComplete;
        this.sacrifices=sacrifices;
        this.cardsCaught=cardsCaught;
        this.totalPacksBought=totalPacksBought;
        //other
        this.playerCachedEmbeds=new PlayerCachedEmbeds(this);
        //fill uniquesCache
        this.uniquesCache=new Set<number>();
        CardManager.getInstance().uniqueCards.forEach((card:Card)=>{if(this.hasCard(card)) this.uniquesCache.add(card.id);});
        this.eventListener=new EventEmitter();
        this.setupEventListener();
    }

    static fromSaveData(playerData:PlayerData) : Player{
        return new Player(
            playerData.id,
            playerData.experience,
            playerData.gold,
            playerData.claims,
            playerData.priorityClaims,
            playerData.trades,
            playerData.cardWishId,
            //Modifiers
            playerData.experienceModifier,
            playerData.luckModifier,
            playerData.goldModifier,
            playerData.protectionExpiration,
            //collection data
            playerData.top10CardsIds,
            new Map<number,number>(playerData.dryStreaks),
            new Set(playerData.achievements),
            Inventory.fromSaveData(playerData.cards),
            Inventory.fromSaveData(playerData.packs),
            Inventory.fromSaveData(playerData.packsOpened),
            //Stats
            playerData.claimsComplete,
            playerData.totalGoldEarned,
            playerData.valueableStealsPrevented,
            playerData.valueableStealsCompleted,
            playerData.bountiesComplete,
            playerData.tradesComplete,
            playerData.triviasComplete,
            playerData.rerollsComplete,
            playerData.gamblesComplete,
            playerData.sacrifices,
            playerData.cardsCaught,
            playerData.totalPacksBought);
    }

    toSaveData() : PlayerData{
        const playerData:PlayerData={
            id: this.id,
            experience:this.experience,
            gold:this.gold,
            claims:this.claims,
            priorityClaims:this.priorityClaims,
            trades:this.trades,
            cardWishId:this.cardWishId,
            //Modifiers
            experienceModifier:this.experienceModifier,
            luckModifier:this.luckModifier,
            goldModifier:this.goldModifier,
            protectionExpiration:this.protectionExpiration,
            //collection data
            top10CardsIds: this.top10CardIds,
            dryStreaks:Array.from(this.dryStreaks),
            achievements:Array.from(this.achievements),
            cards:this.cards.toSaveData(),
            packs:this.packs.toSaveData(),
            packsOpened:this.packsOpened.toSaveData(),
            claimsComplete:this.claimsComplete,
            totalGoldEarned:this.totalGoldEarned,
            valueableStealsPrevented:this.valueableStealsPrevented,
            valueableStealsCompleted:this.valueableStealsCompleted,
            bountiesComplete:this.bountiesComplete,
            tradesComplete:this.tradesComplete,
            triviasComplete:this.triviasComplete,
            rerollsComplete:this.rerollsComplete,
            gamblesComplete:this.gamblesComplete,
            sacrifices:this.sacrifices,
            cardsCaught:this.cardsCaught,
            totalPacksBought:this.totalPacksBought
        };
        return playerData;
    }

    private setupEventListener(){
        this.eventListener.on(PlayerEvents.SORT,this.onSort);
        this.eventListener.on(PlayerEvents.UPDATE_CARDS,this.onCardsUpdate);
        this.eventListener.on(PlayerEvents.UPDATE_PACKS,this.onPackUpdate);
        this.eventListener.on(PlayerEvents.UPDATE_PROFILE,this.onProfileUpdate);
        this.eventListener.on(PlayerEvents.ACHIEVMENT_UNLOCKED,this.onAchievmentUnlocked);
        this.eventListener.on(PlayerEvents.LVL_UP,this.onLvlUp);
    }

    //#################### EVENTS ####################
    onSort(player:Player){
        player.playerCachedEmbeds.setCardsInNeedOfUpdate();
    }

    onCardsUpdate(player:Player){
        player.playerCachedEmbeds.setCardsInNeedOfUpdate();
    }

    onPackUpdate(player:Player){
       player.playerCachedEmbeds.setPacksInNeedOfUpdate();
    }

    onProfileUpdate(player:Player){
        player.playerCachedEmbeds.setProfileInNeedOfUpdate();
    }

    onAchievmentUnlocked(player:Player){
        player.playerCachedEmbeds.setProfileInNeedOfUpdate();
    }

    onLvlUp(player:Player){
        player.playerCachedEmbeds.setProfileInNeedOfUpdate();
    }

    //#################### ACTIONS ####################
    stealCard(card:Card,victim:Player){
        if(victim.hasCard(card) && this.gold>=GameConstants.THIEF_PRICE){
            victim.removeCard(card);
            this.addCard(card);

            this.eventListener.emit(PlayerEvents.UPDATE_CARDS,this);
            this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
            victim.eventListener.emit(PlayerEvents.UPDATE_CARDS,victim);
            victim.eventListener.emit(PlayerEvents.UPDATE_PROFILE,victim);
            return true;
        }else{
            throw new NotEnoughGoldException();
        }
    }

    sort(type:string){
        switch(type){
            case("id"):
                this.setCards(SortingSystem.sortById(this));
                this.eventListener.emit(PlayerEvents.SORT,this);
                return true;
            case("rarity"):
            case("stars"):
                this.setCards(SortingSystem.sortByRarity(this));
                this.eventListener.emit(PlayerEvents.SORT,this);
                return true;
            case("quantity"):
            case("amount"):
                this.setCards(SortingSystem.sortByQuantity(this));
                this.eventListener.emit(PlayerEvents.SORT,this);
                return true;
            case("name"):
            case("alphabetical"):
                this.setCards(SortingSystem.sortByAlphabetical(this));
                this.eventListener.emit(PlayerEvents.SORT,this);
                return true;
            default:
                throw new NoSortException();
        }
    }

    trade(cardtoSend:Card, cardToReceive:Card, requestedPlayer:Player) : boolean{
        if(this.hasTrades() && requestedPlayer.hasTrades()){
            if(this.hasCard(cardtoSend) && requestedPlayer.hasCard(cardToReceive)){
                //remove card from player1 receive player2 card remove trade
                this.removeCard(cardtoSend);
                this.addCard(cardToReceive);
                this.removeTrade();
                this.tradesComplete++;
                this.addExperience(GameConstants.EXP_TRADE);
                //remove card from player2 receive player1 card remove trade
                requestedPlayer.removeCard(cardToReceive);
                requestedPlayer.addCard(cardtoSend);
                requestedPlayer.removeTrade();
                requestedPlayer.tradesComplete++;
                requestedPlayer.addExperience(GameConstants.EXP_TRADE);
                //send update request for cards
                this.eventListener.emit(PlayerEvents.UPDATE_CARDS,this);
                requestedPlayer.eventListener.emit(PlayerEvents.UPDATE_CARDS,requestedPlayer);
                //check for achievments
                this.checkForAchievments();
                requestedPlayer.checkForAchievments();
                return true;
            }else{
                return false;
            }
        }else{
            throw new OutOfTradesException();
        }
    }

    wish(cardName:string) : boolean{
        const card=CardManager.getInstance().getItemByName(cardName);
        if(card){
            this.cardWishId=card.id;
            this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
            return true;
        }else{
            throw new NoCardFoundException();
        }
    }

    buyPack(pack:Pack) : boolean{
        if(this.packs.totalItemsAmmount()<this.packs.capacity){
            if(this.gold>=pack.goldValue){
                this.addPack(pack);
                this.removeGold(pack.goldValue);
                this.checkForAchievments();
                return true;
            }else{
                throw new NotEnoughGoldException();
            }
        }else{
            throw new InventoryFullException();
        }
    }

    buyXPack(pack:Pack,ammount:number) : boolean{
        if(this.packs.totalItemsAmmount()<this.packs.capacity){
            const totalGoldAmmount=pack.goldValue*ammount;
            const hasEnoughGold=this.gold>=totalGoldAmmount;
            if(hasEnoughGold){
                this.addPack(pack,ammount);
                this.removeGold(totalGoldAmmount);
                this.checkForAchievments();
                return true;
            }else{
                throw new NotEnoughGoldException();
            }
        }else{
            throw new InventoryFullException();
        }
    }

    openPack(pack:Pack) : Array<Card>{
        if(this.packs.contains(pack.id)){
            this.removePack(pack);
            this.packsOpened.add(pack.id,1);
            const dryStreakForPack=this.getDryStreakOfPack(pack);
            const cards=pack.open(dryStreakForPack,this.luckModifier,this.cardWishId);
            const hasUltra=cards.filter((card:Card)=>{return Rarity.isInUltraRange(card.stars);}).length>0;
            const hasLegendary=cards.filter((card:Card)=>{return Rarity.isInLegendaryRange(card.stars);}).length>0;
            if(hasLegendary && Mathf.inRange([1,GameConstants.DRY_STREAK_THRESHOLD-1],dryStreakForPack)){
                this.setDryStreakOfPack(pack,dryStreakForPack-1);
            }
            (hasUltra || dryStreakForPack>=GameConstants.DRY_STREAK_THRESHOLD) ? this.setDryStreakOfPack(pack,0) : this.setDryStreakOfPack(pack,dryStreakForPack+1);
            this.addExperience(GameConstants.EXP_PACK);
            this.eventListener.emit(PlayerEvents.UPDATE_PACKS,this);
            this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
            this.checkForAchievments();
            return cards;
        }else{
            throw new MissingPackException();
        }
    }

    checkForAchievments() : void{
        AchievmentSystem.getInstance().updatePlayerAchievments(this);
    }

    giveCard(player:Player,card:Card){
        if(this.hasTrades() && this.hasCard(card)){
            this.removeCard(card);
            this.removeTrade();
            player.addCard(card);
            this.addExperience(GameConstants.EXP_TRADE);
            this.checkForAchievments();
            player.checkForAchievments();
            return true;
        }else{
            throw new OutOfTradesException();
        }
    }

    sacrificeFor(card:Card){
        const sacrifice=SacrificeManager.getInstance().getSacrifice(card);
        const cardToSacrifice=CardManager.getInstance().getItemById(sacrifice.preSacrificeId);
        const currentCardAmmount=this.getCards.get(sacrifice.preSacrificeId);
        if(currentCardAmmount>=sacrifice.numberRequired){
            this.addExperience(GameConstants.EXP_SACRIFICE);
            this.removeCard(cardToSacrifice,sacrifice.numberRequired);
            const rng=Mathf.randomDecimal(0,1,3);
            if(rng<=sacrifice.sacrificeChance && this.uniquesCache.size<GameConstants.MAX_UNIQUES){
                this.addCard(CardManager.getInstance().getItemById(sacrifice.postSacrificeId));
                return true;
            }else{
                return false;
            }
        }else{
            throw new SacrificeException(sacrifice.numberRequired-currentCardAmmount);
        }
    }

    //############ GETTERS ############
    hasCard(card:Card) : boolean{
        return !card.unique ? this.cards.contains(card.id) : this.uniquesCache.has(card.id);
    }

    hasPack(pack:Pack) : boolean{
        return this.cards.contains(pack.id);
    }

    hasClaims() : boolean{
        return this.claims>0;
    }

    hasPriorityClaims() : boolean{
        return this.priorityClaims>0;
    }

    hasTrades() : boolean{
        return this.trades>0;
    }

    isEmptyCards() : boolean{
        return this.cards.items.size<=0;
    }

    isEmptyPacks() : boolean{
        return this.packs.items.size<=0;
    }


    //############ SETTERS ############
    addCard(card:Card){
        if(card.unique){
            this.uniquesCache.add(card.id);
        }else{
            const newCardAmmount=this.getCards.get(card.id);
            this.playerCachedEmbeds.setCardInCollection(card,newCardAmmount);
        }
        this.cards.add(card.id, 1);
        this.cardsCaught++;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
        this.eventListener.emit(PlayerEvents.UPDATE_CARDS,this);
        this.checkForAchievments();
    }

    addGoldModifier(ammount:number){
        this.goldModifier+=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    addExperienceModifier(ammount:number){
        this.experienceModifier+=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    removeCard(card:Card,ammount=1){
        if(card.unique){
            this.uniquesCache.delete(card.id); 
        }
        this.cards.remove(card.id, ammount);
        this.playerCachedEmbeds.setCardInCollection(card, this.getCards.get(card.id) || 0);
        this.eventListener.emit(PlayerEvents.UPDATE_CARDS,this);
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    addPack(pack:Pack,ammount:number=1){
        this.packs.add(pack.id, ammount);
        this.totalPacksBought+=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PACKS,this);
        this.checkForAchievments();
    }

    addPacks(packs:Array<Pack>){
        packs.forEach((pack:Pack)=>this.packs.add(pack.id,1));
        this.eventListener.emit(PlayerEvents.UPDATE_PACKS,this);
        this.checkForAchievments();
    }

    addGold(ammount:number){
        const actualAmmount=ammount+Mathf.percentageOf(ammount,this.goldModifier+GameConstants.GLOBAL_GOLD_MODIFIER);
        this.gold+=actualAmmount;
        this.totalGoldEarned+=actualAmmount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    addExperience(exp:number){
        const preExpLevel=this.level;
        this.experience+=exp+Mathf.percentageOf(exp,this.experienceModifier+GameConstants.GLOBAL_EXP_MODIFIER);
        const hasLeveledUp=preExpLevel<this.level;
        if(hasLeveledUp){
            LevelingSystem.getInstance().rewardPlayer(this);
        }
        this.eventListener.emit(PlayerEvents.LVL_UP,this);
    }

    getDryStreakOfPack(pack:Pack) : number{
        const result=this.dryStreaks.get(pack.id);
        return isNullOrUndefined(result) ? 0 : result;
    }

    setDryStreakOfPack(pack:Pack,value:number){
        this.dryStreaks.set(pack.id,value);
    }

    removeGold(ammount:number){
        this.gold-=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    removePack(pack:Pack){
        this.packs.remove(pack.id, 1);
        this.eventListener.emit(PlayerEvents.UPDATE_PACKS,this);
    }

    removeCards(cards:Array<Card>){
        cards.forEach((card:Card)=>{
            this.cards.remove(card.id);
        });
        this.eventListener.emit(PlayerEvents.UPDATE_CARDS,this);
    }

    addRewards(){
        this.trades+=GameConstants.TRADE_RATE;
        this.claims+=GameConstants.CLAIM_RATE;
        this.addGold(GameConstants.GOLD_RATE);
    }

    addClaim(ammount:number=1){
        this.claims+=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    removeClaim(ammount:number=1){
        this.claims-=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    addPriorityClaim(ammount:number=1){
        this.priorityClaims+=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    removePriorityClaim(ammount:number=1){
        this.priorityClaims-=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    addTrade(ammount:number=1){
        this.trades+=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    removeTrade(ammount:number=1){
        this.trades-=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    addLuckModifier(ammount:number){
        this.luckModifier+=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    removeLuck(ammount:number){
        this.luckModifier-=ammount;
        this.eventListener.emit(PlayerEvents.UPDATE_PROFILE,this);
    }

    setCards(cards:Iterable<readonly [number,number]>){
        this.cards.items=new Map(cards);
    }
    
    reroll(card1:Card,card2:Card,card3:Card,trader:Trader) : Card{
        const hasCards=this.cards.contains(card1.id) && this.cards.contains(card2.id) && this.cards.contains(card3.id);
        if(hasCards){
            this.removeCard(card1);
            this.removeCard(card2);
            this.removeCard(card3);
            const cardResult:Card=trader.reRoll(card1,card2,card3);
            this.addCard(cardResult);
            return cardResult;
        }else{
            throw new Error();
        }
    }

    save(){
        return PlayerHandler.getInstance().playerAPI.save(this);
    }

    transformCard(card:Card,wanted:Card,chanceMultiplier:number=1){
        if(this.hasCard(card) && !card.unique){
            const rng=Mathf.randomDecimal(0,1,3);
            if(GameConstants.TRANSFORM_RATE*chanceMultiplier>=rng){
                this.removeCard(card);
                this.addCard(wanted);
                this.addExperience(GameConstants.EXP_SACRIFICE);
                return true;
            }else{
                this.removeCard(card);
                return false;
            }
        }else{
            throw new MissingCardException();
        }
    }

}