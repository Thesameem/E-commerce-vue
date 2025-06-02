import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import ProductDetail from '@/views/ProductDetail.vue';
import Cart from '@/views/Cart.vue';
import WishList from '@/views/WishList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetail
    },
    {
      path: '/cart/',
      name: 'cart',
      component: Cart
    },
    {
      path: '/wish-list/',
      name: 'wishlist',
      component: WishList
    }
  ],
})

export default router
