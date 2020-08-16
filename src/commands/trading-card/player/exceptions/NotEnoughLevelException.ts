export class NoEnoughLevelException extends Error{
    constructor(){
        super("Not enough lvl");
    }
}