export class FeeTier {
    idFeeTier: number = 0;
    code: string = "";
    feePercentage: number = 0;
    fee: number = 0;
    tickSpacing: number = 0;

    constructor(feeTier?: Partial<FeeTier>) {
        if (feeTier) {
            Object.assign(this, feeTier);
        }
    }
}
