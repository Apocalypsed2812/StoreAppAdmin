import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
//import HeadlessTippy from '@tippyjs/react/headless';

//import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import Search from '../Search';
import Auth from '../Auth';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <ul className={cx('header__list')}>
                <li className={cx('header__item')}>
                    <Link to="/" className={cx('header__item-link')}>
                        Trang Chủ
                    </Link>
                </li>
                <li className={cx('header__item')}>
                    <Link to="/category" className={cx('header__item-link')}>
                        Danh Mục
                    </Link>
                </li>
                <li className={cx('header__item')}>
                    <Link to="" className={cx('header__item-link')}>
                        Người Dùng
                    </Link>
                </li>
                <li className={cx('header__item')}>
                    <Link to="" className={cx('header__item-link')}>
                        Người Giao Hàng
                    </Link>
                </li>
                <li className={cx('header__item')}>
                    <Link to="" className={cx('header__item-link')}>
                        Đơn Hàng
                    </Link>
                </li>
                <li className={cx('header__item')}>
                    <Link to="" className={cx('header__item-link')}>
                        Đăng Xuất
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;
