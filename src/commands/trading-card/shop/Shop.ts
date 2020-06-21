import { Inventory } from "../inventory/Inventory";
import { ItemGenerator } from "../structure/ItemGenerator";
import { Pack } from "../packs/Pack";
import { PackManager } from "../packs/PackManager";
import { Rarity } from "../drop-generation/Rarity";
import { Mathf } from "../utils/Mathf";
import { DropGenerator } from "../drop-generation/DropGenerator";
import { Slot } from "../inventory/Slot";

export class Shop extends ItemGenerator<Pack>{
    
    private static readonly SHOP_CAPACITY=7;
    private static readonly AVAILABLE_PACKS_IDS=[1,2,3,4];
    private static readonly SHOP_SLOTS=new Array<Slot>();
    private static readonly PACK_AMMOUNT_RANGE=[2,5];
    inventory:Inventory;

    constructor(){
        super(Shop.AVAILABLE_PACKS_IDS, PackManager.getInstance());
        this.inventory=new Inventory(Shop.SHOP_CAPACITY, Shop.SHOP_SLOTS);
    }

    get slotsSize() : number{
        return this.inventory.items.size;
    }

    fillRarityItemIds(): void {
        const possibleCards:Array<Pack>=this.managerInstance.getItemsByIds(this.possibleItemsIds);
        possibleCards.forEach((pack:Pack)=>{
            switch(pack.rarity.rarity){
                case(Rarity.ULTRA): this.ultraItemsIds.push(pack.id); break;
                case(Rarity.LEGENDARY): this.legendaryItemsIds.push(pack.id); break;
                case(Rarity.EPIC): this.epicItemsIds.push(pack.id); break;
                case(Rarity.RARE): this.rareItemsIds.push(pack.id); break;
                case(Rarity.COMMON): this.commonItemsIds.push(pack.id); break;
                default: this.commonItemsIds.push(pack.id); break;
            }
        });
    }

    generateRandomPackRarities() : Array<number>{
        const dropGenerator=new DropGenerator();
        const rarities=new Array<number>();
        for(let i=0;i<Shop.SHOP_CAPACITY;i++){
            rarities.push(dropGenerator.generateRandomRarity());   
        }
        return rarities;
    }

    generatePacksRandomAmmount() : number{
        return Mathf.randomInt(Shop.PACK_AMMOUNT_RANGE[0],Shop.PACK_AMMOUNT_RANGE[1]);
    }

    fillShop(){
        const rarities:Array<number>=this.generateRandomPackRarities();
        rarities.forEach((rarity:number)=>{this.inventory.add(this.randomItemByRarity(rarity).id,this.generatePacksRandomAmmount());});
    }

    forceRestock(){
        this.inventory.clear();
        this.fillShop();
        console.log("Shop Restocked");
    }

    sellItem(itemId:number,ammount:number=1){
        this.inventory.remove(itemId,ammount);
        if(this.inventory.empty()){
            this.fillShop();
        }
    }

    print(){
        for (const [key, value] of this.inventory.items.entries()) {
            console.log(key, value);
        }
    }



    

}