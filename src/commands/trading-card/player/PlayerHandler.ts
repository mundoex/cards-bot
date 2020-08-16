import { isNullOrUndefined } from "util";
import { PlayerDAO } from "../database/player-apis/common/PlayerDAO";
import { Player } from "./Player";

export class PlayerHandler{
    private static instance:PlayerHandler;
    playerAPI:PlayerDAO;

    private constructor(){ }

    static getInstance() : PlayerHandler{
        if(isNullOrUndefined(PlayerHandler.instance)){
            PlayerHandler.instance=new PlayerHandler();
        }
        return PlayerHandler.instance;
    }

    get cachedPlayerMap() : Map<string, Player>{
        return this.playerAPI.cachedPlayersMap;
    }

    init(playerDAO:PlayerDAO) : Promise<boolean>{
        this.playerAPI=playerDAO;
        console.log("Loading API");
        return this.playerAPI.load();
    }
}