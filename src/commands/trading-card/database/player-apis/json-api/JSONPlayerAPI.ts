import { PlayerDAO } from "../common/PlayerDAO";
import { Player } from "../../../player/Player";
import { Paths } from "../../../utils/Paths";
import { readdirSync, existsSync, readFileSync, writeFile,promises } from "fs";
import { PlayerSaveData } from "../../../player/PlayerSaveData";
import { PlayerFactory } from "../../../player/PlayerFactory";
import { PlayerData } from "../common/PlayerData";
import { Card } from "../../../cards/Card";

export class JSONPlayerAPI implements PlayerDAO{
    cachedPlayersMap: Map<string, Player>;

    constructor(){
        this.cachedPlayersMap=new Map<string, Player>();
        this.load();
    }

    findUsersWithCard(card: Card): Player[] {
        const players=new Array<Player>();
        for (const player of this.cachedPlayersMap.values()) {
            if(player.hasCard(card)){
                players.push(player);
            }
        }
        return players;
    }

    load(): Promise<boolean> {
        const playerFiles=readdirSync(Paths.PLAYERS_FOLDER_PATH);
        const promisesArray:Promise<boolean>[]=playerFiles.map((fileName:string)=>{
            const filePath=Paths.getPlayerFilePath(fileName.split(".")[0]);
            if(existsSync(filePath)){
                return promises.readFile(filePath).then((fileData:Buffer)=>{
                    try{
                        const playerData:PlayerData=JSON.parse(fileData.toString());
                        this.cachedPlayersMap.set(playerData.id,Player.fromSaveData(playerData));
                        return true;
                    }catch(err){
                        console.error("Error loading "+filePath);
                        return false;
                    }
                    
                });
            }
        });
        return Promise.all(promisesArray).then((results:Array<boolean>)=>{return true;});
    }
    
    save(player: Player): Promise<boolean> {
        const playerPath=Paths.getPlayerFilePath(player.getId);
        return promises.writeFile(playerPath, JSON.stringify(player.toSaveData())).then(res=>{return true;});
    }

    createNewPlayer(id: string): void {
        this.cachedPlayersMap.set(id,PlayerFactory.createStarterPlayer(id));
    }

    getPlayerById(id: string): Player {
        const player=this.cachedPlayersMap.get(id);
        if(player){
            return player;
        }else{
            this.createNewPlayer(id);
            return this.cachedPlayersMap.get(id);
        }
    }
}