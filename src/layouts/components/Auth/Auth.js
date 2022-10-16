import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Auth({ onClickLogin, onClickRegister }) {
    const [showResult, setShowResult] = useState(false);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleShowResult = () => {
        setShowResult(true);
    };

    return (
        <div className={cx('auth')}>
            <FontAwesomeIcon icon={faUser} className={cx('icon-user')} />
            <div className={cx('auth-action')}>
                <span onClick={onClickLogin}>Đăng Nhập</span>/<span onClick={onClickRegister}>Đăng kí</span>
                <HeadlessTippy
                    interactive
                    visible={showResult}
                    placement={'top-end'}
                    render={(attrs) => (
                        <div className={cx('auth-list')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <Link to="/order" className={cx('auth-item')}>
                                    Đơn hàng của tôi
                                </Link>
                                <Link to="" className={cx('auth-item')}>
                                    Thông báo của tôi
                                    <span className={cx('auth-item-badget')}>0</span>
                                </Link>
                                <Link to="/account" className={cx('auth-item')}>
                                    Tài khoản của tôi
                                </Link>
                                <Link to="" className={cx('auth-item')}>
                                    Thoát tài khoản
                                </Link>
                            </PopperWrapper>
                        </div>
                    )}
                    onClickOutside={handleHideResult}
                >
                    <p className={cx('auth-account')} onMouseOver={handleShowResult}>
                        Tài khoản <FontAwesomeIcon icon={faCaretDown} className={cx('icon-down')} />
                    </p>
                </HeadlessTippy>
            </div>
        </div>
    );
}

export default Auth;
