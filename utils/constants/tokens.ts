import type Token from "~/types/Token";

const USDC_POLYGON: Token = {
    symbol: "USDC",
    name: "USDC",
    imageUrl: "/images/usdc.png",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    decimals: 6,
};

const WETH_POLYGON: Token = {
    symbol: "WETH",
    name: "WETH",
    imageUrl: "/images/eth.png",
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    decimals: 18,
};

export const POLYGON_TOKENS: Token[] = [USDC_POLYGON, WETH_POLYGON];
