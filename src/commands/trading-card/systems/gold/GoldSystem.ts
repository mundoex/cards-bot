import { GameConstants } from "../../global/GameConstants";

export class GoldSystem{
    static starsToGold(stars:number) : number{
        switch(stars){
            case(10):   return GameConstants.GOLD_10_STAR;
            case(9):    return GameConstants.GOLD_9_STAR;
            case(8):    return GameConstants.GOLD_8_STAR;
            case(7):    return GameConstants.GOLD_7_STAR;
            case(6):    return GameConstants.GOLD_6_STAR;
            case(5):    return GameConstants.GOLD_5_STAR;
            case(4):    return GameConstants.GOLD_4_STAR;
            case(3):    return GameConstants.GOLD_3_STAR;
            case(2):    return GameConstants.GOLD_2_STAR;
            case(1):    return GameConstants.GOLD_1_STAR;
            default:    return GameConstants.GOLD_1_STAR;

        }
    }
}