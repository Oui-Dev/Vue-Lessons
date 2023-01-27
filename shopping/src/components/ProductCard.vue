<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { StarIcon } from '@heroicons/vue/20/solid';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: 'shop'
    },
    quantity: {
        type: Number,
        required: false,
        default: null,
    }
})

const reviewsAverage = computed(() => Math.round(props.product.rating));

function addToCart() {
    cartStore.addToCart(props.product);
}
function removeOneFromCart() {
    cartStore.removeOneFromCart(props.product.id);
}
function removeAllFromCart() {
    cartStore.removeAllFromCart(props.product.id);
}
</script>

<template>
    <div class="relative w-36 md:w-40 lg:w-48">
        <RouterLink :to="{name: 'product', params: {id: product.id}}">
            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img :src="product.thumbnail" :alt="product.title"
                    class="h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
            <div class="flex justify-between gap-2 mt-4">
                <h3 class="text-sm text-gray-700 truncate">{{ product.title }}</h3>
                <p class="-mt-1.5 text-lg font-medium text-gray-900">${{ product.price }}</p>
            </div>
        </RouterLink>
        <div v-if="type === 'shop'" class="absolute top-full flex justify-between w-full">
            <div class="flex items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                    :class="[reviewsAverage > rating ? 'text-yellow-400' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                    aria-hidden="true" />
            </div>
            <button @click="addToCart" class="hover:text-green-500 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
            </button>
        </div>
        <div v-else-if="type === 'cart'" class="absolute top-full flex justify-between w-full">
            <div class="flex items-center gap-3">
                <MinusIcon @click="removeOneFromCart" class="h-5 w-5 flex-shrink-0 cursor-pointer hover:text-green-500 p-0.5" />
                <p class="text-xl text-gray-700">{{ quantity }}</p>
                <PlusIcon @click="addToCart" class="h-5 w-5 flex-shrink-0 cursor-pointer hover:text-green-500 p-0.5" />
            </div>
            <button @click="removeAllFromCart" class="hover:text-red-500 p-1">
                <TrashIcon class="h-5 w-5" />
            </button>
        </div>
    </div>
</template>