import { Inventory } from "../inventory/Inventory";
import { ItemGenerator } from "../structure/ItemGenerator";
import { Pack } from "../packs/Pack";
import { PackManager } from "../packs/PackManager";
import { Rarity } from "../drop-generation/Rarity";
import { Mathf } from "../utils/Mathf";
import { DropGenerator } from "../drop-generation/DropGenerator";
import { Slot } from "../inventory/Slot";
import { GameConstants } from "../global/GameConstants";

export class Shop extends ItemGenerator<Pack>{
    inventory:Inventory;

    constructor(){
        super(GameConstants.SHOP_AVAILABLE_PACKS_IDS, PackManager.getInstance());
        this.inventory=new Inventory(GameConstants.SHOP_CAPACITY, GameConstants.SHOP_SLOTS);
    }

    get slotsSize() : number{
        return this.inventory.items.size;
    }

    fillRarityItemIds(): void {
        const possibleCards:Array<Pack>=this.managerInstance.getItemsByIds(this.possibleItemsIds);
        possibleCards.forEach((pack:Pack)=>{
            switch(pack.rarity.rarity){
                case(GameConstants.RARITY_ULTRA): this.ultraItemsIds.push(pack.id); break;
                case(GameConstants.RARITY_LEGENDARY): this.legendaryItemsIds.push(pack.id); break;
                case(GameConstants.RARITY_EPIC): this.epicItemsIds.push(pack.id); break;
                case(GameConstants.RARITY_RARE): this.rareItemsIds.push(pack.id); break;
                case(GameConstants.RARITY_COMMON): this.commonItemsIds.push(pack.id); break;
                default: this.commonItemsIds.push(pack.id); break;
            }
        });
    }

    generateRandomPackRarities() : Array<number>{
        const dropGenerator=new DropGenerator();
        const rarities=new Array<number>();
        for(let i=0;i<GameConstants.SHOP_CAPACITY;i++){
            rarities.push(dropGenerator.generateRandomRarity());   
        }
        return rarities;
    }

    generatePacksRandomAmmount() : number{
        return Mathf.randomInt(GameConstants.SHOP_PACK_AMMOUNT_RANGE[0],GameConstants.SHOP_PACK_AMMOUNT_RANGE[1]);
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

    hasStock(packId:number){
        return this.inventory.items.has(packId);
    }

    print(){
        for (const [key, value] of this.inventory.items.entries()) {
            console.log(key, value);
        }
    }



    

}