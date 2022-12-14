import {
    faBars,
    faBowlFood,
    faChevronRight,
    faHome,
    faMoneyBill,
    faRightFromBracket,
    faSearch,
    faStore,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { GlobalState } from '~/context/GlobalState';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const navigate = useNavigate();
    const state = useContext(GlobalState);
    const [isLogin, setIsLogin] = state.UserAPI.login;
    const [isAdmin, setIsAdmin] = state.UserAPI.admin;

    const handleLogout = () => {
        localStorage.clear();
        setIsLogin(false);
        setIsAdmin(false);
        navigate('/login');
    };
    return (
        <nav className={cx('sidebar')}>
            <header>
                <div className={cx('image-text')}>
                    <span className={cx('image')}>
                        <img src="" alt="logo" />
                    </span>

                    <div className={cx('text', 'header-text')}>
                        <span className={cx('name')}>FoodShop</span>
                        <span className={cx('profession')}>Order Food</span>
                    </div>
                </div>

                {/* <FontAwesomeIcon icon={faChevronRight} className={cx('toggle')} /> */}
            </header>

            <div className={cx('menu-bar')}>
                <div className={cx('menu')}>
                    <ul className={cx('menu-links')}>
                        <li className={cx('search-box')}>
                            <FontAwesomeIcon icon={faSearch} className={cx('icon')} />
                            <input type="search" placeholder="Search..." />
                        </li>
                        <li>
                            <Link to="/admin">
                                <FontAwesomeIcon icon={faHome} className={cx('icon')} />
                                <span className={cx('text', 'nav-text')}>Trang Chủ</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/foodstore">
                                <FontAwesomeIcon icon={faStore} className={cx('icon')} />
                                <span className={cx('text', 'nav-text')}>Quán Ăn</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/order">
                                <FontAwesomeIcon icon={faMoneyBill} className={cx('icon')} />
                                <span className={cx('text', 'nav-text')}>Đơn hàng</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/user">
                                <FontAwesomeIcon icon={faMoneyBill} className={cx('icon')} />
                                <span className={cx('text', 'nav-text')}>Người dùng</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('bottom-content')}>
                    <li onClick={handleLogout}>
                        <Link to="">
                            <FontAwesomeIcon icon={faRightFromBracket} className={cx('icon')} />
                            <span className={cx('text', 'nav-text')}>Logout</span>
                        </Link>
                    </li>
                    <li className={cx('mode')}>
                        <div className={cx('moon-sun')}>
                            <i className="bx bx-moon icon moon"></i>
                            <i className="bx bx-sun icon sun"></i>
                        </div>
                        <span className={cx('mode-text text')}>Dark Mode</span>
                        <div className={cx('toggle-switch')}>
                            <span className={cx('switch')}></span>
                        </div>
                    </li>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
