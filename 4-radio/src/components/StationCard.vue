<script setup>
import { PlayIcon, StarIcon, RadioIcon, SpeakerWaveIcon } from '@heroicons/vue/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/vue/24/solid';
import { useFavoritesStore } from '@/stores/favorites';
import { usePlayerStore } from '@/stores/player';
import { computed } from 'vue';

const props = defineProps({
    station: {
        type: Object,
        required: true
    }
})

const favStore = useFavoritesStore();
const playerStore = usePlayerStore();
const blacklistDomain = ['kolectiv.fr', 'www.echoes.gr', '970universal.com', 'www.salue.de', 'radiosummernight.ch', 'lh3.googleusercontent.com', 'brigadanews.ph', 'cdnnmundo1.img.sputniknews.com', 'cdnn1.img.sputniknews.com', 'liveradios.in', 'www.deepinradio.com', 'dashradio.com', 'www.addictradio.net', 'beemboomradio.com', '945khi.com'];

const isFav = computed(() => favStore.stations.includes(props.station));
const isCurrentlyPlaying = computed(() => playerStore.station.id === props.station.id);
const checkImageUrl = computed(() =>{
    if(!props.station.favicon) return false;
    if(blacklistDomain.includes(new URL(props.station.favicon).hostname)) return false;
    return true;
});

const play = () => {
    playerStore.set(props.station);
}

const toggleFav = () => {
    if (isFav(props.station)) favStore.remove(props.station.id);
    else favStore.add(props.station);
}
</script>

<template>
    <li>
        <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-1 truncate">
                <div class="flex items-center space-x-3">
                    <h3 class="truncate text-sm font-medium text-gray-900 dark:text-white" :title="station.name">{{ station.name }}</h3>
                    <span class="inline-block flex-shrink-0 rounded-full bg-green-400 px-2 py-0.5 text-xs font-medium text-black">
                        Bitrate : {{ station.bitrate }}
                    </span>
                </div>
                <p class="mt-1 truncate text-sm text-gray-800 dark:text-gray-300">Country : {{ station.country }}</p>
            </div>
            <img v-if="checkImageUrl" :src="station.favicon" class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" alt="Radio logo" />
            <RadioIcon v-else class="h-10 w-10 flex-shrink-0 rounded-full text-gray-900 dark:text-white" />
        </div>
        <div>
            <div class="-mt-px flex divide-x divide-zinc-300 dark:divide-zinc-700">
                <div class="flex w-0 flex-1">
                    <div v-if="isCurrentlyPlaying" class="card-btn">
                        <SpeakerWaveIcon class="h-5 w-5 text-green-500" aria-hidden="true" />
                        <span class="ml-3 text-green-500">Playing</span>
                    </div>
                    <button v-else @click="play" class="card-btn">
                        <PlayIcon class="h-5 w-5 text-gray-700 dark:text-gray-200" aria-hidden="true" />
                        <span class="ml-3">Play</span>
                    </button>
                </div>
                <div class="-ml-px flex w-0 flex-1">
                    <button @click="toggleFav" class="card-btn">
                        <SolidStarIcon v-if="isFav" class="h-5 w-5 text-green-500" aria-hidden="true" />
                        <StarIcon v-else class="h-5 w-5 text-gray-700 dark:text-gray-200" aria-hidden="true" />
                        <span class="ml-3">Favorite</span>
                    </button>
                </div>
            </div>
        </div>
    </li>
</template>

<style scoped>
    li {
        @apply col-span-1 divide-y divide-zinc-300 dark:divide-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-800 shadow;
    }
    .card-btn {
        @apply relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-3 text-sm font-medium text-gray-900 dark:text-white hover:text-green-500;
    }
</style>