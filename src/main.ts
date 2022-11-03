import Bitget from './exchanges/bitget';
import Binance from './exchanges/binance';

async function main() {
    const exch_a = new Bitget();
    const exch_b = new Binance();

    const btc_data = exch_a.getOrderHistory('BTC', 20);
    const eth_data = exch_a.getOrderHistory('ETH', 20);

    exch_b.startTrade(btc_data);
    exch_b.startTrade(eth_data);
}

(async () => {
    await main();
})();
