const  AsciiTable = require("ascii-table");
export class AsciiTableWrapper extends AsciiTable{
    constructor(){
        super();
        this.__edge="│";
        this.__fill="─";
        this.__top=";";
        this.__bottom=";";
    }

    toMarkDownString(){
        let resultText:string=this.toString();
        ["┌",,"┐","└","┘"].forEach((corner:string)=>resultText=resultText.replace(";",corner));
        return "```ts\n"+resultText+"```";
    }
}