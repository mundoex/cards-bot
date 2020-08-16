export class Sacrifice{
    preSacrificeId:number;
    postSacrificeId:number;
    numberRequired:number;
    sacrificeChance:number;

    constructor(sacrificeData:[number,number,number,number]){
        this.preSacrificeId=sacrificeData[0];
        this.postSacrificeId=sacrificeData[1];
        this.numberRequired=sacrificeData[2];
        this.sacrificeChance=sacrificeData[3];
    }
}