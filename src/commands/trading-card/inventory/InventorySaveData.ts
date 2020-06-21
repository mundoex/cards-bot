import { Slot } from "./Slot";

export class InventorySaveData{
    capacity:number;
    slots:Array<Slot>;
    constructor(capacity:number,slots:Array<Slot>){
        this.capacity=capacity;
        this.slots=slots;
    }
}