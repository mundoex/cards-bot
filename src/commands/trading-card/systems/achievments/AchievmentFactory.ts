import { Achievment } from "./Achievment";
import { Player } from "../../player/Player";
import { PackManager } from "../../packs/PackManager";
import { CardManager } from "../../cards/CardManager";
import { Card } from "../../cards/Card";
//########################GENERAL FUNCTIONS########################
function genericVerifyGen(gen:number,player:Player){
    const ids=PackManager.getInstance().packs.get(gen).possibleItemsIds
    for (let i=0;i<ids.length;i++) {
        if(!player.getCards.has(ids[i])){
            return false;
        }
    }
    return true;
}

function genericHasCards(cardNames:Array<string>,player:Player){
    const cards=cardNames.map((name:string)=>{
        return CardManager.getInstance().getItemByName(name);
    });
    return cards.map((card:Card)=>player.hasCard(card)).reduce((sumHasCards:boolean,hasCard:boolean)=>sumHasCards && hasCard);
}

function genericLvlCheck(level:number,player:Player){
    return player.level>=level;
}

//########################ACHIEVEMENT FUNCTIONS########################
function gen1Verify(player:Player) : boolean{
    return genericVerifyGen(1,player);
}

function gen1Reward(player:Player) : void{
    player.addLuckModifier(10);
}

function gen2Verify(player:Player) : boolean{
    return genericVerifyGen(2,player);
}

function gen2Reward(player:Player) : void{
    player.addLuckModifier(10);
}

function gen3Verify(player:Player) : boolean{
    return genericVerifyGen(3,player);
}

function gen3Reward(player:Player) : void{
    player.addLuckModifier(10);
}

function gen4Verify(player:Player) : boolean{
    return genericVerifyGen(4,player);
}

function gen4Reward(player:Player) : void{
    player.addLuckModifier(10);
}

function gen5Verify(player:Player) : boolean{
    return genericVerifyGen(5,player);
}

function gen5Reward(player:Player) : void{
    player.addLuckModifier(10);
}

function gen6Verify(player:Player) : boolean{
    return genericVerifyGen(6,player);
}

function gen6Reward(player:Player) : void{
    player.addLuckModifier(5);
}

function gen7Verify(player:Player) : boolean{
    return genericVerifyGen(7,player);
}

function gen7Reward(player:Player) : void{
    player.addLuckModifier(10);
}

function gen8Verify(player:Player) : boolean{
    return genericVerifyGen(8,player);
}

function gen8Reward(player:Player) : void{
    player.addLuckModifier(10);
}

function bidoofVerify(player:Player) : boolean{
    const bidoof=CardManager.getInstance().getItemByName("Bidoof");
    return player.hasCard(bidoof) && player.getCards.get(bidoof.id)>=69;
}

function bidoofReward(player:Player) : void{
    player.addExperienceModifier(2);
}

function firstUniqueVerify(player:Player) : boolean{
    return player.getUniquesCache.size>0;
}

function firstUniqueReward(player:Player) : void{
    player.addExperienceModifier(2);
}

function jackedVerify(player:Player) : boolean{
    const cardsNames=["Machoke","Machamp","Buzzwole","Incineroar","Poliwrath","Urshifu Single"];
    return genericHasCards(cardsNames,player);
}

function jackedReward(player:Player) : void{
    player.addGoldModifier(2);
}

function mundoExTeamVerify(player:Player) : boolean{
    const cardsNames=["Garchomp","Luxray","Umbreon","Espeon","Dragonite","Meganium"];
    return genericHasCards(cardsNames,player);
}

function mundoExTeamReward(player:Player) : void{
    player.addExperienceModifier(2);
}

function noobishTeamVerify(player:Player) : boolean{
    const cardsNames=["Dracovish","Weavile","Scrafty","Clefable","Lurantis","Florges"];
    return genericHasCards(cardsNames,player);
}

function noobishTeamReward(player:Player) : void{
    player.addExperienceModifier(2);
}

function cerqueTeamVerify(player:Player) : boolean{
    const cardsNames=["Ampharos","Empoleon","Flygon","Shuckle","Froslass","Darmanitan"];
    return genericHasCards(cardsNames,player);
}

function cerqueTeamReward(player:Player) : void{
    player.addGoldModifier(2);
}

function davidTeamVerify(player:Player) : boolean{
    const cardsNames=["Weavile","Gengar","Absol","Typhlosion","Slaking","Kecleon"];
    return genericHasCards(cardsNames,player);
}

function davidTeamReward(player:Player) : void{
    player.addLuckModifier(2);
}

function laranjeiraTeamVerify(player:Player) : boolean{
    const cardsNames=["Blaziken","Metagross","Empoleon","Zoroark","Clawitzer","Lucario"];
    return genericHasCards(cardsNames,player);
}

function laranjeiraTeamReward(player:Player) : void{
    player.addGoldModifier(2);
}

function figurinhaTeamVerify(player:Player) : boolean{
    const cardsNames=["Slowking","Decidueye","Ambipom","Poliwrath","Metagross","Dugtrio"];
    return genericHasCards(cardsNames,player);
}

function figurinhaTeamReward(player:Player) : void{
    player.addLuckModifier(2);
}

function cynthiaTeamVerify(player:Player) : boolean{
    const cardsNames=["Spiritomb","Roserade","Togekiss","Lucario","Milotic","Garchomp"];
    return genericHasCards(cardsNames,player);
}

function cynthiaTeamReward(player:Player) : void{
    player.addExperienceModifier(2);
}

function rotomVerify(player:Player) : boolean{
    const cardsNames=["Rotom","Heat Rotom","Wash Rotom","Frost Rotom","Fan Rotom","Mow Rotom"];
    return genericHasCards(cardsNames,player);
}

function rotomTeamReward(player:Player) : void{
    player.addGoldModifier(2);
}

function level5Verify(player:Player) : boolean{
    return genericLvlCheck(5,player);
}

function level5Reward(player:Player) : void{
    player.addExperienceModifier(2);
}

function level10Verify(player:Player) : boolean{
    return genericLvlCheck(10,player);
}

function level10Reward(player:Player) : void{
    player.addExperienceModifier(2);
}

function level15Verify(player:Player) : boolean{
    return genericLvlCheck(15,player);
}

function level15Reward(player:Player) : void{
    player.addExperienceModifier(2);
}

function earned100KVerify(player:Player) : boolean{
    return player.getTotalGoldEarned>=100000;
}

function earned100KReward(player:Player) : void{
    player.addGoldModifier(2);
}

function earned250KVerify(player:Player) : boolean{
    return player.getTotalGoldEarned>=250000;
}

function earned250KReward(player:Player) : void{
    player.addGoldModifier(2);
}

function earned500KVerify(player:Player) : boolean{
    return player.getTotalGoldEarned>=500000;
}

function earned500KReward(player:Player) : void{
    player.addGoldModifier(3);
}

function earned1MVerify(player:Player) : boolean{
    return player.getTotalGoldEarned>=1000000;
}

function earned1MReward(player:Player) : void{
    player.addGoldModifier(5);
}

function totalPackOpen100Verify(player:Player) : boolean{
    return player.getPacksOpened.totalItemsAmmount()>=100;
}

function totalPackOpen100Reward(player:Player) : void{
    player.addLuckModifier(2);
}

function totalPackOpen250Verify(player:Player) : boolean{
    return player.getPacksOpened.totalItemsAmmount()>=250;
}

function totalPackOpen250Reward(player:Player) : void{
    player.addLuckModifier(2);
}

function totalPackOpen500Verify(player:Player) : boolean{
    return player.getPacksOpened.totalItemsAmmount()>=500;
}

function totalPackOpen500Reward(player:Player) : void{
    player.addLuckModifier(3);
}

function totalPackOpen1000Verify(player:Player) : boolean{
    return player.getPacksOpened.totalItemsAmmount()>=1000;
}

function totalPackOpen1000Reward(player:Player) : void{
    player.addLuckModifier(3);
}

function rattataVerify(player:Player) : boolean{
    const rattata=CardManager.getInstance().getItemByName("Rattata");
    return player.hasCard(rattata) && player.getCards.get(rattata.id)>=96;
}

function rattataReward(player:Player) : void{
    player.addLuckModifier(3);
    player.addGoldModifier(3);
    player.addExperienceModifier(3);
}

function youAreADragonVerify(player:Player) : boolean{
    const cardNames=["Pidgey","Pidgeotto","Pidgeot"];
    return genericHasCards(cardNames,player);
}

function youAreADragonReward(player:Player) : void{
    player.addExperienceModifier(2);
}

function get5UltrasVerify(player:Player) : boolean{
    return player.ultrasTotal>=5;
}

function get5UltrasReward(player:Player) : void{
    player.addLuckModifier(2);
}

function get50UltrasVerify(player:Player) : boolean{
    return player.ultrasTotal>=50;
}

function get50UltrasReward(player:Player) : void{
    player.addLuckModifier(4);
}

function eeveesVerify(player:Player) : boolean{
    const cardNames=["Eevee","Jolteon","Vaporeon","Flareon","Umbreon","Espeon","Glaceon","Leafeon","Sylveon"];
    return genericHasCards(cardNames,player);
}

function eeveesReward(player:Player) : void{
    player.addLuckModifier(5);
}

function redTeamVerify(player:Player) : boolean{
    const cardNames=["Pikachu","Espeon","Snorlax","Venusaur","Charizard","Blastoise"];
    return genericHasCards(cardNames,player);
}

function redTeamReward(player:Player) : void{
    player.addGoldModifier(2);
}

function ashTeamVerify(player:Player) : boolean{
    const cardNames=["Pikachu","Rowlet","Lycanroc Dusk","Incineroar","Naganadel","Melmetal"];
    return genericHasCards(cardNames,player);
}

function ashTeamReward(player:Player) : void{
    player.addGoldModifier(3);
}

function guzmaTeamVerify(player:Player) : boolean{
    const cardNames=["Golisopod","Ariados","Masquerain","Pinsir","Scizor"];
    return genericHasCards(cardNames,player);
}

function guzmaTeamReward(player:Player) : void{
    player.addGoldModifier(2);
}

function archeologistTeamVerify(player:Player) : boolean{
    const cardNames=[
    "Kabuto","Omanyte","Omastar","Kabutops","Aerodactyl",
    "Anorith","Lileep","Cradily","Armaldo","Relicanth",
    "Shieldon","Cranidos","Bastiodon","Rampardos",
    "Tirtouga","Archen","Carracosta","Archeops",
    "Tyrunt","Amaura","Tyrantrum","Aurorus",
    "Dracozolt","Arctozolt","Dracovish","Arctovish"
];
    return genericHasCards(cardNames,player);
}

function archeologistTeamReward(player:Player) : void{
    player.addExperienceModifier(5);
    player.addGoldModifier(2);
    player.addLuckModifier(2);
}

export class AchievmentFactory{
    
    static readonly ACHIEVMENTS:Array<Achievment>=
    [
        new Achievment(1,"Gen 1 Completion","1️⃣","Get all Pokémon Gen 1 cards","+10% Luck",gen1Verify,gen1Reward),
        new Achievment(2,"Gen 2 Completion","2️⃣","Get all Pokémon Gen 2 cards","+10% Luck",gen2Verify,gen2Reward),
        new Achievment(3,"Gen 3 Completion","3️⃣","Get all Pokémon Gen 3 cards","+10% Luck",gen3Verify,gen3Reward),
        new Achievment(4,"Gen 4 Completion","4️⃣","Get all Pokémon Gen 4 cards","+10 Luck",gen4Verify,gen4Reward),
        new Achievment(5,"Gen 5 Completion","5️⃣","Get all Pokémon Gen 5 cards","+10% Luck",gen5Verify,gen5Reward),
        new Achievment(6,"Gen 6 Completion","6️⃣","Get all Pokémon Gen 6 cards","+5% Luck",gen6Verify,gen6Reward),
        new Achievment(7,"Gen 7 Completion","7️⃣","Get all Pokémon Gen 7 cards","+10% Luck",gen7Verify,gen7Reward),
        new Achievment(8,"Gen 8 Completion","8️⃣","Get all Pokémon Gen 8 cards","+10% Luck",gen8Verify,gen8Reward),
        new Achievment(9,"Bidoof Master","🦡","Get 69 Bidoof","+2% Exp",bidoofVerify,bidoofReward),
        new Achievment(10,"First Unique","🖕","Get your first unique","+2% Exp",firstUniqueVerify,firstUniqueReward),
        new Achievment(11,"Jacked of all Trades","💪","Get Machoke, Machamp, Buzzwole, Incineroar, Poliwrath, Urshifu","+2% Gold",jackedVerify,jackedReward),
        new Achievment(12,"Mundo Ex Team","👑","Get Garchomp, Luxray, Umbreon, Espeon, Dragonite, Meganium","+2% Exp",mundoExTeamVerify,mundoExTeamReward),
        new Achievment(13,"NoobishNerd Team","🐨","Get Dracovish, Weavile, Scrafty, Clefable, Lurantis, Florges","+2% Exp",noobishTeamVerify,noobishTeamReward),
        new Achievment(14,"Cerque Team","🌹","Get Ampharos, Empoleon, Flygon, Shuckle, Froslass, Darmanitan","2% Gold",cerqueTeamVerify,cerqueTeamReward),
        new Achievment(15,"David Team","🃏","Get Weavile, Gengar, Absol, Typhlosion, Slaking, Kecleon","2% Luck",davidTeamVerify,davidTeamReward),
        new Achievment(16,"Laranjas Team","🚸","Get Blaziken, Metagross, Empoleon, Zoroark, Clawitzer, Lucario","2% Gold",laranjeiraTeamVerify,laranjeiraTeamReward),
        new Achievment(17,"Figurinha Team","♿","Get Slowking, Decidueye, Ambipom, Poliwrath, Metagross, Dugtrio","2% Luck",figurinhaTeamVerify,figurinhaTeamReward),
        new Achievment(18,"Cynthia Team","♕","Get Spiritomb, Roserade, Togekiss, Lucario, Milotic, Garchomp","2% Exp",cynthiaTeamVerify,cynthiaTeamReward),
        new Achievment(19,"Rotom Machines","⚡","Get all Rotoms","2% Gold",rotomVerify,rotomTeamReward),
        new Achievment(20,"Level 5","✏️","Get Level 5","2% Exp",level5Verify,level5Reward),
        new Achievment(21,"Level 10","📓","Get Level 10","2% Exp",level10Verify,level10Reward),
        new Achievment(22,"Level 15","🎓","Get Level 15","2% Exp + Trader2 & Shop2",level15Verify,level15Reward),
        new Achievment(23,"100K","🤑","Total gold earned 100K reached","2% Gold",earned100KVerify,earned100KReward),
        new Achievment(24,"500K","💲","Total gold earned 500K reached","3% Gold",earned500KVerify,earned500KReward),
        new Achievment(25,"1M","💰","Total gold earned 1M reached","5% Gold",earned1MVerify,earned1MReward),
        new Achievment(26,"100 Packs","🎀","Open total 100 packs","2% Luck",totalPackOpen100Verify,totalPackOpen100Reward),
        new Achievment(27,"250 Packs","🎁","Open total 250 packs","2% Luck",totalPackOpen250Verify,totalPackOpen250Reward),
        new Achievment(28,"500 Packs","🛍️","Open total 500 packs","3% Luck",totalPackOpen500Verify,totalPackOpen500Reward),
        new Achievment(29,"1000 Packs","📦","Open total 1000 packs","3% Luck",totalPackOpen1000Verify,totalPackOpen1000Reward),
        new Achievment(30,"Top %","🐀","Get 96 Rattatas","3% Gold,Luck & Exp",rattataVerify,rattataReward),
        new Achievment(31,"You are a Dragon","🐉","Get Pidgey, Pidgeotto, Pidgeot","2% Exp",youAreADragonVerify,youAreADragonReward),
        new Achievment(32,"5 Ultra","🍆","Get 5 Ultras","2% Luck",get5UltrasVerify,get5UltrasReward),
        new Achievment(33,"Eeveelutions","🐈","Get Eevee & all Eevee evolutions","5% Luck",eeveesVerify,eeveesReward),
        new Achievment(34,"Red Team","🟥","Get Pikachu, Espeon, Snorlax, Venusaur, Charizard, Blastoise","2% Gold",redTeamVerify,redTeamReward),
        new Achievment(35,"Ash Winning Team","⛹🏻","Get Pikachu, Rowlet, Lycanroc Dusk, Incineroar, Naganadel, Melmetal","3% Gold",ashTeamVerify,ashTeamReward),
        new Achievment(36,"Guzma Team","☠️","Get Golisopod, Ariados, Masquerain, Pinsir, Scizor","2% Gold",guzmaTeamVerify,guzmaTeamReward),
        new Achievment(37,"250K","💹","Total gold earned 250K reached","2% Gold",earned250KVerify,earned250KReward),
        new Achievment(38,"50 Ultra","🍌","Get 50 Ultras","4% Luck",get50UltrasVerify,get50UltrasReward),
        new Achievment(39,"Archeologist","🤠","Get "+["Kabuto","Omanyte","Omastar","Kabutops","Aerodactyl","Anorith","Lileep","Cradily","Armaldo","Relicanth","Shieldon","Cranidos","Bastiodon","Rampardos","Tirtouga","Archen","Carracosta","Archeops","Tyrunt","Amaura","Tyrantrum","Aurorus","Dracozolt","Arctozolt","Dracovish","Arctovish"].join(","),"5% Exp, 2% Gold, Luck",archeologistTeamVerify,archeologistTeamReward),
    ];
}