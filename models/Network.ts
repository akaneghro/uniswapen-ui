export class Network {
    idNetwork: number = 0;
    code: string = "";
    name: string = "";
    chainId: number = 0;
    chainIdHex: string = "";
    logo: string = "";
    isMainnet: boolean = false;

    constructor(network?: Partial<Network>) {
        if (network) {
            Object.assign(this, network);
        }
    }
}
