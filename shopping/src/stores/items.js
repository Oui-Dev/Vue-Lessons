import { defineStore } from 'pinia'

export const useItemsStore = defineStore({
    id: 'items',
    state: () => ({
        items: []
    }),
    actions: {
        fetchItems() {
            fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                this.items = data
            });
        }
    },
    getters: {
        getItems(state) {
            return state.items
        },
        // getitemsByCategory(category) {
        //     return this.items.filter(item => item.category === category);
        // }
    }
})



//     API Response
//
//{
//   "products": [
//     {
//       "id": 1,
//       "title": "iPhone 9",
//       "description": "An apple mobile which is nothing like apple",
//       "price": 549,
//       "discountPercentage": 12.96,
//       "rating": 4.69,
//       "stock": 94,
//       "brand": "Apple",
//       "category": "smartphones",
//       "thumbnail": "...",
//       "images": ["...", "...", "..."]
//     },
//     {...},
//     {...},
//     {...}
//     // 30 items
//   ],

//   "total": 100,
//   "skip": 0,
//   "limit": 30
// }