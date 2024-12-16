const routes = {
    login: '/login',
    signup: '/signup',

    //admin's screens
    product: '/product',
    addProduct: '/product/newproduct',
    detailProduct: '/product/:productId',
    shop: '/shop',
    customer: '/customer',

    //customer's screens
    productCustomer: '/customer/product',
    addShop: '/shop/newshop',
    detailShop: '/shop/:shop_id',
    addDetailShop: '/shop/:shop_id/newproduct',

}

export default routes;