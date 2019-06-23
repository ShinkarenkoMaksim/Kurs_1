Vue.component('products', {
    data(){
      return {
          catalogUrl: `/catalogData.json`,
          products: [],
          filtered: [],
      }
    },
    props: {
        itemsQuantity: 0,
        catalogPage: true,
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `<div class="products"><product 
            v-for="(product, index) of filtered"
            v-if="index < itemsQuantity" 
            :key="product.id_product"
            :product="product">
                <template v-if="catalogPage">
                    <a href="#" class="product__round"><img src="img/round.svg" alt="Round"></a>
                    <a href="#" class="product__hearth"><img src="img/hearth.svg" alt="Round"></a>
                </template>
            </product></div>`
});
Vue.component('product', {
    props: ['product'],
    template: `<div class="products_item">
                    <img :src="product.img" :alt="product.product_name">
                    <h3 class="featured__title">{{product.product_name}}</h3>
                    <p class="featured__price">\${{product.price}}</p>
                    <a class="featured__hover" href="single_page.html">
                        <p class="product__stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></p>
                    </a>
                    <a href="#" class="featured__cart" @click.prevent="$root.$refs.cart.addProduct(product)"><img class="featured__cart__img" src="img/cart_white.svg" alt="Cart">Add
                        to Cart</a>
                    <slot></slot>
                </div>`
});

