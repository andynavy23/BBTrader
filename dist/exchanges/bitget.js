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
class Bitget extends ccxt_1.default.bitget {
    constructor(config) {
        super(config);
    }
    getOrderHistory(symbol, minutes) {
        return __awaiter(this, void 0, void 0, function* () {
            const interval = 1000 * 60 * (minutes ? minutes : 60 * 12);
            const end_ts = Date.now();
            const start_ts = end_ts - interval;
            const params = {
                symbol: symbol + 'USDT_UMCBL',
                startTime: start_ts.toString(),
                endTime: end_ts.toString(),
                pageSize: '20',
            };
            const data = yield this.privateMixGetOrderHistory(params);
            return this.parseOrderHistory(data['data']['orderList'], symbol);
        });
    }
    parseOrderHistory(orders, symbol) {
        const order_list = [];
        orders.forEach((e) => {
            const order = {
                symbol: symbol,
                price: e['priceAvg'],
                side: e['side'],
                ts: e['cTime'],
            };
            order_list.push(order);
        });
        return order_list;
    }
    allPoerpetualProducts(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const markets = yield this.public_mix_get_market_contracts({ productType: 'umcbl' });
            if (!markets)
                return;
            if (symbol) {
                const result = markets['data'].map((e) => {
                    if (e['baseCoin'] == symbol)
                        return e;
                });
                return result;
            }
            else {
                return markets;
            }
        });
    }
}
exports.default = Bitget;
//# sourceMappingURL=bitget.js.map