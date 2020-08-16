import { Rarity } from "../drop-generation/Rarity";
import { CardSaveData } from "./CardSaveData";

export class Card{
    id:number;
    name:string;
    show:string;
    imageURL:string;
    rarity:Rarity;
    unique:boolean;

    constructor(id:number, name:string, show:string, imageUrl:string, rarity:Rarity,unique:boolean){
        this.id=id;
        this.name=name;
        this.show=show;
        this.imageURL=imageUrl;
        this.rarity=rarity;
        this.unique=unique;
    }

    get stars() : number{
        return this.rarity.stars;
    }

    toString() : string{
        return this.name+"-"+this.rarity.stars;
    }

    static fromSaveData(cardSaveData:CardSaveData){
        return new Card(cardSaveData.id,cardSaveData.name,cardSaveData.show,cardSaveData.imageURL,new Rarity(cardSaveData.stars),cardSaveData.unique);
    }
}