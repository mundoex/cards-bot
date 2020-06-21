import { Player } from "./Player";
export declare class PlayerHandler {
    private static instance;
    cachedPlayersMap: Map<string, Player>;
    constructor();
    static getInstance(): PlayerHandler;
    load(id: string): Player;
    private addToPlayersCache;
    private addRegularsToCache;
    getPlayerById(id: string): Player;
}
