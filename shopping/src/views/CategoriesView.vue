<script setup>
import { useItemsStore } from '@/stores/items';
import { onMounted, computed, ref, watch } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ProductCard from '@/components/ProductCard.vue';

const store = useItemsStore();
const selectedCategory = ref('smartphones');

onMounted(() => {
    store.fetchCategories();
    store.fetchItemsByCategories(selectedCategory.value);
});

watch(selectedCategory, (value) => {
    store.fetchItemsByCategories(value);
});

const products = computed(() => store.items.products ?? []);
const categories = computed(() => store.items.categories ?? []);
const isLoading = computed(() => store.isLoading ?? false);
</script>

<template>
    <main>
        <LoadingSpinner :display="isLoading" />
        <div class="flex flex-col items-center w-full">
            <select v-model="selectedCategory" class="mb-8 w-fit">
                <option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
            </select>
        </div>

        <h2 class="sr-only">Products</h2>

        <div v-if="!isLoading" class="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
            <ProductCard v-for="item in products" :key="item.id" :product="item" class="group" />
        </div>
    </main>
</template>
