import { defineStore } from 'pinia'

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        items: []
    }),
    actions: {
        getCartItems() {
            return this.items
        },

        addToCart(item) {
            this.items.push(item)
        },
        
        removeFromCart(item) {
            this.items = this.items.filter(i => i.id !== item.id)
        }
    }
})
