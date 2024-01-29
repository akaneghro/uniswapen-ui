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
});
</script>

<template>
    <div
        class="p-6 bg-slate-900 rounded-2xl border border-slate-600 cu-box-shadow"
    >
        <div class="relative mb-5">
            <button
                v-if="back"
                @click="useRouter().back()"
                class="absolute mr-4"
            >
                <IconBack :size="28" />
            </button>
            <p v-if="title" class="text-center text-xl">{{ title }}</p>
        </div>
        <slot />
    </div>
</template>

<style lang="scss" scoped></style>
