"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ccxt_1 = __importDefault(require("ccxt"));
class Binance extends ccxt_1.default.binanceus {
    constructor(config) {
        super(config);
    }
    startTrade(data) {
        const _super = Object.create(null, {
            createMarketOrder: { get: () => super.createMarketOrder }
        });
        return __awaiter(this, void 0, void 0, function* () {
            data = this.convertBitgetOrderToBinanceOrder(data);
            const symbol = data['symbol'];
            const side = data['side'];
            const amount = data['amount'];
            const orderInfo = yield _super.createMarketOrder.call(this, symbol, side, amount);
            console.log(orderInfo);
        });
    }
    convertBitgetOrderToBinanceOrder(data) {
        console.log('Binance.convertBitgetOrderToBinanceOrder().data =>');
        console.log(data);
        return;
    }
}
exports.default = Binance;
//# sourceMappingURL=binance.js.map