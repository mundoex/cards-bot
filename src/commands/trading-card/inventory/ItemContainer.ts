export abstract class ItemContainer<T>{
    capacity:number;
    items:Map<T, number>;

    constructor(capacity:number){
        this.capacity=capacity;
        this.items=new Map<T,number>();
    }

    full(): boolean {
        return this.items.size===this.capacity;
    }

    empty(): boolean {
        return this.items.size===0;
    }

    contains(t:T):boolean{
        return this.items.has(t);
    }

    setAmmount(t:T,ammount:number){
        const newAmmount=this.items.get(t)+ammount;
        this.items.set(t, newAmmount);
    }

    add(t:T,ammount:number=1): void {
        if(this.contains(t)){    //if already exists stack it
            this.setAmmount(t, ammount);
        }else{  //if doesnt exsists check for capacity
            if(!this.full()){   //if not full add
                this.items.set(t, ammount);
            }
        }
    }

    remove(t:T,ammount:number=1): void {
        if(this.contains(t)){
            const currentAmmount=this.items.get(t);
            if(this.items.get(t)===ammount){
                this.items.delete(t);
            }else{
                this.setAmmount(t,-ammount);
            }
        }
    }

    clear(){
        for (const key of this.items.keys()) {
            this.items.delete(key);
        }
    }

    totalItemsAmmount() : number{
        let totalAmmount=0;
        for(let ammount of this.items.values()){
            totalAmmount+=ammount;
        }
        return totalAmmount;
    }
}