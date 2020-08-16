export class MissingCardException extends Error{
    constructor(){
        super("Player doesnt have card");
    }
}