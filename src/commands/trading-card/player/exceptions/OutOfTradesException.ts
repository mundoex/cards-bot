export class OutOfTradesException extends Error{
    constructor(){
        super("Player doesnt have enough trades");
    }
}