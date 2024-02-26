<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: "",
    },
    back: {
        type: Boolean,
        default: false,
    },
    textBack: {
        type: String,
        default: "Back",
    },
    isModal: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["close"]);
</script>

<template>
    <div
        class="p-6 bg-slate-900 rounded-2xl border border-slate-600 cu-box-shadow"
    >
        <div class="relative mb-10">
            <button
                v-if="back"
                :value="textBack"
                @click="useRouter().back()"
                class="absolute top-0 left-0"
            >
                <div class="flex items-center">
                    <IconBack :size="28" />
                    <p class="text-sm text-slate-300 ml-1">{{ textBack }}</p>
                </div>
            </button>
            <p v-if="title" class="text-center text-xl">{{ title }}</p>
            <button
                v-if="isModal"
                @click="$emit('close')"
                class="absolute top-0 right-0"
            >
                <IconClose :size="28" />
            </button>
        </div>
        <slot />
    </div>
</template>

<style lang="scss" scoped></style>
