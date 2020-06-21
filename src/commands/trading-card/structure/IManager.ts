export interface IManager<T>{
    fillMaps() : void;
    getItemById(itemId:number) : T;
    getItemsByIds(itemIds:Array<number>) : Array<T>;
    getItemByName(itemName:string) : T;
}