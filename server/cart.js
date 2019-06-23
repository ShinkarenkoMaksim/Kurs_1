let add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount += req.body.price;
    cart.countGoods++;
    return cart;
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    if (req.body.onchange) {
        cart.amount += find.price * (+req.body.quantity - find.quantity);
        cart.countGoods += +req.body.quantity - find.quantity;
        find.quantity = +req.body.quantity;
    } else {
        find.quantity += +req.body.quantity;
        if (+req.body.quantity >= 0) {
            cart.amount += find.price;
            cart.countGoods++;
        } else {
            cart.amount -= find.price;
            cart.countGoods--;
        }
    }
    return cart;
};
let del = (cart, req) => {
    if(req.params.id === 'clear') {
        cart.contents.splice(0, cart.contents.length);
        cart.amount = 0;
        cart.countGoods = 0;
    } else {
        let find = cart.contents.find(el => el.id_product === +req.params.id);
        cart.contents.splice(cart.contents.indexOf(find), 1);
        cart.amount -= find.price * find.quantity;
        cart.countGoods -= find.quantity;
    }
    return cart;
};
module.exports = {
    add,
    change,
    del
};