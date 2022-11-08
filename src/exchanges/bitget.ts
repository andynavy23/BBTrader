import { config } from 'dotenv';
import ccxt from 'ccxt';

config();

class Bitget extends ccxt.bitget {
    constructor() {
        const config = {
            apiKey: process.env.BITGET_API_KEY,
            secret: process.env.BITGET_API_SECRET,
            password: process.env.BITGET_API_PASSWORD,
        };
        super(config);
    }

    public async getOrderHistory(symbol: string, minutes?: number): Promise<any> {
        const interval = 1000 * 60 * (minutes ? minutes : 60 * 12);
        const end_ts = Date.now();
        const start_ts = end_ts - interval;
        const params = {
            symbol: symbol + 'USDT_UMCBL',
            startTime: start_ts.toString(),
            endTime: end_ts.toString(),
            pageSize: '20',
        };

        const data = await this.privateMixGetOrderHistory(params);
        return this.parseOrderHistory(data['data']['orderList'], symbol);
    }

    public parseOrderHistory(orders: any, symbol: string): any {
        const order_list: any = [];
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

    public async allPoerpetualProducts(symbol?: string): Promise<any> {
        const markets = await this.public_mix_get_market_contracts({ productType: 'umcbl' });
        if (!markets) return;
        if (symbol) {
            const result = markets['data'].map((e) => {
                if (e['baseCoin'] == symbol) return e;
            });
            return result;
        } else {
            return markets;
        }
    }
}

export default Bitget;
