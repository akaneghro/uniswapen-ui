export class Token {
    idToken: number = 0;
    contract: string = "";
    code: string = "";
    name: string = "";
    symbol: string = "";
    decimals: number = 0;
    logo: string = "";

    constructor(token?: Partial<Token>) {
        if (token) {
            Object.assign(this, token);
        }
    }
}
