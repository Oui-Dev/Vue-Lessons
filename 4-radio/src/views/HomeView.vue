<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { RadioBrowserApi, StationSearchType } from 'radio-browser-api';
import { ref, watch, onMounted } from 'vue';
import { useStationsStore } from '@/stores/stations';
import StationCard from '@/components/StationCard.vue';

const store = useStationsStore();
const search = ref('');
const stations = ref(store.stations);
const api = new RadioBrowserApi('Vue radio app');

onMounted(() => {
    getStations();
})

watch(search, async (value) => {
    if (value.length >= 2) {
        stations.value = await api.getStationsBy(StationSearchType.byName, value, {
            hasGeoInfo: true,
            limit: 60
        });
        console.log('search', stations.value);
    } else {
        getStations();
    }
})

async function getStations() {
    if(stations.value.length === 0) {
        stations.value = await api.searchStations({
            countryCode: 'FR',
            hasGeoInfo: true,
            language: 'french',
            limit: 60
        })

        store.set(stations.value);
    } else {
        stations.value = store.stations;
    }
}
</script>

<template>
    <!-- Search input -->
    <div class="mx-auto max-w-md relative rounded-full shadow-sm mt-8">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
        </div>
        <input type="text" v-model="search" class="block w-full rounded-full pl-10 py-2 bg-transparent border border-gray-500 sm:text-sm" placeholder="Search..."/>
    </div>

    <!-- Stations list -->
    <ul role="list">
        <StationCard v-for="station in stations" :key="station.id" :station="station" />
    </ul>
</template>

<style scoped>
    ul {
        @apply grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 overflow-y-auto overflow-x-hidden;
        max-height: 625px;
    }
</style>