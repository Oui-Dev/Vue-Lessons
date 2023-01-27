import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const items = ref([]);
    const getCartCount = computed(() => {
        let count = 0;
        items.value.forEach(item => {
            count += item.quantity;
        });
        return count;
    })
    const getCartTotalPrice = computed(() => {
        let total = 0;
        items.value.forEach(item => {
            total += item.quantity * item.price;
        });
        return total;
    });

    function addToCart(product) {
        const item = items.value.find(item => item.id === product.id);

        if(item) item.quantity++;
        else items.value.push({ product, quantity: 1 });
    }
    function removeFromCart(id) {
        const item = items.value.find(item => item.id === id);

        if(item.quantity > 1) item.quantity--;
        else items.value = items.value.filter(item => item.product.id !== id);
    }

    return { items, getCartCount, getCartTotalPrice, addToCart, removeFromCart };
});
