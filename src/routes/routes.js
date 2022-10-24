// import config from '~/config';

// //Layout
// import { HeaderOnly } from '~/layouts';

//Pages
import Home from '~/pages/Home';
import Product from '~/pages/Product';
import Category from '~/pages/Category';
import Cart from '~/pages/Cart';
import UserInfor from '~/pages/UserInfor';
import Order from '~/pages/Order';
import User from '~/pages/User';
import Shipper from '~/pages/Shipper';
import FoodStore from '~/pages/FoodStore';
import LayoutSidebar from '~/layouts/LayoutSidebar';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/category', component: Category },
    { path: '/cart', component: Cart },
    { path: '/user', component: User },
    { path: '/shipper', component: Shipper },
    { path: '/foodstore', component: FoodStore },
    { path: '/account', component: UserInfor, layout: LayoutSidebar },
    // { path: '/order', component: Order, layout: LayoutSidebar },
    { path: '/order', component: Order },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
