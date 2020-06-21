export class Mathf{
    static randomInt(min:number, max:number) : number{
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static randomDecimal(min:number, max:number, digits:number){
        const precision = Math.pow(10, digits);
        const random = Math.random()*(max-min) + min;
        return Math.floor(random*precision) / precision;
    }

    static percentageOf(number:number, percentage:number) : number{
        return (number*percentage)/100;
    }

    static inRange(range:Array<number>, number:number) : boolean{
        return number>=range[0] && number<=range[1];
    }

    static average(numbers:Array<number>) : number{
        return (numbers.reduce((a, b) => a + b, 0))/numbers.length;
    }

    static isNumeric(text:string) : boolean{
        return text.match(/^[0-9]+$/) != null;
      }


}