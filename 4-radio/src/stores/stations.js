import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useStationsStore = defineStore('allStations', () => {
    const stations = ref([]);

    function set(newStations) {
        stations.value = newStations;
    }

    return { stations, set };
})