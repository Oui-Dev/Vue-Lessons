<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <RouterLink :to="{name: 'product', params: {id: product.id}}">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <img :src="product.thumbnail" :alt="product.title"
                class="h-full w-full object-cover object-center group-hover:opacity-75" />
        </div>
        <h3 class="mt-4 text-sm text-gray-700">{{ product.title }}</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">${{ product.price }}</p>
    </RouterLink>
</template>