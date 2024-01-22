<script lang="ts" setup>
defineProps({
    lowerRange: {
        type: String,
        required: true,
    },
    upperRange: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <InputContainer>
        <div>
            <slot />
            <p class="text-slate-400 text-sm mt-2">
                Min: <span class="text-white">{{ lowerRange }}</span>
                <span class="text-white"> ⇿ </span>Max:
                <span class="text-white">{{ upperRange }}</span>
            </p>
        </div>
    </InputContainer>
</template>

<style lang="scss" scoped></style>
