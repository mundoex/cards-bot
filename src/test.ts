import { Mathf } from "./commands/trading-card/utils/Mathf";
import { PlayerHandler } from "./commands/trading-card/player/PlayerHandler";
import { SortingSystem } from "./commands/trading-card/systems/sorting/SortingSystem";
import { CardManager } from "./commands/trading-card/cards/CardManager";
import { Arrayf } from "./commands/trading-card/utils/Arrayf";


import { writeFileSync, readFileSync } from "fs";

import { Slot } from "./commands/trading-card/inventory/Slot";
import { InventorySaveData } from "./commands/trading-card/inventory/InventorySaveData";
import { sequelize } from "./commands/trading-card/database/player-apis/sequelize-api/SequelizeManager";
import { PlayerData } from "./commands/trading-card/database/player-apis/common/PlayerData";
import { PlayerModel } from "./commands/trading-card/database/player-apis/sequelize-api/PlayerModel";
import { SequelizePlayerAPI } from "./commands/trading-card/database/player-apis/sequelize-api/SequelizePlayerAPI";
import { Card } from "./commands/trading-card/cards/Card";
import { GameConstants } from "./commands/trading-card/global/GameConstants";
import { join } from "path";
import {getId,getName,all} from "pokemon";
import { Stringf } from "./commands/trading-card/utils/Stringf";
import { Json } from "sequelize/types/lib/utils";
import { Paths } from "./commands/trading-card/utils/Paths";
import { Sacrifice } from "./commands/trading-card/sacrifices/Sacrifice";
import { SacrificeManager } from "./commands/trading-card/sacrifices/SacrificesManager";
import { CardSaveData } from "./commands/trading-card/cards/CardSaveData";
import { CollectionPositon } from "./commands/trading-card/player/CollectionPosition";
import { Broadcaster } from "./commands/trading-card/broadcaster/Broadcaster";
import { JSONPlayerAPI } from "./commands/trading-card/database/player-apis/json-api/JSONPlayerAPI";
import { Player } from "./commands/trading-card/player/Player";
import { PlayerEvents } from "./commands/trading-card/player/PlayerEvents";



class Pokemon{
    id:number;
    name:string;
    show:string;
    imageURL:string;
    stars:number;
    unique:boolean;
    constructor(id:number,name:string,show:string,imageURL:string,stars:number,unique:boolean){
        this.id=id;
        this.name=name;
        this.show=show;
        this.imageURL=imageURL;
        this.stars=stars;
        this.unique=unique;
    }
}

// const START=650;
// const END=721;  //forms

// // var arr=[];
// //     for (let index = START; index < END+1; index++) {
// //         const name=getName(index);
// //         const url=`https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg`;
// //         arr.push(new Pokemon(index+7,getName(index),"Pokémon",url,1));
// //     }
// // writeFileSync(process.cwd()+"/qwe.txt",JSON.stringify(arr));
// //494-656
// let arr=[];
// for (let index = 657; index < 758; index++) {
//     arr.push(index);
// }

// var playerData:PlayerData={
//   id:"123123123",
//   experience:1,
//   gold:1,
//   claims:1,
//   priorityClaims:1,
//   trades:1,
//   cardWishId:1,
//   //Modifiers
//   experienceModifier:1,
//   luckModifier:1,
//   goldModifier:1,
//   protectionExpiration:0,
//   //collection data
//   top10CardsIds:[],
//   dryStreaks:[new Slot(1,2)],
//   achievements:[1],
//   cards:new InventorySaveData(20,[new Slot(1,2)]),
//   packs:new InventorySaveData(20,[new Slot(1,2)]),
//   //Stats
//   claimsComplete:1,
//   totalGoldEarned:1,
//   valueableStealsPrevented:1,
//   valueableStealsCompleted:1,
//   bountiesComplete:1,
//   tradesComplete:1,
//   triviasComplete:1,
//   rerollsComplete:1,
//   gamblesComplete:1,
//   packsOpened:[new Slot(1,2)]
// }
// PlayerModel.sync().then((kk:any)=>{
//     var p=PlayerModel.build(playerData);
//   p.save();
//   PlayerModel.findByPk("123123123").then((res:PlayerModelData)=>{
//    console.log(res);
//   });
// });
// var p=PlayerModel.build(playerData);
// p.save();
// PlayerModel.findByPk("123123123").then((res:PlayerData)=>{
//      console.log(res);
//     });

//     PlayerHandler.getInstance().init(new SequelizePlayerAPI());
// const OUT_FILE=join(process.cwd(),"out2.json");

// const PKM_LENGTH=all().length;
// var outArr=new Array<[number,string,string,string,number,boolean]>();
// for (let index = 1; index < PKM_LENGTH; index++) {
//   const pkmName=getName(index);
//   let pkm;
//   const card=CardManager.getInstance().getItemByName(Stringf.upperCaseFirstChars(pkmName));
//   if(card){
//     pkm=new Pokemon(index,pkmName,"Pokémon",card.imageURL,card.stars,false);
//   }else{
//     pkm=new Pokemon(index,pkmName,"Pokémon",`https://img.pokemondb.net/artwork/${pkmName.toLowerCase()}.jpg`,0,false);
//   }
//   outArr.push([pkm.id,pkm.name,pkm.show,pkm.imageURL,pkm.stars,pkm.unique]);
// }
// writeFileSync(OUT_FILE,JSON.stringify(outArr));
//CardManager.getInstance().cards.forEach((card:Card)=>console.log(card.name));

// const file=readFileSync(join(Paths.SACRIFICES_FOLDER_PATH)).toString();
// var sacrifices:Array<Sacrifice>=JSON.parse(file);
// var data=sacrifices.map(sac=>[sac.preSacrificeId,sac.postSacrificeId,sac.numberRequired,sac.sacrificeChance]);
// writeFileSync(join(process.cwd(),"newsac.json"),JSON.stringify(data));
// const file=readFileSync(join(process.cwd(),"8.json")).toString();
// const size=810;
// const resultData=JSON.parse(file).map((cardData:[number,string,string,string,number,boolean],i:number)=>{
//     const image=`https://img.pokemondb.net/artwork/${cardData[1].toLowerCase()}.jpg`
//     return [size+i,cardData[1],cardData[2],image,cardData[4],cardData[5]];
// });
// writeFileSync(process.cwd()+"/kool.json",JSON.stringify(resultData));
// var positionsObject:any={};
// const cards=CardManager.getInstance().cards.values();
//     let rows=new Array();
//     for(const card of cards){
//         rows.push([card.id,card.name,"O"]);
//         const currentSize=rows.length;
//         const page=Math.floor((currentSize-1)/GameConstants.CARDS_PER_TABLE)+1;
//         const index=(currentSize-1)-((page-1)*GameConstants.CARDS_PER_TABLE);
//         positionsObject[card.id]=new CollectionPositon(page,index);
//     }
// console.log(positionsObject[486]);
