export class PositionRequest {
    publicKey: string = "";
    chainId: string = "";
    idToken0: number = 0;
    idToken1: number = 0;
    amount0: string = "";
    amount1: string = "";
    fee: number = 0;
    range: number = 0;

    constructor(positionRequest?: Partial<PositionRequest>) {
        if (positionRequest) {
            Object.assign(this, positionRequest);
        }
    }
}
