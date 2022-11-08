import Bitget from './exchanges/bitget';
import Binance from './exchanges/binance';
import * as Utils from './utils';
import { config } from 'dotenv';
config();

async function main() {
    const bitget = new Bitget();
    const binance = new Binance();

    async function process(symbol: string, exch_a: any, exch_b: any) {
        const new_data = await exch_a.getOrderHistory(symbol);
        const sheet = await Utils.getGoogleSheet(symbol);
        const old_data = await Utils.readGoogleSheetData(sheet);
        const diff_data = await Utils.getDifference(old_data, new_data);
        if (diff_data.length > 0) {
            // exch_b.startTrade(diff_data);
            console.log('Start trading');
            console.log(diff_data);
        }
    }

    await process('ETH', bitget, binance);
}

(async () => {
    await main();
})();
