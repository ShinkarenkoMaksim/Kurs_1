const products = {
    components: {
        product
    },
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
};

