// Pages
import User from '~/pages/Admin/User';
import FoodStore from '~/pages/Admin/FoodStore';
import Order from '~/pages/Admin/Order';
import Home from '~/pages/Admin/Home';
import Product from '~/pages/Admin/Product';
import Category from '~/pages/Admin/Category';
import HomeFoodStore from '~/pages/FoodStore/Home';
import ProductFoodStore from '~/pages/FoodStore/Product';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

// Layout
import LayoutSidebar from '~/layouts/LayoutSidebar';
import LayoutSidebarFoodStore from '~/layouts/LayoutSidebarFoodStore/LayoutSidebar';

//Public routes
const publicRoutes = [
    { path: '/admin', component: Home, layout: LayoutSidebar },
    { path: '/admin/foodstore', component: FoodStore, layout: LayoutSidebar },
    { path: '/admin/order', component: Order, layout: LayoutSidebar },
    { path: '/admin/user', component: User, layout: LayoutSidebar },
    { path: '/admin/food', component: Product, layout: LayoutSidebar },
    { path: '/admin/category', component: Category, layout: LayoutSidebar },
    { path: '/foodstore', component: HomeFoodStore, layout: LayoutSidebarFoodStore },
    { path: '/foodstore/food', component: ProductFoodStore, layout: LayoutSidebarFoodStore },
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
