import { Pack } from "./Pack";
import { isNullOrUndefined } from "util";
import { readFileSync } from "fs";
import { Paths } from "../utils/Paths";
import { IManager } from "../structure/IManager";
import { PackSaveData } from "./PackSaveData";

export class PackManager implements IManager<Pack>{
    private static instance:PackManager;
    packs:Map<number,Pack>;
    packsNameIdMap:Map<string,number>;

    constructor(){
        this.packs=new Map<number,Pack>();
        this.packsNameIdMap=new Map<string,number>();
        this.fillMaps();
    }

    static getInstance() : PackManager{
        if(isNullOrUndefined(PackManager.instance)){
            PackManager.instance=new PackManager();
        }
        return PackManager.instance;
    }

    static getPacksFromJSON() : Array<Pack>{
        return JSON.parse(readFileSync(Paths.PACKS_JSON_PATH).toString()).map((packSaveData:PackSaveData)=>{return Pack.fromSaveData(packSaveData)});
    }

    fillMaps(): void {
        PackManager.getPacksFromJSON().forEach((pack:Pack)=>{
            this.packs.set(pack.id, pack);
            this.packsNameIdMap.set(pack.name, pack.id);
        });
    }

    getItemById(itemId: number): Pack {
        return this.packs.get(itemId);
    }

    getItemsByIds(itemIds: number[]): Pack[] {
        return itemIds.map(id=>{return this.getItemById(id);});
    }

    getItemByName(itemName: string): Pack {
        return this.getItemById(this.packsNameIdMap.get(itemName));
    }

    getCardPack(cardId:number){
        for(const pack of this.packs.values()){
            if(pack.contains(cardId)){
                return pack;
            }
        }
        return undefined;
    }
}