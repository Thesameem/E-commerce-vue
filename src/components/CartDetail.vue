<script setup>
    
    import { ref } from 'vue';
    import { GetData, SetData } from '@/scripts/LocalStorage';

    const UserCartData = ref(GetData('cart-list'));

    const Subtract = (cart) => {
        if (cart.quantity > 1) {
            cart.quantity -= 1;
            SetData('cart-list', UserCartData.value);
        }        
    }


    const Add = (cart) => {   
        if (cart.quantity < cart.product.stock) {
            cart.quantity += 1;
            SetData('cart-list', UserCartData.value);
        }
    }


    const CalculateItems = () => {
        let TotalItems = 0;

        UserCartData.value.map (element => {
            TotalItems += element.quantity;
        });

        return TotalItems;
    };

    const CalculateSubTotal = () => {
        let SubTotal = 0;

        UserCartData.value.map (element => {
            SubTotal += element.price * element.quantity;
        });

        return SubTotal;
    }

    const RemoveFromCart = (cart, cartIndex) => {
        UserCartData.value = UserCartData.value.filter((element, index) => {
            if (index == cartIndex) return false;
            else return true;
        });

        // remove from local
        SetData('cart-list', UserCartData.value);
    }


</script>


<template>
    <div class="shop-products-section">
        <div class="product-detail">
            <div class="product-detail-heading">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
            </div>
            <ul>
                <li v-for="(cart, index) in UserCartData" :key="index">

                    <span @click="RemoveFromCart(cart, index)"><img src="./../images/close.svg" alt=""></span>

                    <div class="image">
                        <img :src="cart.product.thumbnail" alt="">
                    </div>
                    <div class="product">
                        <h6>{{ cart.product.title }}</h6>
                        <p>Color : {{ cart.color }}</p>
                    </div>
                    <div class="qty">
                        <p>${{ cart.price }}</p>
                    </div>
                    <div class="btn">
                        <img @click="Subtract(cart)" src="./../images/sub.svg" alt="">
                        <div class="box">
                            <p>{{ cart.quantity }}</p>
                        </div>
                        <img @click="Add(cart)" src="./../images/add.svg" alt="">
                    </div>
                    <div class="ttl">
                        <p>${{ cart.quantity * cart.price }}</p>
                    </div>  
                </li>
            </ul>
            <div class="actions">
                <div class="coupon">
                    <input type="text" placeholder="Coupon Code">
                    <button>apply coupon</button>
                </div>
                <div class="clearCart">
                    <p>clear shopping cart</p>
                </div>
            </div>
        </div>
        <div class="product-summary">
            <h6>Order Summary</h6>
            <div class="items">
                <ul>
                    <li>
                        <span>Items</span>
                        <p>{{ CalculateItems() }}</p>
                    </li>
                    <li>
                        <span>Sub Total</span>
                        <p>${{ CalculateSubTotal() }}</p>
                    </li>
                    <li>
                        <span>Shipping</span>
                        <p>$00.00</p>
                    </li>
                    <li>
                        <span>Taxes</span>
                        <p>$00.00</p>
                    </li>
                    <li>
                        <span>Coupon Discount</span>
                        <p>$00.00</p>
                    </li>
                    <li>
                        <span>Total</span>
                        <p>${{ CalculateSubTotal() }}</p>
                    </li>
                </ul>
            </div>
            <div class="btn">
                <p>Proceed to Checkout</p>
            </div>

        </div>
    </div>
</template>