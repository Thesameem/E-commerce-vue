<script setup>
    
    import { onMounted, ref } from 'vue';

    import axios from 'axios';

    import ProductCard from './ProductCard.vue';


    const Products = ref([]);
    let isRequesting = ref(true);


    onMounted(() => {
        axios.get('https://dummyjson.com/products/category/smartphones')
        .then(function (response) {
            Products.value = response.data.products;
            isRequesting.value = false;
        });
    });


</script>

<template>
    <section class="products">
        <ul v-if="!isRequesting">
            <ProductCard v-for="product in Products" :product="product" :key="product.id" />        
        </ul>

        <div v-else class="loader">
            <img src="./../../images/loader.gif" alt="">
        </div>
    </section>
</template>