export class NoPlayerFoundException extends Error{
    constructor(){
        super("Cant find that player");
    }
}