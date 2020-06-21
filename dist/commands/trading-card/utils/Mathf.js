"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mathf {
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static randomDecimal(min, max, digits) {
        const precision = Math.pow(10, digits);
        const random = Math.random() * (max - min) + min;
        return Math.floor(random * precision) / precision;
    }
    static percentageOf(number, percentage) {
        return (number * percentage) / 100;
    }
    static inRange(range, number) {
        return number >= range[0] && number <= range[1];
    }
    static average(numbers) {
        return (numbers.reduce((a, b) => a + b, 0)) / numbers.length;
    }
    static isNumeric(text) {
        return text.match(/^[0-9]+$/) != null;
    }
}
exports.Mathf = Mathf;
