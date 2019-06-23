Vue.component('cart', {
    data(){
      return {
          cartItems: [],
          amount: 0,
          quantity: 0,
      }
    },
    props: {
        page: false,
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
                            find.quantity++
                            this.amount += find.price;
                            this.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result){
                            this.cartItems.push(prod);
                            this.amount += prod.price;
                            this.quantity++;
                        }
                    })
            }
        },
        remove(product){
            if(product.quantity > 1){
                this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result){
                            product.quantity--;
                            this.amount -= product.price;
                            this.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if(data.result){
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                            this.amount -= product.price;
                            this.quantity--;
                        }
                    })
            }
        },
        clearCart(){
            this.$parent.deleteJson(`/api/cart/clear`)
                .then(data => {
                    if(data.result){
                        this.cartItems.splice(0, this.cartItems.length);
                        this.amount = 0;
                        this.quantity = 0;
                    }
                })
        },
        removeAll(product){
            this.$parent.deleteJson(`/api/cart/${product.id_product}`)
                .then(data => {
                    if(data.result){
                        this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        this.amount -= product.price * product.quantity;
                        this.quantity -= product.quantity;
                    }
                })
        },
        changeQuantity(product, value) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: value, onchange: true})
                .then(data => {
                    if (data.result) {
                        this.amount += product.price * (value - find.quantity);
                        this.quantity += value - find.quantity;
                        find.quantity = value;
                    }
                })
        }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
                this.amount = data.amount;
                this.quantity = data.countGoods;
            });
    },
    template: `<div>
                    <div v-if="page"> 
                        <div class="cart__tbl">
                            <div class="cart__header">
                                <h4 class="cart__col1 cart__header__text">Product Details</h4>
                                <h4 class="cart__col2 cart__header__text">unite Price</h4>
                                <h4 class="cart__col3 cart__header__text">Quantity</h4>
                                <h4 class="cart__col4 cart__header__text">shipping</h4>
                                <h4 class="cart__col5 cart__header__text">Subtotal</h4>
                                <h4 class="cart__col6 cart__header__text">ACTION</h4>
                            </div>
                            <cart-page v-for="item of cartItems"
                                        :key="item.id_product"
                                        :cart-item="item"
                                        @removeAll="removeAll"
                                        @changeQuantity="changeQuantity"></cart-page>
                            <h4 class="cartempty_text" v-if="!cartItems.length">Your cart is empty</h4>
                            <div class="cart__buttons">
                                <button class="cart__button" @click="clearCart">cLEAR SHOPPING CART</button>
                                <a class="cart__button" href="product.html">cONTINUE sHOPPING</a>
                            </div>
                            <div class="cart__form">
                                <div class="cart__form__flex">
                                    <h3 class="cart__form__h3">Shipping Adress</h3>
                                    <select class="cart__input" name="country" id="country">
                                        <option selected>Bangladesh</option>
                                        <option>Bangladesh</option>
                                        <option>Bangladesh</option>
                                        <option>Bangladesh</option>
                                        <option>Bangladesh</option>
                                    </select><br>
                                    <input class="cart__input" type="text" placeholder="State"><br>
                                    <input class="cart__input" type="number" placeholder="Postcode / Zip"><br>
                                    <button class="cart__button cart__button__small">get a quote</button>
                                </div>
                                <div class="cart__form__flex">
                                    <h3 class="cart__form__h3">coupon discount</h3>
                                    <p class="cart__form__text">Enter your coupon code if you have one</p>
                                    <input class="cart__input" type="text" placeholder="State"><br>
                                    <button class="cart__button cart__button__small">Apply coupon</button>
                                </div>
                                <div class="cart__form__flex cart__checkout">
                                    <div class="cart__checkout__bdr">
                                        <h4 class="cart__form__h4">Sub total <span>\${{this.amount}}</span></h4>
                                        <h3 class="cart__form__h3">GRAND TOTAL <span>\${{this.amount}}</span></h3>
                                    </div>
                                    <a class="cart__checkout__btn" href="checkout.html">proceed to checkout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template v-else>
                        <a class="cart" href="cart.html"><img class="cart__img" src="img/cart.svg" alt="cart"></a>
                        <div class="cart__ellipse">{{this.quantity}}</div>
                        <div class="cart__container__drop">
                            <div class="cart__drop">
                                <p v-if="!cartItems.length">Cart is empty</p>
                                <cart-item v-for="item of cartItems"
                                        :key="item.id_product"
                                        :cart-item="item"
                                        @remove="remove"></cart-item>
                                <div class="cart__drop__btns" v-if="cartItems.length">
                                    <p class="cart__drop__total"><span>TOTAL</span> \${{this.amount}}</p>
                                    <a class="cart__drop__btn" href="checkout.html">Checkout</a>
                                    <br>
                                    <a class="cart__drop__btn" href="cart.html">Go to cart</a>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `<div class="cart__drop__flex">
                    <a href="single_page.html" class="cart__item__img"><img :src="cartItem.img" :alt="cartItem.product_name"></a>
                    <div class="cart__drop__text">
                        <a href="single_page.html" class="cart__item__name">{{cartItem.product_name}}</a><br>
                        <img class="cart__drop__star" src="img/cart-stars-temp.png" alt="stars">
                        <p class="cart__drop__price">{{cartItem.quantity}} <span>x</span> \${{cartItem.price}}</p>
                    </div>
                    <a href="#" class="cart__drop__del" @click.prevent="$emit('remove', cartItem)"><i class="fas fa-times-circle"></i></a>
                </div>`
});

Vue.component('cart-page', {
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
});
