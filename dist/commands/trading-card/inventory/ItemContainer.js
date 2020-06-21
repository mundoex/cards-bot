"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemContainer {
    constructor(capacity) {
        this.capacity = capacity;
        this.items = new Map();
    }
    full() {
        return this.items.size === this.capacity;
    }
    empty() {
        return this.items.size === 0;
    }
    contains(t) {
        return this.items.has(t);
    }
    setAmmount(t, ammount) {
        const newAmmount = this.items.get(t) + ammount;
        this.items.set(t, newAmmount);
    }
    add(t, ammount = 1) {
        if (this.contains(t)) { //if already exists stack it
            this.setAmmount(t, ammount);
        }
        else { //if doesnt exsists check for capacity
            if (!this.full()) { //if not full add
                this.items.set(t, ammount);
            }
        }
    }
    remove(t, ammount = 1) {
        if (this.contains(t)) {
            if (this.items.get(t) === ammount) {
                this.items.delete(t);
            }
            else {
                this.setAmmount(t, -ammount);
            }
        }
    }
    clear() {
        for (const key of this.items.keys()) {
            this.items.delete(key);
        }
    }
}
exports.ItemContainer = ItemContainer;
