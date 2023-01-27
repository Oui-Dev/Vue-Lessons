import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const items = ref([]);
    const getCartItems = computed(() => items.value);

    function addToCart(item) {
        items.value.push(item);
    }
    function removeFromCart(item) {
        items.value = items.value.filter(i => i.id !== item.id);
    }

    return { getCartItems, addToCart, removeFromCart };
});
