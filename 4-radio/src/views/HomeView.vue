<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { RadioBrowserApi } from 'radio-browser-api';
import { ref, watch, onMounted } from 'vue';
import { useStationsStore } from '@/stores/stations';
import StationCard from '@/components/StationCard.vue';

const api = new RadioBrowserApi('Vue radio app');
api.setBaseUrl('https://de1.api.radio-browser.info');

const store = useStationsStore();
const stations = ref(store.stations);
const form = ref({
    search: '',
    country: 'FR'
});

onMounted(() => {
    getStations();
})

watch(form, async (value) => {
    if(value.search.length > 1 || value.country !== '') {
        stations.value = await api.searchStations({
            ...(value.search.length > 1 && { name: value.search }),
            ...(value.country !== '' && { countryCode: value.country }),
            hasGeoInfo: true,
            limit: 60
        });
    } else {
        getStations();
    }
}, { deep: true })

async function getStations() {
    if(stations.value.length === 0) {
        stations.value = await api.searchStations({
            countryCode: form.value.country,
            hasGeoInfo: true,
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
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-800 dark:text-gray-400" />
        </div>
        <input type="text" v-model="form.search" placeholder="Search..."/>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <select v-model="form.country">
                <option value="">All</option>
                <option value="FR">France</option>
                <option value="US">USA</option>
                <option value="DE">Germany</option>
                <option value="GB">UK</option>
                <option value="IT">Italy</option>
                <option value="ES">Spain</option>
                <option value="CA">Canada</option>
                <option value="RU">Russia</option>
                <option value="JP">Japan</option>
                <option value="CN">China</option>
                <option value="KR">South Korea</option>
                <option value="IN">India</option>
                <option value="BR">Brazil</option>
                <option value="AU">Australia</option>
            </select>
      </div>
    </div>

    <!-- Stations list -->
    <ul role="list">
        <StationCard v-for="station in stations" :key="station.id" :station="station" />
    </ul>
</template>

<style scoped>
    ul {
        @apply grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 overflow-y-auto overflow-x-hidden;
        max-height: 66vh;
    }

    input {
        @apply block w-full rounded-full pl-10 pr-32 py-2 bg-transparent border border-gray-900 dark:border-gray-500 sm:text-sm;
    }

    select {
        @apply h-full rounded-md border-transparent bg-transparent pr-2 text-right text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer;
    }
    select option {
        @apply text-gray-700;
    }
</style>