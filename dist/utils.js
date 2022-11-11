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
exports.sendNotifyLineMessage = exports.writeGoogleSheetData = exports.readGoogleSheetData = exports.getGoogleSheet = exports.getDifference = void 0;
const google_spreadsheet_1 = require("google-spreadsheet");
const axios_1 = __importDefault(require("axios"));
function getDifference(arr1, arr2) {
    const difference = arr2.filter((x) => !arr1.includes(x));
    return difference;
}
exports.getDifference = getDifference;
function getGoogleSheet(symbol, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = new google_spreadsheet_1.GoogleSpreadsheet(config['doc_id']);
        const sheet_id = symbol == 'ETH' ? config['eth_sheet_id'] : config['btc_sheet_id'];
        yield doc.useServiceAccountAuth(config['creds']);
        yield doc.loadInfo();
        const sheet = doc.sheetsById[sheet_id];
        yield sheet.loadCells('A1:A20');
        return sheet;
    });
}
exports.getGoogleSheet = getGoogleSheet;
function readGoogleSheetData(sheet) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        for (var i = 0; i < 20; i++) {
            const cell = yield sheet.getCell(i, 0).value;
            if (cell)
                result.push(JSON.parse(cell));
        }
        return result;
    });
}
exports.readGoogleSheetData = readGoogleSheetData;
function writeGoogleSheetData(sheet, new_data) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < 20; i++) {
            const cell = yield sheet.getCell(i, 0);
            cell.value = JSON.stringify(new_data[i]);
        }
        yield sheet.saveUpdatedCells();
    });
}
exports.writeGoogleSheetData = writeGoogleSheetData;
function filterMinutesOrder(data, minutes) {
    const current_ts = Date.now();
    const minutes_data = data.filter((item) => Math.abs(item['ts'] - current_ts) < 1000 * 60 * minutes);
    return minutes_data;
}
function sendNotifyLineMessage(data, token) {
    return __awaiter(this, void 0, void 0, function* () {
        let message = 'Bitget 下單通知\n';
        const minutes_data = filterMinutesOrder(data, 10);
        minutes_data.forEach((item) => {
            let side_status;
            switch (item['side']) {
                case 'open_short':
                    side_status = '開倉 空單';
                    break;
                case 'open_long':
                    side_status = '開倉 多單';
                    break;
                case 'close_short':
                    side_status = '平倉 空單';
                    break;
                case 'close_long':
                    side_status = '平倉 多單';
                    break;
            }
            const tw_ts = parseInt(item['ts']) + 8 * 3600 * 1000;
            message += `${item['symbol']} ${side_status} ${item['price']} \n`;
            message += `時間:${new Date(tw_ts).toISOString()}\n\n`;
        });
        if (minutes_data.length == 0)
            return;
        const url = 'https://notify-api.line.me/api/notify';
        const payload = `message=${message}`;
        const option = {
            headers: {
                authorization: 'Bearer ' + token,
            },
        };
        yield axios_1.default.post(url, payload, option);
    });
}
exports.sendNotifyLineMessage = sendNotifyLineMessage;
//# sourceMappingURL=utils.js.map