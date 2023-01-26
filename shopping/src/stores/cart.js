import { defineStore } from 'pinia'

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        items: []
    }),
    actions: {
        addItem(item) {
            this.items.push(item)
        },
        
        removeItem(item) {
            this.items = this.items.filter(i => i.id !== item.id)
        }
    }
})
