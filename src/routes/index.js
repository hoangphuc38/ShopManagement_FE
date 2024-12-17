import AdminLayout from "../components/layout/adminLayout";
import AuthLayout from "../components/layout/authLayout";
import routes from "../config/routes";
import ProductScreen from "../screens/admin/ProductScreen";
import UserScreen from "../screens/admin/UserScreen";
import LoginScreen from "../screens/auth/loginScreen";
import SignUpScreen from "../screens/auth/signupScreen";
import ShopScreen from "../screens/admin/ShopScreen";
import NewProductScreen from "../screens/admin/NewProductScreen";
import DetailProductScreen from "../screens/admin/DetailProductScreen";
import ProductCustomerScreen from "../screens/user/ProductCustomerScreen";
import UserLayout from "../components/layout/userLayout";
import ShopCustomerScreen from "../screens/user/ShopCustomerScreen";
import NewShopScreen from "../screens/user/NewShopScreen";
import DetailShopScreen from "../screens/user/DetailShopScreen";
import AddProductScreen from "../screens/user/AddProductScreen";

const publicRoutes = [
    { path: '/' },
    { path: routes.login, component: LoginScreen, layout: AuthLayout },
    { path: routes.signup, component: SignUpScreen, layout: AuthLayout },
    { path: routes.product, component: ProductScreen, layout: AdminLayout },
    { path: routes.shop, component: ShopScreen, layout: AdminLayout },
    { path: routes.customer, component: UserScreen, layout: AdminLayout },
    { path: routes.addProduct, component: NewProductScreen, layout: AdminLayout },
    { path: routes.detailProduct, component: DetailProductScreen, layout: AdminLayout },
    { path: routes.productCustomer, component: ProductCustomerScreen, layout: UserLayout },
    { path: routes.shopCustomer, component: ShopCustomerScreen, layout: UserLayout },
    { path: routes.addShop, component: NewShopScreen, layout: UserLayout },
    { path: routes.detailShop, component: DetailShopScreen, layout: UserLayout },
    { path: routes.addDetailShop, component: AddProductScreen, layout: UserLayout },
]

export default publicRoutes;