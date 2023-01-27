import { defineStore } from 'pinia';

export const useItemsStore = defineStore({
    id: 'items',
    state: () => ({
        items: {},
        isLoading: false,
        error: false
    }),
    actions: {
        fetchItems() {
            this.isLoading = true;
            fetch('https://dummyjson.com/products?limit=100')
                .then(res => res.json())
                .then(data => {
                    this.items.products = data.products;
                    setTimeout(() => {this.isLoading = false;}, 500);
                });
        },
        fetchCategories() {
            fetch('https://dummyjson.com/products/categories')
                .then(res => res.json())
                .then(data => {
                    this.items.categories = data;
                });
        },
        fetchItemsByCategories(category) {
            this.isLoading = true;
            fetch(`https://dummyjson.com/products/category/${category}`)
                .then(res => res.json())
                .then(data => {
                    this.items.products = data.products;
                    setTimeout(() => {this.isLoading = false;}, 500);
                });
        },
        fetchItemByID(id) {
            this.isLoading = true;
            fetch(`https://dummyjson.com/products/${id}`)
                .then(res => {
                    if(res.ok) return res.json();
                    else throw new Error('Item not found');
                })
                .then(data => {
                    this.items.product = data;
                    this.isLoading = false;
                })
                .catch(() => {
                    this.isLoading = false;
                    this.error = true;
                });
        },

        getItemsFromSearch(search) {
            return this.items.products.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
        }
    },
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