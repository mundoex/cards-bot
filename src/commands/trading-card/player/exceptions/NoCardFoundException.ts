export class NoCardFoundException extends Error{
    constructor(){
        super("Card not found");
    }
}