// import config from '~/config';

// //Layout
// import { HeaderOnly } from '~/layouts';

//Pages
import User from '~/pages/User';
import FoodStore from '~/pages/FoodStore';
import Order from '~/pages/Order';
import Home from '~/pages/Home';
import Product from '~/pages/Product';
import Category from '~/pages/Category';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import LayoutSidebar from '~/layouts/LayoutSidebar';

//Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: LayoutSidebar },
    { path: '/foodstore', component: FoodStore, layout: LayoutSidebar },
    { path: '/order', component: Order, layout: LayoutSidebar },
    { path: '/user', component: User, layout: LayoutSidebar },
    { path: '/food', component: Product, layout: LayoutSidebar },
    { path: '/category', component: Category, layout: LayoutSidebar },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
