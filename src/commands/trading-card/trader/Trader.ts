import { CardManager } from "../cards/CardManager";
import { Mathf } from "../utils/Mathf";
import { Rarity } from "../drop-generation/Rarity";
import { GoldSystem } from "../systems/gold/GoldSystem";
import { Card } from "../cards/Card";
import { PackManager } from "../packs/PackManager";
import { Pack } from "../packs/Pack";
import { Player } from "../player/Player";
import { GameConstants } from "../global/GameConstants";

export class Trader {
    needIds:Set<number>;

    constructor() {
        this.needIds=new Set<number>();
        this.fillNeedIds();
    }

    fillNeedIds(){
        const idsRange=[1,CardManager.getInstance().cards.size];
        for (let i = 0; i < GameConstants.TRADER_NEED_CAPACITY; i++) {
            const random=Mathf.randomInt(idsRange[0],idsRange[1]);
            this.needIds.add(random);
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
        console.log("Trader Restocked");
    }

    buyBounty(player:Player,card:Card){
        if(player.hasCard(card) && this.hasBounty(card)){
            player.removeCard(card);
            player.addGold(this.bountyPrice(card.stars));
            this.removeBounty(card);
            if(this.isEmpty()){
                this.forceRestock();
            }
            return true;
        }else{
            return false;
        }
    }

    hasBounty(card:Card) : boolean{
        return this.needIds.has(card.id);
    }
}