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
    shopCustomer: '/customer/shop',
    addShop: '/shop/newshop',
    detailShop: '/shop/:shopID',
    addDetailShop: '/shop/:shopID/newproduct',
}

export default routes;