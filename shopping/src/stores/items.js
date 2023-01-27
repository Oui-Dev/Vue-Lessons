import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useItemsStore = defineStore('items', () => {
    const items = ref([]);
    const backupItems = ref([]);
    const isLoading = ref(false);
    const error = ref(false);

    function fetchItems() {
        isLoading.value = true;
        return fetch('https://dummyjson.com/products?limit=100')
            .then(res => res.json())
            .then(data => {
                const tmp = data.products.sort((a, b) => b.rating - a.rating);
                items.value.products = tmp;
                backupItems.value = tmp;
                setTimeout(() => {isLoading.value = false;}, 500);
            });
    }
    function fetchCategories() {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => {
                items.value.categories = data;
            });
    }
    function fetchItemsByCategories(category) {
        if(category === 'others') {
            const subFct = () => {
                const tmp = items.value.products.filter(
                    item => item.category !== 'smartphones'
                    && item.category !== 'laptops'
                    && item.category !== 'fragrances'
                ).sort((a, b) => b.rating - a.rating);
                items.value.products = tmp;
                backupItems.value = tmp;
            };

            if(!items.value.products || items.value.products.length === 0) {
                fetchItems().then(() => subFct());
            } else {
                subFct();
            }
        } else {
            isLoading.value = true;
            fetch(`https://dummyjson.com/products/category/${category}`)
                .then(res => res.json())
                .then(data => {
                    const tmp = data.products.sort((a, b) => b.rating - a.rating);
                    items.value.products = tmp;
                    backupItems.value = tmp;
                    setTimeout(() => {isLoading.value = false;}, 500);
                });
        }
    }
    function fetchItemByID(id) {
        isLoading.value = true;
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => {
                if(res.ok) return res.json();
                else throw new Error('Item not found');
            })
            .then(data => {
                items.value.product = data;
                isLoading.value = false;
            })
            .catch(() => {
                isLoading.value = false;
                error.value = true;
            });
    }
    function searchItems(search) {
        items.value.products = backupItems.value;
        items.value.products = items.value.products.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    }
    function orderItems(order) {
        switch(order) {
            case 'rating':
                items.value.products.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                items.value.products.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }
        if(order.startsWith('r-')) items.value.products.reverse();
    }

    return { items, isLoading, error, fetchItems, fetchCategories, fetchItemsByCategories, fetchItemByID, searchItems, orderItems };
});


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