import { config } from 'dotenv';
config();

const bitget_config = {
    apiKey: process.env.BITGET_API_KEY,
    secret: process.env.BITGET_API_SECRET,
    password: process.env.BITGET_API_PASSWORD,
};
const binance_config = {
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_API_SECRET,
};

(() => {
    console.log('BITGET Config: ');
    console.log(bitget_config);
    console.log('BINANCE Config: ');
    console.log(binance_config);
})();
