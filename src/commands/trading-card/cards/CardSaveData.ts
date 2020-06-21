export class CardSaveData{
    id:number;
    name:string;
    show:string;
    imageURL:string;
    stars:number;

    constructor(id:number, name:string, show:string, imageURL:string, stars:number){
        this.id=id;
        this.name=name;
        this.show=show;
        this.imageURL=imageURL;
        this.stars=stars;
    }
}