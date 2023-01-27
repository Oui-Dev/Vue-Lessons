<script setup>
import { useCartStore } from "@/stores/cart";
import { computed } from "vue";

const store = useCartStore();
const cartItems = computed(() => store.items);
console.log(cartItems.value);
</script>

<template>
    <main>

    </main>
</template>
