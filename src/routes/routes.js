// import config from '~/config';

// //Layout
// import { HeaderOnly } from '~/layouts';

//Pages
import HomeAdmin from '~/pages/Admin/Home';
import User from '~/pages/Admin/User';
import FoodStore from '~/pages/Admin/FoodStore';
import OrderAdmin from '~/pages/Admin/Order';
import Home from '~/pages/FoodStore/Home';
import Product from '~/pages/FoodStore/Product';
import Category from '~/pages/FoodStore/Category';
import Order from '~/pages/FoodStore/Order';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import LayoutSidebar from '~/layouts/LayoutSidebar';
import LayoutSidebarAdmin from '~/layouts/LayoutSidebarAdmin';

//Public routes
const publicRoutes = [
    { path: '/admin', component: HomeAdmin, layout: LayoutSidebarAdmin },
    { path: '/admin/foodstore', component: FoodStore, layout: LayoutSidebarAdmin },
    { path: '/admin/order', component: OrderAdmin, layout: LayoutSidebarAdmin },
    { path: '/admin/user', component: User, layout: LayoutSidebarAdmin },
    { path: '/foodstore', component: Home, layout: LayoutSidebar },
    { path: '/foodstore/food', component: Product, layout: LayoutSidebar },
    { path: '/foodstore/category', component: Category, layout: LayoutSidebar },
    { path: '/foodstore/order', component: Order, layout: LayoutSidebar },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
