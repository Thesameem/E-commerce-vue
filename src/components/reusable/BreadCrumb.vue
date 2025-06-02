<script setup>

    import { useRoute } from 'vue-router';

    const route = useRoute();

</script>

<template>
    <section class="details">
        <div class="product-details">
            <h1 v-if="route.name == 'wishlist'">Wish List</h1>
            <h1 v-else-if="route.name == 'cart'">Shopping Cart</h1>
            <h1 v-else>Product Details</h1>
            <span>home{{ route.fullPath }}</span>
        </div>
        <div class="image1">
            <img src="./../../images/Mobile-bro.png" alt="Mobile-bro">
        </div>
        <div class="image2">
            <img src="./../../images/Mobile note list-amico.png" alt="Mobile note list-amico">
        </div>
    </section>
</template>