import { getAll } from "~/services/position.api";
import { PositionData } from "~/models/PositionData";

export const usePositionList = () => {
    const connectionStore = useConnectionStore();

    const positions: Ref<PositionData[]> = ref([]);

    const getOwnerPositions = async () => {
        positions.value = await getAll(
            connectionStore.owner,
            connectionStore.chainId
        );
    };

    return { positions, getOwnerPositions };
};
