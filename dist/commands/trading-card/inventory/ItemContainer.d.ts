export declare abstract class ItemContainer<T> {
    capacity: number;
    items: Map<T, number>;
    constructor(capacity: number);
    full(): boolean;
    empty(): boolean;
    contains(t: T): boolean;
    setAmmount(t: T, ammount: number): void;
    add(t: T, ammount?: number): void;
    remove(t: T, ammount?: number): void;
    clear(): void;
}
