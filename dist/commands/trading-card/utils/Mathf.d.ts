export declare class Mathf {
    static randomInt(min: number, max: number): number;
    static randomDecimal(min: number, max: number, digits: number): number;
    static percentageOf(number: number, percentage: number): number;
    static inRange(range: Array<number>, number: number): boolean;
    static average(numbers: Array<number>): number;
    static isNumeric(text: string): boolean;
}
