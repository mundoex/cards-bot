export class UniqueAlreadyOwnerException extends Error{
    constructor(){
        super("Unique card already owned");
    }
}