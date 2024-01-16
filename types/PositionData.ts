export default interface PositionData {
    id: string;
    depositedToken0: string;
    depositedToken1: string;
    liquidity: string;
    transaction: {
        id: string;
    };
    token0: {
        id: string;
        symbol: string;
    };
    token1: {
        id: string;
        symbol: string;
    };
    pool: {
        id: string;
        feeTier: string;
    };
}
