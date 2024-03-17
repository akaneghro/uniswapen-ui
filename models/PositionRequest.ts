import { StrategyParams } from "./StrategyParams";

export class PositionRequest {
    publicKey: string;
    chainId: number;
    idToken0: number;
    idToken1: number;
    fee: number;
    amount0: string;
    amount1: string;
    strategyParams: StrategyParams;

    constructor(positionRequest?: Partial<PositionRequest>) {
        if (positionRequest) {
            Object.assign(this, positionRequest);
        }
    }
}
