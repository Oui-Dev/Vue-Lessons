<script setup>
import { usePlayerStore } from '@/stores/player';
import { useFavoritesStore } from '@/stores/favorites';
import { PlayIcon, PauseIcon, StarIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/vue/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/vue/24/solid';
import { ref, computed, watch, onMounted } from 'vue';

const playerStore = usePlayerStore();
const favStore = useFavoritesStore();
const audio = ref(new Audio());

const hasStation = computed(() => Object.keys(playerStore.station).length > 0);
const isFav = computed(() => favStore.stations.includes(playerStore.station));
const isMuted = ref(false);
const isPaused = ref(false);
const isLoading = ref(true);
const volume = ref(100);

onMounted(() => {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', () => {
            audio.value.play();
            isPaused.value = false;
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            audio.value.pause();
            isPaused.value = true;
        });
    }
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        }
    });
});

watch(playerStore, (store) => {
    if (store.station.url && hasStation.value) {
        if(audio.value.src) {
            isLoading.value = true;
            audio.value.pause();
        }

        audio.value = new Audio(playerStore.station.url);
        audio.value.play();
        audio.value.addEventListener('canplay', () => {
            isLoading.value = false;
        });
    }
});

watch(volume, (data) => {
    audio.value.volume = data / 100;
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
        <h3 class="text-base md:text-lg text-gray-200 text-center pt-2 uppercase">{{ playerStore.station.name }}</h3>
        <div class="player">
            <div class="volume-control relative">
                <SpeakerXMarkIcon v-if="volume <= 0 || isMuted" @click="toggleMute" />
                <SpeakerWaveIcon v-else @click="toggleMute" />
                <div>
                    <input v-model="volume" type="range" max="100">
                </div>
            </div>
            <div class="play" @click="togglePlay">
                <div v-if="isLoading" class="spinner"></div>
                <PlayIcon v-else-if="isPaused" />
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

.volume-control:hover > div {
    @apply block;
}
.volume-control > div {
    @apply absolute hidden bottom-full -left-3 py-3 px-2;
}
.volume-control > div > input {
    @apply w-8 accent-green-500 cursor-pointer;
    -webkit-appearance: slider-vertical;
}

.spinner {
   @apply w-8 h-8 rounded-full;
   background: radial-gradient(farthest-side,rgb(34 197 94) 94%,#0000) top/5px 5px no-repeat,
          conic-gradient(#0000 30%,rgb(34 197 94));
   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 5px),#000 0);
   animation: spin 1s infinite linear;
}

@keyframes spin {
   100% {
      transform: rotate(1turn);
   }
}
</style>