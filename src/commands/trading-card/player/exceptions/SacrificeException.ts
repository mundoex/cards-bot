export class SacrificeException extends Error{
    constructor(missingAmmount:number){
        super(`Missing ${missingAmmount} cards.`);
    }
}