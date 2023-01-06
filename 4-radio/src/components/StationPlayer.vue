<script setup>
import { usePlayerStore } from '@/stores/player';
import { useFavoritesStore } from '@/stores/favorites';
import { PlayIcon, PauseIcon, StarIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/vue/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/vue/24/solid';
import { ref, computed, watch } from 'vue';

const playerStore = usePlayerStore();
const favStore = useFavoritesStore();
const audio = ref(new Audio());

const hasStation = computed(() => Object.keys(playerStore.station).length > 0);
const isFav = computed(() => favStore.stations.includes(playerStore.station));
const isMuted = ref(false);
const isPaused = ref(false);

watch(hasStation, (hasStation) => {
    if (hasStation) {
        audio.value = new Audio(playerStore.station.url);
        audio.value.play();
    }
});

const togglePlay = () => {
    audio.value.paused ? audio.value.play() : audio.value.pause();
    isPaused.value = audio.value.paused;
}

const toggleMute = () => {
    audio.value.muted = !audio.value.muted;
    isMuted.value = audio.value.muted;
}

const toggleFav = () => {
    if (isFav.value) favStore.remove(playerStore.station.id);
    else favStore.add(playerStore.station);
}
</script>

<template>
    <section v-if="hasStation" class="w-full h-full bg-zinc-800">
        <h3 class="text-lg text-gray-200 text-center pt-2">{{ playerStore.station.name }}</h3>
        <div class="player">
            <div @click="toggleMute">
                <SpeakerXMarkIcon v-if="isMuted" />
                <SpeakerWaveIcon v-else />
            </div>
            <div class="play" @click="togglePlay">
                <PlayIcon v-if="isPaused" />
                <PauseIcon v-else />
            </div>
            <div>
                <button @click="toggleFav">
                    <SolidStarIcon v-if="isFav" class="green" aria-hidden="true" />
                    <StarIcon v-else aria-hidden="true" />
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.player {
    @apply flex justify-between items-center gap-4 px-3 py-1 text-white;
}

svg {
    @apply w-5 h-5 text-gray-200 cursor-pointer;
}
div.play svg {
    @apply w-8 h-8 text-green-500;
}
svg.green {
    @apply text-green-500;
}
</style>