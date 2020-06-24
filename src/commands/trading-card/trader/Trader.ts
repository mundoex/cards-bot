import { CardManager } from "../cards/CardManager";
import { Mathf } from "../utils/Mathf";
import { Rarity } from "../drop-generation/Rarity";
import { GoldSystem } from "../systems/GoldSystem";
import { Card } from "../cards/Card";
import { PackManager } from "../packs/PackManager";
import { Pack } from "../packs/Pack";

export class Trader {
    private static readonly NEED_CAPACITY=5;
    private static readonly MULTIPLIER=6;
    needIds:Array<number>;

    constructor() {
        this.needIds=new Array<number>();
        this.fillNeedIds();
    }

    fillNeedIds(){
        const idsRange=[1,CardManager.getInstance().cards.size];
        for (let i = 0; i < Trader.NEED_CAPACITY; i++) {
            const random=Mathf.randomInt(idsRange[0],idsRange[1]);
            this.needIds.push(random);
        }
    }

    bountyPrice(stars:number){
        return GoldSystem.starsToGold(stars)*Trader.MULTIPLIER;
    }

    reRoll(card1:Card,card2:Card,card3:Card) : Card{
        const cards=[card1,card2,card3];
        const avgRarity=Math.floor(Mathf.average(cards.map((card:Card)=>{return card.rarity.rarity;})));
        const randomPackIndex=Mathf.randomInt(1,PackManager.getInstance().packs.size);
        const randomPack:Pack=PackManager.getInstance().packs.get(randomPackIndex);
        return randomPack.randomItemByRarity(Mathf.randomInt(avgRarity-1,avgRarity+1));
    }

    guessStar(){}

    forceRestock(){
        this.needIds=new Array<number>();
        this.fillNeedIds();
        console.log("Trader Restocked");
    }

    hasBounty(card:Card) : boolean{
        for(let index=0;index<this.needIds.length;index++){
            if(this.needIds[index]===card.id){
                return true;
            }
        }
        return false;
    }
}