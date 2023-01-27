<script setup>
defineProps({
    display: {
        type: Boolean,
        required: true,
    },
});
</script>

<template>
    <section v-if="display">
        <div class="spinner">
            <span class="spinner-inner-1"></span>
            <span class="spinner-inner-2"></span>
            <span class="spinner-inner-3"></span>
        </div>
    </section>
</template>

<style lang="scss" scoped>
$spinner: lightgreen;
$background: white;
$size: 50px;

section {
    @apply w-screen h-screen fixed inset-0 z-50 overflow-hidden;
    backdrop-filter: blur(5px);
}

.spinner {
    position: absolute;
    top: calc(50% - calc($size / 2));
    left: calc(50% - calc($size / 2));
    width: $size;
    height: $size;
    animation: spinner 0.75s linear infinite;

    span {
        @apply w-full h-full absolute rounded-full;
    }
    
    .spinner-inner-1 {
        background: linear-gradient(to right, rgba($spinner,0) 0%,rgba($spinner,0) 50%,$spinner 51%);
    }
    
    .spinner-inner-2 {
        background: linear-gradient(to top, rgba($background,0) 0%,$background 100%);
    }
    
    .spinner-inner-3 {
        $offset: $size * 0.1;
        top: $offset;
        left: $offset;
        width: calc($size - calc($offset * 2));
        height: calc($size - calc($offset * 2));
        background: $background;
    }
}

@keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>