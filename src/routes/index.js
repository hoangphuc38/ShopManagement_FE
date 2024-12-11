import AdminLayout from "../components/layout/adminLayout";
import routes from "../config/routes";
import ProductScreen from "../screens/admin/ProductScreen";

const publicRoutes = [
    { path: '/' },
    { path: routes.product, component: ProductScreen, layout: AdminLayout },

]

export default publicRoutes;