<script setup>
    
    import { ref } from 'vue';
    import { GetData } from '@/scripts/LocalStorage';


    const CartItems = ref(GetData('cart-list'));
    const WishItems = ref(GetData('wish-list'));

    const TotalCartItem = () => {
        let TotalItems = 0;

        CartItems.value.map (element => {
            TotalItems += element.quantity;
        });

        return TotalItems;
    }

    const TotalWishListItem = () => {
        return WishItems.value.length;
    }

</script>

<template>
    <header>
        <div class="logo">
            <div class="div">   
                <p>M</p>
            </div>
            <span>Mobile</span>
        </div>

        <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/product/121">Product details</router-link>
        <router-link to="/cart/">Shopping Cart</router-link>
        <router-link to="/wish-list/">Wishlist</router-link>
        </nav>

        <div class="imgs">
            <img src="./../../images/search.svg" alt="search">
            <span style="position: relative;"><img src="./../../images/wishlist.svg" alt="wishtlist"><strong class="cart-value">
                {{ TotalWishListItem() }}
            </strong></span>
            <span style="position: relative;"><img src="./../../images/cart.svg" alt="cart"><strong class="cart-value">
                {{ TotalCartItem() }}
            </strong></span>
            <img src="./../../images/profile.svg" alt="profile">
        </div>
    </header>
</template>