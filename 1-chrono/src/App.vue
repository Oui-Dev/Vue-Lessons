<script setup>
import { ref } from 'vue';

const angleMin = ref(0);
const angleSec = ref(0);
const intervalId = ref(null);

const start = () => {
    intervalId.value = setInterval(() => {
        angleSec.value += 6;
        if(angleSec.value === 360) {
            angleSec.value = 0;
            angleMin.value += 6;
        }
    }, 1000);
};

const stop = () => {
    clearInterval(intervalId.value);
    intervalId.value = null;
};

const reset = () => {
    if(intervalId.value) stop();
    angleMin.value = 0;
    angleSec.value = 0;
};
</script>

<template>
    <header class="flex items-center justify-center">
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="80" height="80" />
    </header>

    <main class="flex flex-col gap-4 items-center justify-center mt-8">
        <svg width="200" height="200">
            <circle cx="100" cy="100" r="95" fill="#fff" stroke="#000" stroke-width="5"/>
            <line x1="100" y1="100" x2="100" y2="60" stroke="#000" stroke-width="5" :transform="`rotate(${angleMin} 100 100)`" />
            <line x1="100" y1="100" x2="100" y2="30" stroke="#f00" stroke-width="3" :transform="`rotate(${angleSec} 100 100)`" />
        </svg>
        <div class="flex gap-4">
            <button v-if="intervalId" @click="stop">Stop</button>
            <button v-else @click="start">Start</button>
            <button @click="reset">Reset</button>
        </div>
    </main>
</template>