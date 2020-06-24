import { CardServer } from "./server/CardServer";

export var server=new CardServer();
 
export function startCardGame(){
    server.start();
}