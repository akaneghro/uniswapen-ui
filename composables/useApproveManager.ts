import {
    POSITION_MANAGER_CODE,
    SWAP_ROUTER_CODE,
} from "~/utils/constants/contracts";
import { checkApprove, createApprove } from "~/services/approve.api";

export const useApproveManager = () => {
    const connectionStore = useConnectionStore();
    const networkStore = useNetworkStore();

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
        idToken: number,
        approved: Ref<boolean>
    ) => {
        try {
            isLoading.value = true;

            const response = await checkApprove(
                connectionStore.owner,
                idToken,
                POSITION_MANAGER_CODE,
                networkStore.currentNetwork?.chainId ?? 0
            );

            if (response) approved.value = true;
        } finally {
            isLoading.value = false;
        }
    };

    const checkApproveSwapRouter = async (
        idToken: number,
        approved: Ref<boolean>
    ) => {
        try {
            isLoading.value = true;

            const response = await checkApprove(
                connectionStore.owner,
                idToken,
                SWAP_ROUTER_CODE,
                networkStore.currentNetwork?.chainId ?? 0
            );

            if (response) approved.value = true;
        } finally {
            isLoading.value = false;
        }
    };

    const approvePositionManager = async (
        idToken: number,
        approved: Ref<boolean>,
        approving: Ref<boolean>
    ) => {
        try {
            approving.value = true;

            const response = await createApprove(
                connectionStore.owner,
                idToken,
                POSITION_MANAGER_CODE,
                networkStore.currentNetwork?.chainId ?? 0
            );

            if (response) approved.value = true;
        } finally {
            approving.value = false;
        }
    };

    const approveSwapRouter = async (
        idToken: number,
        approved: Ref<boolean>,
        approving: Ref<boolean>
    ) => {
        try {
            approving.value = true;

            const response = await createApprove(
                connectionStore.owner,
                idToken,
                SWAP_ROUTER_CODE,
                networkStore.currentNetwork?.chainId ?? 0
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
