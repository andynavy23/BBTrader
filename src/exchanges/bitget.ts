import { config } from 'dotenv';
import ccxt from 'ccxt';

config();

class Bitget extends ccxt.bitget {
    constructor() {
        const config = {
            apiKey: process.env.BITGET_API_KEY,
            secret: process.env.BITGET_API_SECRET,
        };
        super(config);
    }

    public async getOrderHistory(symbol: string, minutes: number): Promise<any> {
        // Order history response example
        // {
        //     "symbol": "SOLUSDT_UMCBL",
        //     "size": 1,
        //     "orderId": "963544804144852112",
        //     "clientOid": "963544804144852113",
        //     "filledQty": 1,
        //     "fee": -0.00629204,
        //     "price": 31.4602,
        //     "priceAvg": 31.4602,
        //     "state": "filled",
        //     "side": "close_short",
        //     "timeInForce": "normal",
        //     "totalProfits": 0.00760000,
        //     "posSide": "short",
        //     "marginCoin": "USDT",
        //     "filledAmount": 31.4602,
        //     "orderType": "limit",
        //     "leverage": "5",
        //     "marginMode": "crossed",
        //     "cTime": "1665452903781",
        //     "uTime": "1665452917467"
        // }

        const interval = 60 * minutes;
        const end_ts = Date.now();
        const start_ts = end_ts - interval;
        const params = {
            symbol: symbol,
            startTime: start_ts.toString(),
            endTime: end_ts.toString(),
            pageSize: '20',
        };

        try {
            const data = await this.private_mix_get_order_history(params);
            return this.parseOrderHistory(data['data']['orderList']);
        } catch (error) {
            console.log(error);
            return;
        }
    }

    public parseOrderHistory(orders: any): any {
        console.log('Binance.parseOrderHistory().orders =>');
        console.log(orders);
        return;
    }
}

export default Bitget;
