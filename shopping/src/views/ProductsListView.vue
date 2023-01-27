<script setup>
import { useItemsStore } from '@/stores/items';
import { onMounted, computed } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const store = useItemsStore();

onMounted(() => {
    store.fetchItems();
});

const products = computed(() => store.items.products ?? []);
const isLoading = computed(() => store.isLoading ?? false);
</script>

<template>
    <main>
        <LoadingSpinner :display="isLoading" />
        <h2 class="sr-only">Products</h2>

        <div v-if="!isLoading" class="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
            <ProductCard v-for="item in products" :key="item.id" :product="item" class="group" />
        </div>
    </main>
</template>
