import { FeeTier } from "./FeeTier";
import { Network } from "./Network";
import { StrategyParams } from "./StrategyParams";
import { Token } from "./Token";
import { Wallet } from "./Wallet";

export class PositionSerie {
    idPositionSerie: number = 0;
    idWallet: number = 0;
    idNetwork: number = 0;
    idToken0: number = 0;
    idToken1: number = 0;
    idFeeTier: number = 0;
    idPositionSerieState: number = 0;
    strategyParams: StrategyParams;
    creationDate: Date;
    expirationDate: Date;
    wallet: Wallet = new Wallet();
    network: Network = new Network();
    token0: Token = new Token();
    token1: Token = new Token();
    feeTier: FeeTier = new FeeTier();

    constructor(positionSerie?: Partial<PositionSerie>) {
        Object.assign(this, positionSerie);
    }
}
