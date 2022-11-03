import { config } from 'dotenv';
import ccxt from 'ccxt';

config();

class Binance extends ccxt.binanceus {
    constructor() {
        const config = {
            apiKey: process.env.BINANCE_API_KEY,
            secret: process.env.BINANCE_API_SECRET,
        };
        super(config);
    }

    public async startTrade(data: any) {
        data = this.convertBitgetOrderToBinanceOrder(data);
        const symbol = data['symbol'];
        const side = data['side'];
        const amount = data['amount'];
        const orderInfo = await super.createMarketOrder(symbol, side, amount);

        console.log(orderInfo);
    }

    public convertBitgetOrderToBinanceOrder(data: any): any {
        console.log('Binance.convertBitgetOrderToBinanceOrder().data =>');
        console.log(data);
        return;
    }
}

export default Binance;
