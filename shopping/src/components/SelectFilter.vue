<script setup>
import { useItemsStore } from '@/stores/items';
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { reactive, watch } from 'vue';

const store = useItemsStore();
const form = reactive({ 
    search: '',
    filter: 'rating'
});

watch(() => ({...form}), (newValue, oldValue) => {
    if(newValue.search !== oldValue.search) {
        store.searchItems(newValue.search);
    } else if(newValue.filter !== oldValue.filter) {
        store.orderItems(newValue.filter);
    }
}, { deep: true });
</script>

<template>
    <div class="mx-auto max-w-md relative rounded-full shadow-sm mt-3 mb-8">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-800" />
        </div>
        <input type="text" v-model="form.search" placeholder="Search..."/>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <select v-model="form.filter">
                <option value="rating">Best to worst</option>
                <option value="r-rating">Worst to best</option>
                <option value="name">A to Z</option>
                <option value="r-name">Z to A</option>
            </select>
        </div>
    </div>
</template>

<style lang="scss" scoped>
input {
        @apply block w-full rounded-full pl-10 pr-32 py-2 bg-transparent border border-gray-900 sm:text-sm focus:outline-green-500;
    }

select {
    @apply h-full rounded-md border-transparent bg-transparent pr-2 text-right text-gray-700 focus:outline-none cursor-pointer;
    
    option {
        @apply text-gray-700;
    }
}
</style>