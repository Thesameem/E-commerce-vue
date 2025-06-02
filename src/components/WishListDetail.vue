<script setup>

    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { GetData, SetData } from '@/scripts/LocalStorage';

    const router = useRouter();

    // wishlist local storage
    const WishListItems = ref(GetData('wish-list'));

    // cart local storage
    const UserCartData = GetData('cart-list');

    const RemoveFromWishlist = (index) => {
        // remove array from the index
        WishListItems.value.splice(index, 1);

        SetData('wish-list', WishListItems.value);
    }

    const DiscountPrice = (product) => {
        let price =  product.price;
        let discount =  product.discountPercentage;

        let actualPrice = price - price*discount/100;
        return actualPrice.toFixed(2);
    }

    const AddToCart = (wishlist, toRoute) => {
        let cart = {
            product: wishlist.product,
            color: wishlist.color,
            quantity: 1,
            price: DiscountPrice(wishlist.product)
        };

        // check for duplicate product
        let hasDuplicate = false;
        UserCartData.map (element => {
            if (element.product.id == wishlist.product.id) {
                element.quantity += 1;
                hasDuplicate = true;
            }

            return true;
        });

        if (!hasDuplicate) UserCartData.push(cart);

        SetData('cart-list', UserCartData);

        // now route to shopping cart
        if (toRoute) {
            router.push({
                path: '/cart/'
            });
        }
    }


    const AddAllToCart = () => {
        WishListItems.value.forEach(wishlist => {
            AddToCart(wishlist, false);
        });

        router.push({
            path: '/cart/'
        });
    }

</script>

<template>
    <!-- wishlist product section -->
    <div class="wishlist-product-section">
        <div class="wproduct-detail-heading">
            <span>Product</span>
            <span>Price</span>
            <span>Date Added</span>
            <span>Stock Status</span>
        </div>
        <ul>
            <li v-for="(wishlist, index) in WishListItems" :key="index">
                <img src="./../images/close.svg" @click="RemoveFromWishlist(index)" alt="">
                <div class="wimage">
                    <img :src="wishlist.product.thumbnail" alt="">
                </div>
                <div class="wproduct">
                    <h6>{{ wishlist.product.title }}</h6>
                    <p>Color : {{ wishlist.color }}</p>
                </div>
                <p>${{ wishlist.price }}</p>
                <p>{{ wishlist.date }}</p>
                <div class="inStock">
                    <p v-if="wishlist.product.stock == 0">Out of Stock</p>
                    <p v-else>In Stock</p>
                </div>
                <div class="button" @click="AddToCart(wishlist, true)">
                    <p>Add to Cart</p>
                </div>
            </li>
        </ul>

        <div class="wishlist-link-section">
            <div class="wishlist-links">
                <p>Wishlist link:</p>
                <input type="text" placeholder="https://www.example.com">
                <button>Copy</button>
            </div>
            <div class="wishlist-cart">
                <p>Clear Wishlist</p>
                <button @click="AddAllToCart()">Add All to Cart</button>
            </div>
        </div>

     </div>
</template>