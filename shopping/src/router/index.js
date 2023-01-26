import { createRouter, createWebHistory } from 'vue-router';
import ProductsListView from '../views/ProductsListView.vue';
import ProductView from '../views/ProductView.vue';
import CategoriesView from '../views/CategoriesView.vue';
import CartView from '../views/CartView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'products',
            component: ProductsListView
        },
        {
            path: '/product/:id',
            name: 'product',
            component: ProductView
        },
        {
            path: '/categories',
            name: 'categories',
            component: CategoriesView
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        }
    ]
})

export default router
