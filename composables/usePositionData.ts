import { getOpenedPositions } from "../services/api";
import type PositionData from "~/types/PositionData";

export const usePositionData = () => {
    const connectionStore = useConnectionStore();

    const positions: Ref<PositionData[]> = ref([]);

    const getPositions = async () => {
        positions.value = await getOpenedPositions(connectionStore.owner);
    };

    return { positions, getPositions };
};
