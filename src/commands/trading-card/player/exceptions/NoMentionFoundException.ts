export class NoMentionFoundException extends Error{
    constructor(){
        super("Cant find that mention");
    }
}