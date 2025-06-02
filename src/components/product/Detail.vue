<script setup>
    
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import { SetData, GetData } from '@/scripts/LocalStorage';

    import axios from 'axios';

    const route = useRoute();
    const router = useRouter();

    const ProductDetail = ref({});
    const Images = ref([]);
    const ActiveImage = ref('');
    let isRequesting = ref(true);

    let Counter = ref(1);

    // cart local storage
    const UserCartData = GetData('cart-list');



    onMounted(() => {
        let id = route.params.id;

        axios.get('https://dummyjson.com/products/' + id)
        .then(function (response) {
            ProductDetail.value = response.data;
            Images.value = response.data.images;
            ActiveImage.value = Images.value[0];


            isRequesting.value = false;
        });
    });


    const DiscountPrice = () => {
        let price =  ProductDetail.value.price;
        let discount =  ProductDetail.value.discountPercentage;

        let actualPrice = price - price*discount/100;
        return actualPrice.toFixed(2);
    }

    const UpdateImage = (image) => {
        ActiveImage.value = image;
    }

    // product color
    const ProductColors = ref([
        {
            id: 1,
            name: 'Brown',
            active: true,
        },
        {
            id: 2,
            name: 'Gray'
        },
        {
            id: 3,
            name: 'Light Green'
        },
        {
            id: 4,
            name: 'Maroon'
        },
        {
            id: 5,
            name: 'Blue'
        }
    ]);

    let Color = ref(ProductColors.value[0].name);

    const SelectColor = (color) => {
        ProductColors.value.map(element => {
            if (element.id == color.id) element.active = true;
            else element.active = false;
        });

        Color.value = color.name;
    }

    
    const AddToCart = () => {


        let cart = {
            product: ProductDetail.value,
            color: Color.value,
            quantity: Counter.value,
            price: DiscountPrice()
        };

        // check for duplicate product
        let hasDuplicate = false;
        UserCartData.map (element => {
            if (element.product.id == ProductDetail.value.id) {
                element.quantity += Counter.value;
                hasDuplicate = true;
            }

            return true;
        });

        if (!hasDuplicate) UserCartData.push(cart);

        SetData('cart-list', UserCartData);

        // now route to shopping cart
        router.push({
            path: '/cart/'
        })
    }

</script>

<template>
    <section class="full-details" v-if="!isRequesting">
        <div class="container">

            <div class="images">
                <div class="top-image">
                    <img :src="ActiveImage" :alt="ProductDetail.title">
                </div>

                <div class="bottom-image">
                    <div class="img1" v-for="(image, index) in Images" :key="index" @click="UpdateImage(image)">
                        <img :src="image" alt="">
                    </div>
            </div>
            </div>

            <div class="preferences">
                <p>{{ ProductDetail.brand }}</p>

                <h2>{{ ProductDetail.title }}</h2>

                <div class="ratings">
                    <img src="./../../images/star.svg" v-for="rate in Math.round(ProductDetail.rating)" alt="star">
                    <span>{{ ProductDetail.rating }}</span>
                    <p>({{ ProductDetail.reviews.length }} Reviews)</p>
                </div>

                <strong>${{ DiscountPrice() }}</strong>

                <p>{{ ProductDetail.description }}</p>

                <div class="colors">
                    <span>Color:</span>
                    <div class="color">
                        <div :class="[`color${color.id}`, color.active ? 'active' : '']" v-for="color in ProductColors" 
                                        :key="color.id"
                                        @click="SelectColor(color)"></div>     
                    </div>
                </div>
                <div class="quantity">
                    <div class="numbers">
                        <span @click="Counter--">-</span>
                            <input type="number" v-model="Counter">
                        <span @click="Counter++">+</span>
                    </div>
                    <button id="btn1" @click="AddToCart">Add to Cart</button>
                    <button id="btn2">Buy Now</button>
                </div>
            </div>
        </div>
    </section>

    <div v-else class="loader">
            <img src="./../../images/loader.gif" alt="">
        </div>
</template>