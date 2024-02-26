export class Price {
    poolPrice: string = "";
    token0UsdPrice: string = "";
    token1UsdPrice: string = "";

    constructor(price?: Partial<Price>) {
        if (price) {
            Object.assign(this, price);
        }
    }
}
