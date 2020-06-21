"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GoldSystem {
    static starsToGold(stars) {
        switch (stars) {
            case (10): return 100 * stars + 500;
            case (9): return 100 * stars + 300;
            case (8): return 100 * stars + 200;
            case (7): return 100 * stars + 150;
            case (6): return 100 * stars + 100;
            case (5): return 100 * stars + 75;
            case (4): return 100 * stars + 50;
            case (3): return 100 * stars + 30;
            case (2): return 100 * stars + 20;
            case (1): return 100 * stars;
            default: return 100 * stars;
        }
    }
}
exports.GoldSystem = GoldSystem;
