import { CardManager } from "../cards/CardManager";
import { Mathf } from "../utils/Mathf";
import { Rarity } from "../drop-generation/Rarity";
import { GoldSystem } from "../GoldSystem";
import { Card } from "../cards/Card";

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

    reRoll(cardId1:number,cardId2:number,cardId3:number){
        const cards=CardManager.getInstance().getItemsByIds([cardId1,cardId2,cardId3]);
        const avgRarity=Rarity.averageRarity(cards.map(card=>{return card.rarity.stars}));
        return avgRarity;
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