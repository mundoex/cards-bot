export class NotEnoughStockException extends Error{
    constructor(){
        super("not enough stock");
    }
}