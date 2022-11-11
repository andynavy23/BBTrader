"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const bitget_config = {
    apiKey: process.env.BITGET_API_KEY,
    secret: process.env.BITGET_API_SECRET,
    password: process.env.BITGET_API_PASSWORD,
};
const binance_config = {
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_API_SECRET,
};
const google_config = {
    doc_id: process.env.GOOGLE_SHEET_API_DOC_ID,
    eth_sheet_id: process.env.GOOGLE_SHEET_API_ETH_SHEET_ID,
    btc_sheet_id: process.env.GOOGLE_SHEET_API_BTC_SHEET_ID,
    creds: {
        private_key: process.env.GOOGLE_SHEET_API_PRIVATE_KEY,
        client_email: process.env.GOOGLE_SHEET_API_CLIENT_EMAIL,
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
//# sourceMappingURL=config.js.map