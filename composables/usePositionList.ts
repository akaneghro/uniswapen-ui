import { getAll } from "~/apis/position.api";
import { PositionData } from "~/models/PositionData";

export const usePositionList = () => {
    const connectionStore = useConnectionStore();
    const networkStore = useNetworkStore();

    const positions: Ref<PositionData[]> = ref([]);

    const getOwnerPositions = async () => {
        positions.value = await getAll(
            connectionStore.owner,
            networkStore.currentNetwork?.chainId ?? 0
        );
    };

    return { positions, getOwnerPositions };
};
