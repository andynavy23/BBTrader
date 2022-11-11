import { config } from 'dotenv';
config();

const bitget_config = {
    apiKey: process.env.BITGET_API_KEY,
    secret: process.env.BITGET_API_SECRET,
    password: process.env.BITGET_API_PASSWORD,
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

(() => {
    console.log('BITGET Config: ');
    console.log(bitget_config);

    console.log('BINANCE Config: ');
    console.log(binance_config);

    console.log('GOOGLE Config: ');
    console.log(google_config);
})();
