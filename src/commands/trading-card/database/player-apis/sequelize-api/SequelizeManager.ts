import { Sequelize, Options } from "sequelize";
import { isNullOrUndefined } from "util";

const prodDatabaseConfig:Options={
    database: process.env.DATABASE,
    dialect: 'mysql',
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    logging: false,
}

export let sequelize:Sequelize;
isNullOrUndefined(process.env.NODE_ENV) ? sequelize=new Sequelize('sqlite::memory', {logging:false}) : sequelize=new Sequelize(prodDatabaseConfig);