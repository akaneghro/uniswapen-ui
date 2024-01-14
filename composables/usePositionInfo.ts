import { getPositionsCount } from "../services/api";

export const usePositionInfo = () => {
    const connectionStore = useConnectionStore();

    const getPositionCount = async () => {
        const count = await getPositionsCount(connectionStore.owner);

        return count;
    };

    return { getPositionCount };
};
