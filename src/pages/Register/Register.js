import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import classNames from 'classnames/bind';

import styles from './Register.module.scss';
import { postMethod } from '../../utils/fetchData';

const cx = classNames.bind(styles);

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const handleChangeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleRegister = () => {
        postMethod('register', {
            username: user.username,
            password: user.password,
            name: user.name,
            email: '',
        })
            .then((res) => {
                if (res.success) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Account was registered successfully',
                        icon: 'success',
                    });
                    setUser({
                        username: '',
                        password: '',
                        confirmPassword: '',
                        name: '',
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: res.message,
                        icon: 'error',
                    });
                }
            })
            .catch((err) => console.log(err));
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
        if (user.password.trim().length < 6) {
            Swal.fire({
                title: 'Error',
                text: 'Password too short',
                icon: 'error',
            });
            return;
        }
        if (user.password.trim() !== user.confirmPassword.trim()) {
            Swal.fire({
                title: 'Error',
                text: 'Confirm Password is incorrect',
                icon: 'error',
            });
            return;
        }
        if (user.name.trim() === '') {
            Swal.fire({
                title: 'Error',
                text: 'Name can not be empty',
                icon: 'error',
            });
            return;
        }
        handleRegister();
    };
    console.log(user);
    return (
        <div className={cx('register')}>
            <div className={cx('register-form')}>
                <h1>Register</h1>
                <form action="#" onSubmit={(e) => handleSubmit(e)} className="mt-5">
                    <div className={cx('txt_field')}>
                        <input
                            type="text"
                            // placeholder="Username"
                            onChange={handleChangeUser}
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
                            onChange={handleChangeUser}
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
                    <div className={cx('txt_field')}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            // placeholder="Password"
                            onChange={handleChangeUser}
                            name="confirmPassword"
                            value={user.confirmPassword}
                        />
                        <span></span>
                        <label>Confirm Password</label>
                        {/* <div className="absolute top-[57%] cursor-pointer translate-y-[-50%] right-[10px]">
                            {showPassword && (
                                <ion-icon name="eye" onClick={() => setShowPassword((prev) => !prev)}></ion-icon>
                            )}
                            {!showPassword && (
                                <ion-icon name="eye-off" onClick={() => setShowPassword((prev) => !prev)}></ion-icon>
                            )}
                        </div> */}
                    </div>
                    <div className={cx('txt_field')}>
                        <input
                            type="text"
                            // placeholder="Username"
                            onChange={handleChangeUser}
                            name="name"
                            value={user.name}
                        />
                        <span></span>
                        <label>Name</label>
                    </div>
                    <input type="submit" value="Register" />
                    <div className={cx('signup_link')}>
                        You have a account ?
                        <Link to="/login" className={cx('login')}>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
