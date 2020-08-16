import { Stringf } from "./Stringf";

export class ControllerUtils{
    static parsePokemonName(arr:Array<string>) : string{
        return Stringf.upperCaseFirstChars(arr.join(" "));
    }

    static parsePokemonNames(arr:Array<string>) : Array<string>{
        return ControllerUtils.parsePokemonName(arr).split("$");
    }

    static parsePackName(arr:Array<string>) : string{
        return Stringf.upperCaseFirstChars(arr.join(" "));
    }
}