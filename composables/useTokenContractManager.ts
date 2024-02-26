import {
    POSITION_MANAGER_CODE,
    SWAP_ROUTER_CODE,
} from "~/utils/constants/contracts";
import {
    checkTokenContractApprove,
    approveTokenContract,
} from "~/services/wallet.api";

export const useTokenContractManager = () => {
    const connectionStore = useConnectionStore();

    const isLoading = ref(false);
    const isApprovedPM0 = ref(false);
    const isApprovedPM1 = ref(false);
    const isApprovedSR0 = ref(false);
    const isApprovedSR1 = ref(false);
    const isApprovingPM0 = ref(false);
    const isApprovingPM1 = ref(false);
    const isApprovingSR0 = ref(false);
    const isApprovingSR1 = ref(false);

    const isAllApproved = computed(() => {
        return (
            isApprovedPM0.value &&
            isApprovedPM1.value &&
            isApprovedSR0.value &&
            isApprovedSR1.value
        );
    });

    const checkApprovePositionManager = async (
        tokenId: number,
        approved: Ref<boolean>
    ) => {
        try {
            isLoading.value = true;

            const response = await checkTokenContractApprove(
                connectionStore.owner,
                tokenId,
                POSITION_MANAGER_CODE,
                connectionStore.chainId
            );

            if (response) approved.value = true;
        } finally {
            isLoading.value = false;
        }
    };

    const checkApproveSwapRouter = async (
        tokenId: number,
        approved: Ref<boolean>
    ) => {
        try {
            isLoading.value = true;

            const response = await checkTokenContractApprove(
                connectionStore.owner,
                tokenId,
                SWAP_ROUTER_CODE,
                connectionStore.chainId
            );

            if (response) approved.value = true;
        } finally {
            isLoading.value = false;
        }
    };

    const approvePositionManager = async (
        tokenId: number,
        approved: Ref<boolean>,
        approving: Ref<boolean>
    ) => {
        try {
            approving.value = true;

            const response = await approveTokenContract(
                connectionStore.owner,
                tokenId,
                POSITION_MANAGER_CODE,
                connectionStore.chainId
            );

            if (response) approved.value = true;
        } finally {
            approving.value = false;
        }
    };

    const approveSwapRouter = async (
        tokenId: number,
        approved: Ref<boolean>,
        approving: Ref<boolean>
    ) => {
        try {
            approving.value = true;

            const response = await approveTokenContract(
                connectionStore.owner,
                tokenId,
                SWAP_ROUTER_CODE,
                connectionStore.chainId
            );

            if (response) approved.value = true;
        } finally {
            approving.value = false;
        }
    };

    return {
        isLoading,
        isApprovedPM0,
        isApprovedPM1,
        isApprovedSR0,
        isApprovedSR1,
        isApprovingPM0,
        isApprovingPM1,
        isApprovingSR0,
        isApprovingSR1,
        isAllApproved,
        checkApprovePositionManager,
        checkApproveSwapRouter,
        approvePositionManager,
        approveSwapRouter,
    };
};
