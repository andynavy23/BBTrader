"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bitget_1 = __importDefault(require("./exchanges/bitget"));
const binance_1 = __importDefault(require("./exchanges/binance"));
const Utils = __importStar(require("./utils"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const bitget_config = {
            apiKey: process.env.BITGET_API_KEY,
            secret: process.env.BITGET_API_SECRET,
            password: process.env.BITGET_API_PASSWORD,
        };
        const binance_config = {
            apiKey: process.env.BINANCE_API_KEY,
            secret: process.env.BINANCE_API_SECRET,
        };
        const google_config = {
            doc_id: process.env.GOOGLE_SHEET_API_DOC_ID,
            eth_sheet_id: process.env.GOOGLE_SHEET_API_ETH_SHEET_ID,
            btc_sheet_id: process.env.GOOGLE_SHEET_API_BTC_SHEET_ID,
            creds: {
                private_key: process.env.GOOGLE_SHEET_API_PRIVATE_KEY,
                client_email: process.env.GOOGLE_SHEET_API_CLIENT_EMAIL,
            },
        };
        const notify_token = process.env.LINE_NOTIFY_TOKEN;
        const bitget = new bitget_1.default(bitget_config);
        const binance = new binance_1.default(binance_config);
        function run_process(symbol, exch_a, exch_b) {
            return __awaiter(this, void 0, void 0, function* () {
                const new_data = yield exch_a.getOrderHistory(symbol);
                const sheet = yield Utils.getGoogleSheet(symbol, google_config);
                const old_data = yield Utils.readGoogleSheetData(sheet);
                const diff_data = yield Utils.getDifference(old_data, new_data);
                // console.log(diff_data);
                if (diff_data.length > 0) {
                    console.log('Start trading...');
                    yield Utils.sendNotifyLineMessage(diff_data, notify_token);
                    yield Utils.writeGoogleSheetData(sheet, new_data);
                }
            });
        }
        yield run_process('ETH', bitget, binance);
        yield run_process('BTC', bitget, binance);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
//# sourceMappingURL=main.js.map