import { PlayerDAO } from "../common/PlayerDAO";
import { Player } from "../../../player/Player";
import { PlayerModel } from "./PlayerModel";
import { PlayerFactory } from "../../../player/PlayerFactory";
import { Card } from "../../..//cards/Card";


export class SequelizePlayerAPI implements PlayerDAO{
    cachedPlayersMap: Map<string, Player>;

    constructor(){
        this.cachedPlayersMap=new Map<string, Player>();
        this.load();
    }

    async load() : Promise<boolean>{
        const createdTables=await PlayerModel.sync({alter:true});
        if(createdTables){
            const players:Array<PlayerModel> = await PlayerModel.findAll();
            players.forEach((playerModel:PlayerModel)=>{
                this.cachedPlayersMap.set(playerModel.id,Player.fromSaveData(playerModel));
                return true;
            });
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
    
    save(player: Player): Promise<boolean> {
        return PlayerModel.update(player.toSaveData(),{where: {id:player.getId}}).then(res=>{return true;});
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

    createNewPlayer(id: string): void {
        this.cachedPlayersMap.set(id,PlayerFactory.createStarterPlayer(id));
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
}