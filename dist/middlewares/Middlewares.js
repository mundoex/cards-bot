"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEVELOPER_IDS = ["112900545299136512"];
class Middlewares {
    static isDeveloper(msg, client, params, next) {
        return DEVELOPER_IDS.includes(msg.member.id) ? next() : msg.channel.send("No permission for that command");
    }
}
exports.Middlewares = Middlewares;
