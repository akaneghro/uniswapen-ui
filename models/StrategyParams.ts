export class StrategyParams {
    lowerRangeRatio: number = 0;
    upperRangeRatio: number = 0;
    triggerUpperRangeRatio: number = 0;
    triggerLowerRangeRatio: number = 0;
    operationDelay: number = 0;

    constructor(strategyParams?: Partial<StrategyParams>) {
        if (strategyParams) {
            Object.assign(this, strategyParams);
        }
    }
}
