export class NoPackFoundException extends Error{
    constructor(){
        super("Pack not found");
    }
}