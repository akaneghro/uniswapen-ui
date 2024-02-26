import { Wallet } from "~/models/Wallet";
import { checkSecret, createWallet, getWallet } from "~/services/wallet.api";

export const useWalletManager = () => {
    const connectionStore = useConnectionStore();
    const { encrypt } = useCrypto();

    const wallet = ref<Wallet>(new Wallet());
    const isSaving = ref(false);

    const isCompletedForm = computed(() => {
        return wallet.value.aliasWallet;
    });

    const createNewWallet = async (secret: string): Promise<boolean> => {
        try {
            isSaving.value = true;

            wallet.value.publicKey = connectionStore.owner;

            wallet.value.secret = secret;

            const response = await createWallet(wallet.value);

            wallet.value = response;

            return true;
        } finally {
            isSaving.value = false;
        }
    };

    const encryptPrivateKey = async (
        secret: string,
        password: string
    ): Promise<string> => {
        const isValidPassword = await checkSecret(password);

        console.log(isValidPassword);

        if (!isValidPassword) return "";

        return encrypt(secret, password);
    };

    const checkWalletExists = async (): Promise<boolean> => {
        const response = await getWallet(connectionStore.owner);

        return response ? true : false;
    };

    const getWalletData = async () => {
        const response = await getWallet(connectionStore.owner);

        if (response) {
            wallet.value = response;
        }
    };

    return {
        isCompletedForm,
        isSaving,
        wallet,
        createNewWallet,
        encryptPrivateKey,
        checkWalletExists,
        getWalletData,
    };
};
