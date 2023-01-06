import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favoritesStations', () => {
    const stations = ref([]);

    function add(station) {
        stations.value.push(station);
    }

    function remove(id) {
        stations.value = stations.value.filter(s => s.id !== id);
    }

    return { stations, add, remove };
})
