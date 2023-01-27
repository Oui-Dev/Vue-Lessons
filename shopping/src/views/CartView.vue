<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import ProductCard from "@/components/ProductCard.vue";

const store = useCartStore();
const cartItems = computed(() => store.items);
const cardTotal = computed(() => store.getCartTotalPrice);

const reset = () => store.resetCart();
</script>

<template>
    <main>
        <div class="text-center mt-2 mb-8">
            <h2 class="text-2xl font-bold text-gray-700">Shopping Cart</h2>
        </div>
        <section v-if="cartItems.length > 0">
            <div class="flex justify-center gap-12 flex-wrap">
                <ProductCard v-for="item in cartItems" :key="item.product.id"
                    :product="item.product"
                    :quantity="item.quantity"
                    type="cart" class="group"
                />
            </div>
            <div class="w-fit mx-auto text-center mt-14 border-solid border-t border-gray-300 pt-3 px-6">
                <span class="pr-6">Total : ${{ cardTotal }}</span>
                <button @click="reset" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                    Checkout
                </button>
            </div>
        </section>
        <div v-else class="text-center">
            <h3 class="text-xl font-normal text-gray-500">Your cart is empty</h3>
        </div>
    </main>
</template>
