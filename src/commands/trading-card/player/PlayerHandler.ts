import { Player } from "./Player";
import { existsSync, readFileSync,readdirSync } from "fs";
import { PlayerFactory } from "./PlayerFactory";
import { Paths } from "../utils/Paths";
import { isNullOrUndefined } from "util";
import { PlayerSaveData } from "./PlayerSaveData";

export class PlayerHandler{
    private static instance:PlayerHandler;
    cachedPlayersMap:Map<string,Player>;

    constructor(){
        this.cachedPlayersMap=new Map<string,Player>();
        this.addRegularsToCache();
    }

    static getInstance() : PlayerHandler{
        if(isNullOrUndefined(PlayerHandler.instance)){
            PlayerHandler.instance=new PlayerHandler();
        }
        return PlayerHandler.instance;
    }

    load(id:string) : Player{
        const playerFilePath=Paths.getPlayerFilePath(id);
        let player;
        if(existsSync(playerFilePath)){
            const playerSaveData:PlayerSaveData = JSON.parse(readFileSync(playerFilePath).toString());
            player=Player.fromSaveData(playerSaveData);
        }else{
            const newPlayer=PlayerFactory.createStarterPlayer(id);
            newPlayer.save();
            return this.load(id);
        }
        this.addToPlayersCache(player);
        player.save();
        return player;
    }

    private addToPlayersCache(player:Player){
        this.cachedPlayersMap.set(player.id,player);
    }

    private addRegularsToCache(){
        const playerFolder:Array<string>=readdirSync(Paths.PLAYERS_FOLDER_PATH);
        playerFolder.forEach((playerFile:string) => {
            const playerFilePath=Paths.getPlayerFilePath(playerFile.split(".")[0]);
            const playerSaveData:PlayerSaveData=JSON.parse(readFileSync(playerFilePath).toString());
            this.addToPlayersCache(Player.fromSaveData(playerSaveData));
        });
    }

    getPlayerById(id:string) : Player{
        let player:Player=this.cachedPlayersMap.get(id);
        if(player){
            return player;
        }else{
            return this.load(id);
        }
    }

    
}