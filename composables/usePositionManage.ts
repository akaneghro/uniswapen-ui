import { get, close } from "~/apis/position.api";
import { PositionData } from "~/models/PositionData";

export const usePositionManage = () => {
    const connectionStore = useConnectionStore();

    const positionData: Ref<PositionData> = ref(new PositionData());

    const getPositionData = async (tokenId: number) => {
        positionData.value = await get(connectionStore.owner, tokenId);
    };

    const closePosition = async (tokenId: number): Promise<boolean> => {
        const positionClosed = await close(connectionStore.owner, tokenId);

        return positionClosed ? true : false;
    };

    return { positionData, getPositionData, closePosition };
};
