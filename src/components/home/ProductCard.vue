<script setup>

    import { useRouter } from 'vue-router';

    import { GetData, SetData } from '@/scripts/LocalStorage';

    const router = useRouter();

    const props = defineProps({
        product: {
            type: Object,
            default: {}
        }
    });

    let Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const DiscountPrice = () => {
        let price = props.product.price;
        let discount = props.product.discountPercentage;

        let actualPrice = price - price*discount/100;
        return actualPrice.toFixed(2)
    }

    const RouteToProduct = () => {
        router.push({
            path: '/product/' + props.product.id
        });
    }


    const AddToWishList = () => {
        
        let WishListData = GetData('wish-list');

        // today's date
        let date = new Date();
        let CurrentDate = date.getDate();
        let CurrentYear = date.getFullYear();
        let CurrentMonthName = Months[date.getMonth()];

        let wishlist = {
            product: props.product,
            price: DiscountPrice(),
            color: 'Black',
            date: `${CurrentDate} ${CurrentMonthName} ${CurrentYear}`
        }

        WishListData.push(wishlist);

        // save to storage
        SetData('wish-list', WishListData);

    }

</script>

<template>
    <li>

        <div class="images">
            <img src="./../../images/wishlist.svg" @click="AddToWishList()" alt="wishlist">
            <img src="./../../images/expand.svg" alt="expand">
            <img src="./../../images/cart.svg" alt="cart">
        </div>
        <div class="spa">
        <span>{{ Math.round(product.discountPercentage) }}% OFF</span>
        </div>

        <img @click="RouteToProduct" :src="product.thumbnail" alt="1">

        <div class="ratings">
            <p>{{ product.brand }}</p>
            <div class="star">
                <img src="./../../images/star.svg" alt="star">
                <span>{{ product.rating }}</span>
            </div>
        </div>
            <h3 @click="RouteToProduct">{{ product.title }}</h3>

            <strong>
                <p>${{ product.price }}</p>
                <p>${{ DiscountPrice() }}</p>
            </strong>

    </li>
</template>