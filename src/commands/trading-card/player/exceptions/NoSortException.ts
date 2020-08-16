export class NoSortException extends Error{
    constructor(){
        super("Sort option doesnt exist");
    }
}