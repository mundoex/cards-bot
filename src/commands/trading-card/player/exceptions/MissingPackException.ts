export class MissingPackException extends Error{
    constructor(){
        super("Player doesnt have pack");
    }
}