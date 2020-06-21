import { join, resolve} from "path";

export class Paths{
    public static readonly CARDS_JSON_PATH=resolve("./src/commands/trading-card/database/cards.json");
    public static readonly PACKS_JSON_PATH=resolve("./src/commands/trading-card/database/packs.json");
    public static readonly PLAYERS_FOLDER_PATH=resolve("./src/commands/trading-card/database/players");

    static getPlayerFilePath(id:string) : string{
        return join(Paths.PLAYERS_FOLDER_PATH, id+".json");
    }
}