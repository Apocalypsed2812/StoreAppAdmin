import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import { postMethod } from '../../utils/fetchData';
import { GlobalState } from '../../context/GlobalState';
import { TOKEN_NAME } from '../../credentials';

const cx = classNames.bind(styles);

function Login() {
    let navigate = useNavigate();
    const state = useContext(GlobalState);

    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({ username: '', password: '' });
    const handleChangeInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const { login } = state.UserAPI;
    const { admin } = state.UserAPI;
    const [isLogin, setIsLogin] = login;
    const [isAdmin, setIsAdmin] = admin;

    console.log(user);
    const handleLogin = () => {
        postMethod('login', user)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    localStorage.setItem(TOKEN_NAME, response.token);
                    if (response.user.role === 'admin') {
                        setIsLogin(true);
                        setIsAdmin(true);
                        navigate('/');
                    } else {
                        setIsLogin(true);
                        // setIsAdmin(true);
                    }
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: 'error',
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Invalid Username Or Password',
                    icon: 'error',
                });
            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.username.trim() === '') {
            Swal.fire({
                title: 'Error',
                text: 'Username can not be empty',
                icon: 'error',
            });
            return;
        }
        if (user.password.trim() === '') {
            Swal.fire({
                title: 'Error',
                text: 'Password can not be empty',
                icon: 'error',
            });
            return;
        }
        handleLogin();
    };

    return (
        <div className={cx('login')}>
            <div className={cx('login-form')}>
                <h1>Login</h1>
                <form action="#" onSubmit={(e) => handleSubmit(e)} className="mt-5">
                    <div className={cx('txt_field')}>
                        <input
                            type="text"
                            // placeholder="Username"
                            onChange={handleChangeInput}
                            name="username"
                            value={user.username}
                        />
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className={cx('txt_field')}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            // placeholder="Password"
                            onChange={handleChangeInput}
                            name="password"
                            value={user.password}
                        />
                        <span></span>
                        <label>Password</label>
                        {/* <div className="absolute top-[57%] cursor-pointer translate-y-[-50%] right-[10px]">
                            {showPassword && (
                                <ion-icon name="eye" onClick={() => setShowPassword((prev) => !prev)}></ion-icon>
                            )}
                            {!showPassword && (
                                <ion-icon name="eye-off" onClick={() => setShowPassword((prev) => !prev)}></ion-icon>
                            )}
                        </div> */}
                    </div>
                    <div className={cx('pass')}>Forgot Password?</div>
                    <input type="submit" value="Login" />
                    <div className={cx('signup_link')}>
                        Don't have a account ?
                        <Link to="/register" className={cx('register')}>
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
