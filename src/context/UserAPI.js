import { useState, useEffect } from "react";
import { getMethod } from "../utils/fetchData";
import { TOKEN_NAME } from "../credentials";
function UserAPI() {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const checkUserIsLogin = async () => {
            const res = await getMethod("get-user");
            if (res.success) {
                setIsLogin(true);
                setUser(res.user);
                setCart(res.user.cart);
                if (res.user.role === "admin") setIsAdmin(true);
            } else {
                console.log(res.message);
            }
        };
        if (localStorage.getItem(TOKEN_NAME)) checkUserIsLogin();
    }, []);
    return {
        login: [isLogin, setIsLogin],
        admin: [isAdmin, setIsAdmin],
        user: [user, setUser],
        cart: [cart, setCart],
    };
}

export default UserAPI;
