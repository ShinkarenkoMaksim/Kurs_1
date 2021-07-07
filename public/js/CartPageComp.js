const cartPage = {
    data(){
        return{
            value: this.cartItem.quantity,
        }
    },
    props: ['cartItem'],
    methods: {
        changeQuantity() {
            if (this.value < 1) {
                this.value = 1;
            }
            this.$parent.changeQuantity(this.cartItem, this.value);
        }
    },
    template: `<div class="cart__product">
                    <div class="cart__col1">
                        <a href="single_page.html" class="cart__img"><img :src="cartItem.img" :alt="cartItem.product_name"></a>
                        <div class="cart__descript">
                            <a href="single_page.html" class="cart__descript__title">{{cartItem.product_name}}</a><br>
                            <img src="img/cart-stars-temp.png" alt="stars">
                            <p class="cart__descript__text">Color: <span>Red</span></p>
                            <p class="cart__descript__text">Size: <span>Xll</span></p>
                        </div>
                    </div>
                    <div class="cart__col2">\${{cartItem.price}}</div>
                    <div class="cart__col3">
                        <input class="cart__quant" type="number" v-model="value" @input="changeQuantity">
                    </div>
                    <div class="cart__col4">FREE</div>
                    <div class="cart__col5">\${{cartItem.price*cartItem.quantity}}</div>
                    <div class="cart__col6">
                        <a href="#" class="cart__dellink" @click.prevent="$emit('removeAll', cartItem)"><i class="fas fa-times-circle"></i></a>
                    </div>
                </div>`
};