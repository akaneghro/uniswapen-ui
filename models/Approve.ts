export class Approve {
    idApprove: number;
    idWallet: number;
    idToken: number;
    idContract: number;

    constructor(approve?: Partial<Approve>) {
        Object.assign(this, approve);
    }
}
