<script setup>
import { useRoute } from 'vue-router';
import { useItemsStore } from '@/stores/items';
import { onMounted, computed, watch } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import SelectFilter from '../components/SelectFilter.vue';

const store = useItemsStore();
const route = useRoute();

onMounted(() => {
    store.fetchItemsByCategories(route.params.category);
});

watch(() => route.params, (value) => {
    store.fetchItemsByCategories(value.category);
});

const products = computed(() => store.items.products ?? []);
const isLoading = computed(() => store.isLoading ?? false);
</script>

<template>
    <main>
        <LoadingSpinner :display="isLoading" />
        <SelectFilter />

        <h2 class="sr-only">Products</h2>

        <div v-if="!isLoading" class="flex justify-center gap-12 flex-wrap">
            <ProductCard v-for="item in products" :key="item.id" :product="item" class="group" />
        </div>
    </main>
</template>