const product = {
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
};