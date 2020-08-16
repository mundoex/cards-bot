export class NotEnoughGoldException extends Error{
    constructor(){
        super("Not enough gold");
    }
}