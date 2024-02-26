export class Wallet {
    idWallet: number = 0;
    publicKey: string = "";
    secret: string = "";
    aliasWallet: string = "";
    creationDate: Date = new Date();
    modificationDate: Date = new Date();
    idWalletState: number = 0;

    constructor(wallet?: Partial<Wallet>) {
        if (wallet) {
            Object.assign(this, wallet);
        }
    }
}
