import { Token } from "./Token";
import { FeeTier } from "./FeeTier";

export class PositionData {
    tokenId: number = 0;
    upperPrice: string = "";
    lowerPrice: string = "";
    currentPrice: string = "";
    creationDate: Date = new Date();
    isClosed: boolean = false;
    token0: Token = new Token();
    token1: Token = new Token();
    feeTier: FeeTier = new FeeTier();

    constructor(positionData?: Partial<PositionData>) {
        if (positionData) {
            Object.assign(this, positionData);
        }
    }
}
