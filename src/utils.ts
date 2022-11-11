import { GoogleSpreadsheet } from 'google-spreadsheet';
import axios from 'axios';

export function getDifference(arr1: any, arr2: any): any {
    const difference = arr2.filter((x: any) => !arr1.includes(x));
    return difference;
}

export async function getGoogleSheet(symbol: string, config: any): Promise<any> {
    const doc = new GoogleSpreadsheet(config['doc_id']);
    const sheet_id = symbol == 'ETH' ? config['eth_sheet_id'] : config['btc_sheet_id'];

    await doc.useServiceAccountAuth(config['creds']);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheet_id];
    await sheet.loadCells('A1:A20');

    return sheet;
}

export async function readGoogleSheetData(sheet: any): Promise<any> {
    const result = [];
    for (var i = 0; i < 20; i++) {
        const cell = await sheet.getCell(i, 0).value;
        if (cell) result.push(JSON.parse(cell));
    }

    return result;
}

export async function writeGoogleSheetData(sheet: any, new_data: any) {
    for (var i = 0; i < 20; i++) {
        const cell = await sheet.getCell(i, 0);
        cell.value = JSON.stringify(new_data[i]);
    }
    await sheet.saveUpdatedCells();
}

function filterMinutesOrder(data: any, minutes: number): any {
    const current_ts = Date.now();
    const minutes_data = data.filter((item: any) => Math.abs(item['ts'] - current_ts) < 1000 * 60 * minutes);
    return minutes_data;
}

export async function sendNotifyLineMessage(data: any, token: string) {
    let message = 'Bitget 下單通知\n';
    const minutes_data = filterMinutesOrder(data, 10);
    minutes_data.forEach((item: any) => {
        let side_status: string;
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
    if (minutes_data.length == 0) return;

    const url = 'https://notify-api.line.me/api/notify';
    const payload = `message=${message}`;
    const option = {
        headers: {
            authorization: 'Bearer ' + token,
        },
    };
    await axios.post(url, payload, option);
}
