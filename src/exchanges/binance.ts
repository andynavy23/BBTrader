import ccxt from 'ccxt';

class Binance extends ccxt.binanceus {
    constructor(config: any) {
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
