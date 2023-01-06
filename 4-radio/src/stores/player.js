import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('playerStation', () => {
    const station = ref({});

    function set(newStation) {
        station.value = newStation;
    }

    return { station, set };
})
