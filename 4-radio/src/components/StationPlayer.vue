<script setup>
import { usePlayerStore } from '@/stores/player';
import { PlayIcon, PauseIcon, StarIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/vue/24/outline';
import { ref, computed, watch } from 'vue';

const store = usePlayerStore();
const hasStation = computed(() => Object.keys(store.station).length > 0);
const audio = ref(new Audio());
const isMuted = computed(() => audio.value.muted);
const isPaused = computed(() => audio.value.paused);

watch(hasStation, (hasStation) => {
    if (hasStation) {
        audio.value = new Audio(store.station.url);
        audio.value.play();
    }
});

const togglePlay = () => {
    audio.value.paused ? audio.value.play() : audio.value.pause();
    console.log(audio.value.paused);
}

const toggleMute = () => {
    audio.value.muted = !audio.value.muted;
}
</script>

<template>
    <section v-if="hasStation" class="w-full border-t border-zinc-600 bg-zinc-800">
        <div class="player">
            <div @click="toggleMute">
                <SpeakerWaveIcon v-if="isMuted" />
                <SpeakerXMarkIcon v-else />
            </div>
            <div class="play" @click="togglePlay">
                <PlayIcon v-if="isPaused" />
                <PauseIcon v-else />
                {{ isPaused }}
            </div>
            <div>
                <button @click="addFav(store.station.id)">
                    <StarIcon aria-hidden="true" />
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.player {
    @apply flex justify-between items-center gap-4 p-4 text-white;
}

svg {
    @apply w-5 h-5 text-gray-200 cursor-pointer;
}
div.play svg {
    @apply w-8 h-8 text-green-500;
}
</style>