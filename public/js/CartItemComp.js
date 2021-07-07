const cartItem = {
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
};