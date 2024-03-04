export class Approve {
    idApprove: number = 0;
    idWallet: number = 0;
    idToken: number = 0;
    idContract: number = 0;
    creationDate: Date = new Date();

    constructor(approve?: Partial<Approve>) {
        Object.assign(this, approve);
    }
}
