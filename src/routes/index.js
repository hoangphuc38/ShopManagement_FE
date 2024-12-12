import AdminLayout from "../components/layout/adminLayout";
import AuthLayout from "../components/layout/authLayout";
import routes from "../config/routes";
import ProductScreen from "../screens/admin/ProductScreen";
import UserScreen from "../screens/admin/UserScreen";
import LoginScreen from "../screens/auth/loginScreen";
import SignUpScreen from "../screens/auth/signupScreen";
import ShopScreen from "../screens/admin/ShopScreen";

const publicRoutes = [
    { path: '/' },
    { path: routes.login, component: LoginScreen, layout: AuthLayout },
    { path: routes.signup, component: SignUpScreen, layout: AuthLayout },
    { path: routes.product, component: ProductScreen, layout: AdminLayout },
    { path: routes.shop, component: ShopScreen, layout: AdminLayout },
    { path: routes.customer, component: UserScreen, layout: AdminLayout },
]

export default publicRoutes;