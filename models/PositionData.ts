import { PositionSerie } from "./PositionSerie";

export class PositionData {
    tokenId: number = 0;
    upperPrice: string = "";
    lowerPrice: string = "";
    currentPrice: string = "";
    creationDate: Date = new Date();
    isClosed: boolean = false;
    positionSerie: PositionSerie = new PositionSerie();

    constructor(positionData?: Partial<PositionData>) {
        if (positionData) {
            Object.assign(this, positionData);
        }
    }
}
