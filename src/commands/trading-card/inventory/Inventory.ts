import { ItemContainer } from "./ItemContainer";
import { InventorySaveData } from "./InventorySaveData";
import { ISaveable } from "../structure/ISaveable";
import { Slot } from "./Slot";
export class Inventory extends ItemContainer<number> implements ISaveable<InventorySaveData>{

    constructor(capacity:number,slots:Array<Slot>){
        super(capacity);
        slots.forEach((slot:Slot)=>this.items.set(slot.itemId,slot.ammount));
    }

    static fromSaveData(inventorySaveData:InventorySaveData) : Inventory{
        return new Inventory(inventorySaveData.capacity,inventorySaveData.slots);
    }

    //@Override
    // full() : boolean{
    //     return this.totalItemsAmmount()>=this.capacity;
    // }

    toSaveData() : InventorySaveData{
        let slotsArray=new Array<Slot>();
        for (let [key, value] of this.items){
            slotsArray.push(new Slot(key, value));
        }
        return new InventorySaveData(this.capacity, slotsArray);
    }
}