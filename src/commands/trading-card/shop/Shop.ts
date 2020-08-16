import { Inventory } from "../inventory/Inventory";
import { ItemGenerator } from "../structure/ItemGenerator";
import { Pack } from "../packs/Pack";
import { PackManager } from "../packs/PackManager";
import { Rarity } from "../drop-generation/Rarity";
import { Mathf } from "../utils/Mathf";
import { DropGenerator } from "../drop-generation/DropGenerator";
import { Slot } from "../inventory/Slot";
import { GameConstants } from "../global/GameConstants";
import { Broadcaster } from "../broadcaster/Broadcaster";

export class Shop extends ItemGenerator<Pack>{
    inventory:Inventory;
    shopRange:Array<number>;
    message:string;
    constructor(message:string,shopCapacity:number=GameConstants.SHOP_CAPACITY,shopRange:Array<number>=GameConstants.SHOP_PACK_AMMOUNT_RANGE){
        super(GameConstants.SHOP_AVAILABLE_PACKS_IDS, PackManager.getInstance());
        this.inventory=new Inventory(shopCapacity*2, new Array<Slot>());
        this.shopRange=shopRange;
        this.message=message;
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
        return Mathf.randomInt(this.shopRange[0],this.shopRange[1]);
    }

    fillShop(){
        const rarities:Array<number>=this.generateRandomPackRarities();
        rarities.forEach((rarity:number)=>{this.inventory.add(this.randomItemByRarity(rarity).id,this.generatePacksRandomAmmount());});
    }

    forceRestock(){
        this.inventory.clear();
        this.fillShop();
        Broadcaster.getInstance().broadcast(this.message);
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

}