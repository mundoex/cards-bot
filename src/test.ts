import { Mathf } from "./commands/trading-card/utils/Mathf";
import { PlayerHandler } from "./commands/trading-card/player/PlayerHandler";
import { SortingSystem } from "./commands/trading-card/systems/sorting/SortingSystem";
import { CardManager } from "./commands/trading-card/cards/CardManager";
import { Arrayf } from "./commands/trading-card/utils/Arrayf";
import { PlayerEmbeds } from "./commands/trading-card/player/PlayerEmbeds";
import {getId,getName} from "pokemon";
import { writeFileSync } from "fs";



class Pokemon{
    id:number;
    name:string;
    show:string;
    imageURL:string;
    stars:number;
    constructor(id:number,name:string,show:string,imageURL:string,stars:number){
        this.id=id;
        this.name=name;
        this.show=show;
        this.imageURL=imageURL;
        this.stars=stars;
    }
}

const START=650;
const END=721;  //forms

// var arr=[];
//     for (let index = START; index < END+1; index++) {
//         const name=getName(index);
//         const url=`https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg`;
//         arr.push(new Pokemon(index+7,getName(index),"Pokémon",url,1));
//     }
// writeFileSync(process.cwd()+"/qwe.txt",JSON.stringify(arr));
//494-656
let arr=[];
for (let index = 657; index < 758; index++) {
    arr.push(index);
}
console.log(arr.join(","));

