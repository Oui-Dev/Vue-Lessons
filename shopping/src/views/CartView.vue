<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import ProductCard from "@/components/ProductCard.vue";

const store = useCartStore();
const cartItems = computed(() => store.items);
const cardTotal = computed(() => store.getCartTotalPrice);

function reset() {
    store.resetCart();
}
</script>

<template>
    <main>
        <div class="max-w-2xl mx-auto text-center mt-2 mb-6">
            <h2 class="text-2xl font-bold text-gray-700">Shopping Cart</h2>
        </div>
        <section v-if="cartItems.length > 0">
            <div class="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
                <ProductCard v-for="item in cartItems" :key="item.product.id"
                    :product="item.product"
                    :quantity="item.quantity"
                    type="cart" class="group"
                />
            </div>
            <div class="max-w-2xl mx-auto text-center mt-8">
                <span class="pr-6">Total : ${{ cardTotal }}</span>
                <button @click="reset" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                    Checkout
                </button>
            </div>
        </section>
        <div v-else class="max-w-2xl mx-auto text-center mt-2">
            <h3 class="text-xl font-normal text-gray-500">Your cart is empty</h3>
        </div>
    </main>
</template>
