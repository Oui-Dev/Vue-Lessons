<script setup>
const emit = defineEmits(['close']);

defineProps({
    image: {
        type: String,
        required: true,
    },
});

const close = (e) => {
    if(e.target.tagName === 'IMG') return;
    emit('close');
};
</script>

<template>
    <section v-if="image" @click="(e) => close(e)">
        <img :src="image" alt="image" />
    </section>
</template>

<style lang="scss" scoped>
section {
    @apply w-screen h-screen fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-40;
    backdrop-filter: blur(5px);

    img {
        @apply fixed top-1/2 left-1/2 object-contain select-none shadow-xl rounded-lg;
        max-width: 75vw;
        max-height: 75vh;
        transform: translate(-50%, -50%);
    }
}
</style>