import Bitget from './exchanges/bitget';
import Binance from './exchanges/binance';
import * as Utils from './utils';
import { config } from 'dotenv';
config();

async function main() {
    const bitget_config = {
        apiKey: process.env.BITGET_API_KEY as string,
        secret: process.env.BITGET_API_SECRET as string,
        password: process.env.BITGET_API_PASSWORD as string,
    };
    const binance_config = {
        apiKey: process.env.BINANCE_API_KEY as string,
        secret: process.env.BINANCE_API_SECRET as string,
    };
    const google_config = {
        doc_id: process.env.GOOGLE_SHEET_API_DOC_ID as string,
        eth_sheet_id: process.env.GOOGLE_SHEET_API_ETH_SHEET_ID as string,
        btc_sheet_id: process.env.GOOGLE_SHEET_API_BTC_SHEET_ID as string,
        creds: {
            private_key: process.env.GOOGLE_SHEET_API_PRIVATE_KEY as string,
            client_email: process.env.GOOGLE_SHEET_API_CLIENT_EMAIL as string,
        },
    };
    const notify_token = process.env.LINE_NOTIFY_TOKEN as string;
    const bitget = new Bitget(bitget_config);
    const binance = new Binance(binance_config);

    async function run_process(symbol: string, exch_a: any, exch_b: any) {
        const new_data = await exch_a.getOrderHistory(symbol);
        const sheet = await Utils.getGoogleSheet(symbol, google_config);
        const old_data = await Utils.readGoogleSheetData(sheet);
        const diff_data = await Utils.getDifference(old_data, new_data);
        // console.log(diff_data);
        if (diff_data.length > 0) {
            console.log(`Start ${symbol} trading...`);
            await Utils.sendNotifyLineMessage(diff_data, notify_token);
            await Utils.writeGoogleSheetData(sheet, new_data);
        }
    }

    await run_process('ETH', bitget, binance);
    await run_process('BTC', bitget, binance);
}

(async () => {
    await main();
})();
