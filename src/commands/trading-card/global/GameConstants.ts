import { Slot } from "../inventory/Slot";

export class GameConstants{
    //###### TIME ######
    public static readonly TIME_1SEC=1000;   
    public static readonly TIME_1MIN=60*GameConstants.TIME_1SEC;   
    public static readonly TIME_1H=60*GameConstants.TIME_1MIN;   
    //###### DROP RATES ######
    public static readonly DROP_RATE_ULTRA=1/300;   
    public static readonly DROP_RATE_LEGENDARY=1/150;   
    public static readonly DROP_RATE_EPIC=4/100;   
    public static readonly DROP_RATE_RARE=10/100;
    //###### WISH ######
    public static readonly WISH_RATE=10/100;
    //###### DRY STREAK ######
    public static readonly DRY_STREAK_THRESHOLD=55;
    public static readonly DRY_STREAK_PACK_AVG_VALUE=3;
    //###### EMBEDS ######
    public static readonly CARDS_PER_TABLE=30;
    public static readonly PAGINATION_TIMEOUT=60*1000;
    public static readonly CLEAN_CACHE_TIMEOUT=10*60*1000;
    //###### RARITY ######
    public static readonly RARITY_ULTRA=5;
    public static readonly RARITY_LEGENDARY=4;
    public static readonly RARITY_EPIC=3;
    public static readonly RARITY_RARE=2;
    public static readonly RARITY_COMMON=1;
    //###### STAR RANGE ######
    public static readonly ULTRA_RANGE=[10,10];
    public static readonly LEGENDARY_RANGE=[8,9];
    public static readonly EPIC_RANGE=[6,7];
    public static readonly RARE_RANGE=[4,5];
    public static readonly COMMON_RANGE=[1,3];
    //###### PACK ######
    public static readonly CARDS_PER_PACK=5;
    //###### PLAYER ######
    public static readonly GOLD_RATE=125;
    public static readonly CLAIM_RATE=3;
    public static readonly TRADE_RATE=1;
    public static readonly STARTER_GOLD=350;
    public static readonly STARTER_CLAIMS=7;
    public static readonly STARTER_TRADES=1;
    //###### SHOP ######
    public static readonly SHOP_CAPACITY=7;
    public static readonly SHOP_AVAILABLE_PACKS_IDS=[1,2,3,4,5,6];
    public static readonly SHOP_SLOTS=new Array<Slot>();
    public static readonly SHOP_PACK_AMMOUNT_RANGE=[2,5];
    public static readonly SHOP_IMAGE="https://cdn.discordapp.com/attachments/725450982539919420/726171646720868412/1992x1040_Pingo-Doce-1-1024x535.png";
    //###### TRADER ######
    public static readonly TRADER_NEED_CAPACITY=5;
    public static readonly TRADER_MULTIPLIER=5;
    public static readonly TRADER_IMAGE="";
    //###### GOLD VALUE ######
    public static readonly GOLD_10_STAR=100*10+500;
    public static readonly GOLD_9_STAR=100*9+300;
    public static readonly GOLD_8_STAR=100*8+200;
    public static readonly GOLD_7_STAR=100*7+150;
    public static readonly GOLD_6_STAR=100*6+75;
    public static readonly GOLD_5_STAR=100*5+50;
    public static readonly GOLD_4_STAR=100*4+30;
    public static readonly GOLD_3_STAR=100*3+20;
    public static readonly GOLD_2_STAR=100*2;
    public static readonly GOLD_1_STAR=100*1;
}