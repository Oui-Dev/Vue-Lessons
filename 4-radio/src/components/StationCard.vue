<script setup>
import { PlayIcon, StarIcon, RadioIcon } from '@heroicons/vue/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/vue/24/solid';
import { useFavoritesStore } from '@/stores/favorites';
import { usePlayerStore } from '@/stores/player';

defineProps({
    station: {
        type: Object,
        required: true
    }
})

const favStore = useFavoritesStore();
const playerStore = usePlayerStore();

const play = (station) => {
    playerStore.set(station);
}

const toggleFav = (station) => {
    if (isFav(station)) favStore.remove(station.id);
    else favStore.add(station);
}

const isFav = (station) => {
    return favStore.stations.includes(station);
}
</script>

<template>
    <li class="col-span-1 divide-y divide-zinc-700 rounded-lg bg-zinc-800 shadow">
        <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-1 truncate">
                <div class="flex items-center space-x-3">
                    <h3 class="truncate text-sm font-medium text-white" :title="station.name">{{ station.name }}</h3>
                    <span class="inline-block flex-shrink-0 rounded-full bg-green-400 px-2 py-0.5 text-xs font-medium text-black">
                        Bitrate : {{ station.bitrate }}
                    </span>
                </div>
                <p class="mt-1 truncate text-sm text-gray-300">Country : {{ station.country }}</p>
            </div>
            <img v-if="station.favicon" class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" :src="station.favicon" alt="Radio logo" />
            <RadioIcon v-else class="h-10 w-10 flex-shrink-0 rounded-full text-white" />
        </div>
        <div>
            <div class="-mt-px flex divide-x divide-zinc-700">
                <div class="flex w-0 flex-1">
                    <button @click="play(station)" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-3 text-sm font-medium text-white hover:text-green-500">
                        <PlayIcon class="h-5 w-5 text-gray-200" aria-hidden="true" />
                        <span class="ml-3">Play</span>
                    </button>
                </div>
                <div class="-ml-px flex w-0 flex-1">
                    <button @click="toggleFav(station)" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-3 text-sm font-medium text-white hover:text-green-500">
                        <SolidStarIcon v-if="isFav(station)" class="h-5 w-5 text-green-500" aria-hidden="true" />
                        <StarIcon v-else class="h-5 w-5 text-gray-200" aria-hidden="true" />
                        <span class="ml-3">Favorite</span>
                    </button>
                </div>
            </div>
        </div>
    </li>
</template>