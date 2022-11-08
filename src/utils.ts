import { GoogleSpreadsheet } from 'google-spreadsheet';
import { config } from 'dotenv';
config();

export function getDifference(arr1: any, arr2: any): any {
    const difference = arr1.filter((x) => !arr2.includes(x));
    return difference;
}

export async function getGoogleSheet(symbol: string): Promise<any> {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_API_DOC_ID);
    const creds = {
        private_key: process.env.GOOGLE_SHEET_API_PRIVATE_KEY,
        client_email: process.env.GOOGLE_SHEET_API_CLIENT_EMAIL,
    };
    const sheet_id =
        symbol == 'ETH' ? process.env.GOOGLE_SHEET_API_ETH_SHEET_ID : process.env.GOOGLE_SHEET_API_BTC_SHEET_ID;

    await doc.useServiceAccountAuth(creds);
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
