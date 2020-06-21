export class PackSaveData{
    id:number;
    name:string;
    stars:number;
    possibleItemsIds:Array<number>;

    constructor(id:number,name:string,stars:number,possibleItemsIds:Array<number>){
        this.id=id;
        this.name=name;
        this.stars=stars;
        this.possibleItemsIds=possibleItemsIds;
    }
}