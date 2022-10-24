import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightToBracket,
    faBars,
    faCartShopping,
    faHouse,
    faMoneyBill,
    faProcedures,
    faRightToBracket,
    faStore,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link, Redirect, Switch, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useLocation } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getDatabase, ref, child, get, set, remove } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
//import HeadlessTippy from '@tippyjs/react/headless';

//import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import Search from '../Search';
import Auth from '../Auth';

const cx = classNames.bind(styles);

function Header() {
    const dbRef = ref(getDatabase());
    const [currentUser, setCurrentUser] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [adminAccount, setAdminAccount] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const getAdminAccount = () => {
        get(child(dbRef, `accounts`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (snapshot.val().length > 0) {
                        console.log(snapshot.val());
                        setAdminAccount(snapshot.val()[1]);
                    }
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getAdminAccount();
    }, []);

    const handleShowLogin = () => {
        setUsername('');
        setPassword('');
        setShowLogin(true);
    };
    const handleCloseLogin = () => setShowLogin(false);

    const handleShowLogout = () => setShowLogout(true);
    const handleCloseLogout = () => setShowLogout(false);

    const setUsernameAdmin = (e) => {
        setUsername(e.target.value);
    };

    const setPasswordAdmin = (e) => {
        setPassword(e.target.value);
    };

    const checkLogin = (e) => {
        if (!currentUser) {
            toast.error('Vui lòng đăng nhập để thực hiện chức năng này !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            e.preventDefault();
            //return <Navigate to="/" />;
            // <Switch>
            //     <Route path="" render={() => <Redirect to="/" />} />
            // </Switch>;
        }
    };

    const login = () => {
        if (username === '') {
            toast.error('Username không được trống !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (password === '') {
            toast.error('Mật khẩu không được trống !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (username !== adminAccount.username) {
            toast.error('Username không đúng !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (password !== adminAccount.password) {
            toast.error('Mật khẩu không đúng !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        } else {
            setCurrentUser(true);
            setShowLogin(false);
            toast.success('Đăng nhập thành công !', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const logout = () => {
        setCurrentUser(false);
        setShowLogout(false);
        toast.success('Đăng xuất thành công !', {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    return (
        <>
            <header className={cx('wrapper')}>
                <ul className={cx('header__list')}>
                    <li className={cx('header__item')}>
                        <Link to="/" className={cx('header__item-link')}>
                            <FontAwesomeIcon icon={faHouse} className={cx('mr-1')} />
                            Trang Chủ
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/product" className={cx('header__item-link')} onClick={checkLogin}>
                            <FontAwesomeIcon icon={faProcedures} className={cx('mr-1')} />
                            Sản Phẩm
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/category" className={cx('header__item-link')} onClick={checkLogin}>
                            <FontAwesomeIcon icon={faBars} className={cx('mr-1')} />
                            Danh Mục
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/user" className={cx('header__item-link')} onClick={checkLogin}>
                            <FontAwesomeIcon icon={faUser} className={cx('mr-1')} />
                            Người Dùng
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/shipper" className={cx('header__item-link')} onClick={checkLogin}>
                            Người Giao Hàng
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/foodstore" className={cx('header__item-link')} onClick={checkLogin}>
                            <FontAwesomeIcon icon={faStore} className={cx('mr-1')} />
                            Quán ăn
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/order" className={cx('header__item-link')} onClick={checkLogin}>
                            <FontAwesomeIcon icon={faMoneyBill} className={cx('mr-1')} />
                            Đơn Hàng
                        </Link>
                    </li>
                    {currentUser ? (
                        <li className={cx('header__item')}>
                            <Link to="" className={cx('header__item-link')} onClick={handleShowLogout}>
                                <FontAwesomeIcon icon={faRightToBracket} className={cx('mr-1')} />
                                Đăng Xuất
                            </Link>
                        </li>
                    ) : (
                        <li className={cx('header__item')}>
                            <Link to="" className={cx('header__item-link')} onClick={handleShowLogin}>
                                <FontAwesomeIcon icon={faArrowRightToBracket} className={cx('mr-1')} />
                                Đăng Nhập
                            </Link>
                        </li>
                    )}
                </ul>
                <ToastContainer />
            </header>

            <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng Nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="username"
                            placeholder="Nhập username của bạn"
                            onChange={setUsernameAdmin}
                            value={username}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="password"
                            placeholder="Nhập mật khẩu của bạn"
                            onChange={setPasswordAdmin}
                            value={password}
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogin}>
                        Close
                    </Button>
                    <Button variant="success" onClick={login}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showLogout} onHide={handleCloseLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng Xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <p>Bạn có chắc là muốn đăng xuất không ?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogout}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={logout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Header;
