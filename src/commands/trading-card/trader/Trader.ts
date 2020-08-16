import { CardManager } from "../cards/CardManager";
import { Mathf } from "../utils/Mathf";
import { GoldSystem } from "../systems/gold/GoldSystem";
import { Card } from "../cards/Card";
import { PackManager } from "../packs/PackManager";
import { Pack } from "../packs/Pack";
import { Player } from "../player/Player";
import { GameConstants } from "../global/GameConstants";
import { Broadcaster } from "../broadcaster/Broadcaster";

export class Trader {
    needIds:Set<number>;
    needCapacity:number;
    message:string;
    constructor(message:string,needCapacity:number=GameConstants.TRADER_NEED_CAPACITY) {
        this.needIds=new Set<number>();
        this.message=message;
        this.needCapacity=needCapacity;
        this.fillNeedIds();
    }

    fillNeedIds(){
        for (let i = 0; i < this.needCapacity; i++) {
            const packsRange=[1,PackManager.getInstance().packs.size];
            const rngPack:Pack=PackManager.getInstance().getItemById(Mathf.randomInt(packsRange[0],packsRange[1]));
            const rngCardPosition=Mathf.randomInt(0,rngPack.possibleItemsIds.length-1);
            const cardId=rngPack.possibleItemsIds[rngCardPosition];
            this.needIds.add(cardId);
        }
    }

    bountyPrice(stars:number){
        return GoldSystem.starsToGold(stars)*GameConstants.TRADER_MULTIPLIER;
    }

    isEmpty(){
        return this.needIds.size<=0;
    }

    reRoll(card1:Card,card2:Card,card3:Card) : Card{
        const cards=[card1,card2,card3];
        const avgRarity=Math.floor(Mathf.average(cards.map((card:Card)=>{return card.rarity.rarity;})));
        const randomPackIndex=Mathf.randomInt(1,PackManager.getInstance().packs.size);
        const randomPack:Pack=PackManager.getInstance().packs.get(randomPackIndex);
        return randomPack.randomItemByRarity(Mathf.randomInt(avgRarity-1,avgRarity+1));
    }

    guessStar(){}

    removeBounty(card:Card){
        this.needIds.delete(card.id);
    }

    forceRestock(){
        this.needIds=new Set<number>();
        this.fillNeedIds();
        Broadcaster.getInstance().broadcast(this.message);
    }

    buyBounty(player:Player,card:Card){
        if(player.hasCard(card) && this.hasBounty(card)){
            player.removeCard(card);
            player.addGold(this.bountyPrice(card.stars));
            this.removeBounty(card);
            if(this.isEmpty()){
                this.forceRestock();
            }
            player.addExperience(GameConstants.EXP_BOUNTY);
            return true;
        }else{
            return false;
        }
    }

    hasBounty(card:Card) : boolean{
        return this.needIds.has(card.id);
    }
}