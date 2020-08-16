export class InventoryFullException extends Error{
    constructor(){
        super("Inventory full");
    }
}