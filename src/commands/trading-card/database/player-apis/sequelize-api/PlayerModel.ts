import { Model, DataTypes } from "sequelize";
import { PlayerData } from "../common/PlayerData";
import { Slot } from "../../../inventory/Slot";
import { InventorySaveData } from "../../../inventory/InventorySaveData";
import { sequelize} from "./SequelizeManager";

export class PlayerModel extends Model<PlayerData> implements PlayerData{
    id:string;
    experience:number;
    gold:number;
    claims:number;
    priorityClaims:number;
    trades:number;
    cardWishId:number;
    //Modifiers
    experienceModifier:number;
    luckModifier:number;
    goldModifier:number;
    protectionExpiration:number;
    //collection data
    top10CardsIds:Array<number>;
    dryStreaks:Array<[number,number]>;
    achievements:Array<number>;
    packsOpened:InventorySaveData;
    cards:InventorySaveData;
    packs:InventorySaveData;
    //Stats
    claimsComplete:number;
    totalGoldEarned:number;
    valueableStealsPrevented:number;
    valueableStealsCompleted:number;
    bountiesComplete:number;
    tradesComplete:number;
    triviasComplete:number;
    rerollsComplete:number;
    gamblesComplete:number;
    sacrifices:number;
    cardsCaught:number;
    totalPacksBought:number;
}

PlayerModel.init({
    id: { type: DataTypes.STRING, allowNull: false, primaryKey:true },
    experience: { type: DataTypes.FLOAT, allowNull: false },
    gold: {type: DataTypes.FLOAT, allowNull: false },
    claims: { type: DataTypes.INTEGER, allowNull: false },
    priorityClaims: { type: DataTypes.INTEGER, allowNull: false },
    trades: {type: DataTypes.INTEGER, allowNull: false },
    cardWishId: { type: DataTypes.INTEGER, allowNull: false },
    //Modifiers
    experienceModifier: { type: DataTypes.FLOAT, allowNull: false },
    luckModifier: { type: DataTypes.FLOAT, allowNull: false },
    goldModifier: { type: DataTypes.FLOAT, allowNull: false },
    protectionExpiration: { type: DataTypes.INTEGER, allowNull: false },
    //collection data
    top10CardsIds: {type: DataTypes.JSON, allowNull: false},
    dryStreaks: { type: DataTypes.JSON, allowNull: false },
    achievements: { type: DataTypes.JSON, allowNull: false },
    cards: { type: DataTypes.JSON, allowNull: false },
    packs: {type: DataTypes.JSON, allowNull: false},
    packsOpened: { type: DataTypes.JSON, allowNull: false },
    //Stats
    claimsComplete: { type: DataTypes.INTEGER, allowNull: false },
    totalGoldEarned: {type: DataTypes.INTEGER, allowNull: false },
    valueableStealsPrevented: {type: DataTypes.INTEGER, allowNull: false },
    valueableStealsCompleted: {type: DataTypes.INTEGER, allowNull: false },
    bountiesComplete: {type: DataTypes.INTEGER, allowNull: false },
    tradesComplete: {type: DataTypes.INTEGER, allowNull: false },
    triviasComplete: {type: DataTypes.INTEGER, allowNull: false },
    rerollsComplete: {type: DataTypes.INTEGER, allowNull: false },
    gamblesComplete: {type: DataTypes.INTEGER, allowNull: false },
    sacrifices: { type: DataTypes.INTEGER, allowNull: false },
    cardsCaught: { type: DataTypes.INTEGER, allowNull: false },
    totalPacksBought: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    modelName: 'PlayerModel'
});