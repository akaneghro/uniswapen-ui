<script lang="ts" setup>
import { formatAccount } from "../utils/formatFunctions";
import { copyToClipboard } from "../utils/formFunctions";

definePageMeta({
    title: "New wallet",
    layout: "simple",
});

const connectionStore = useConnectionStore();

const {
    wallet,
    isCompletedForm,
    isSaving,
    encryptPrivateKey,
    createNewWallet,
} = useWalletManager();

const password = ref("");

const openModal = ref(false);

const saveWallet = async () => {
    const encrypted = await encryptPrivateKey(
        wallet.value.secret,
        password.value
    );

    if (!encrypted) return;

    const res = await createNewWallet(encrypted);

    if (!res) return;

    useRouter().push("/add-liquidity");
};
</script>

<template>
    <div class="pt-12 pb-12">
        <Container title="New wallet">
            <div class="mb-5">
                <Label message="Public Key:" class="mb-2" />
                <ContainerInside>
                    <Input
                        :value="formatAccount(connectionStore.owner)"
                        readonly
                        class="cursor-pointer"
                        @click="copyToClipboard(connectionStore.owner)"
                    />
                </ContainerInside>
            </div>
            <div class="mb-10">
                <Label message="Alias:" class="mb-2" />
                <ContainerInside>
                    <Input v-model="wallet.aliasWallet" maxlength="20" />
                </ContainerInside>
            </div>
            <Button
                title="Save wallet"
                :disabled="!isCompletedForm"
                :isLoading="isSaving"
                @click="openModal = true"
            />
        </Container>

        <Modal v-if="openModal" @closeModal="openModal = false">
            <div>
                <div class="mb-5">
                    <Label message="Private Key:" class="mb-2" />
                    <ContainerInside>
                        <Input
                            v-model="wallet.secret"
                            type="password"
                            maxlength="64"
                        />
                    </ContainerInside>
                </div>

                <div class="mb-5">
                    <Label message="Password:" class="mb-2" />
                    <ContainerInside>
                        <Input
                            v-model="password"
                            type="password"
                            maxlength="64"
                        />
                    </ContainerInside>
                </div>

                <Button
                    title="Save wallet"
                    :disabled="wallet.secret.length !== 64 || !password"
                    :isLoading="isSaving"
                    @click="saveWallet()"
                />
            </div>
        </Modal>
    </div>
</template>

<style lang="scss" scoped></style>
