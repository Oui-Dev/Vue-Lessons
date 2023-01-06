<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import StationCard from '@/components/StationCard.vue';

const store = useFavoritesStore();
const hasFavorites = computed(() => store.stations.length > 0);
</script>

<template>
    <h1 class="text-center text-xl text-gray-100 mt-8">My favorites stations</h1>

    <!-- Stations list -->
    <ul v-if="hasFavorites" role="list">
        <StationCard v-for="station in store.stations" :key="station.id" :station="station" />
    </ul>
    <h3 v-else class="text-center text-lg mt-10">You don't have any favorite station yet</h3>
</template>

<style scoped>
    ul {
        @apply grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 overflow-y-auto overflow-x-hidden;
        max-height: 625px;
    }
</style>