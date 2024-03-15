import { StrategyParams } from "./StrategyParams";

export class PositionRequest {
    publicKey: string = "";
    chainId: number = 0;
    idToken0: number = 0;
    idToken1: number = 0;
    fee: number = 0;
    amount0: string = "";
    amount1: string = "";
    strategyParams: StrategyParams = new StrategyParams();

    constructor(positionRequest?: Partial<PositionRequest>) {
        if (positionRequest) {
            Object.assign(this, positionRequest);
        }
    }
}
