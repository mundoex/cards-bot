export class CardSaveData{
    id:number;
    name:string;
    show:string;
    imageURL:string;
    stars:number;
    unique:boolean;

    constructor(cardData:[number,string,string,string,number,boolean]){
        this.id=cardData[0];
        this.name=cardData[1];
        this.show=cardData[2];
        this.imageURL=cardData[3];
        this.stars=cardData[4];
        this.unique=cardData[5];
    }
}