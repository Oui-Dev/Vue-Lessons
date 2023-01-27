import { createRouter, createWebHistory } from 'vue-router';
import ProductsList from '../views/ProductsList.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'products',
            component: ProductsList
        },
        {
            path: '/categories/:category',
            name: 'categories',
            component: ProductsList
        },
        {
            path: '/product/:id',
            name: 'product',
            component: ProductView
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        }
    ]
})

export default router
