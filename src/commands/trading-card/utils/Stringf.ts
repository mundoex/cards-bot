export class Stringf{
    static upperCaseFirstChars(text:string) : string{
        return text.split(" ").map((str:string)=>{return str.charAt(0).toUpperCase()+str.substring(1,text.length);}).join(" ");
    }
}