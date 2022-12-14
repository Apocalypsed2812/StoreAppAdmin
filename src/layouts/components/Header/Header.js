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
            toast.error('Vui l??ng ????ng nh???p ????? th???c hi???n ch???c n??ng n??y !', {
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
            toast.error('Username kh??ng ???????c tr???ng !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (password === '') {
            toast.error('M???t kh???u kh??ng ???????c tr???ng !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (username !== adminAccount.username) {
            toast.error('Username kh??ng ????ng !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (password !== adminAccount.password) {
            toast.error('M???t kh???u kh??ng ????ng !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        } else {
            setCurrentUser(true);
            setShowLogin(false);
            toast.success('????ng nh???p th??nh c??ng !', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const logout = () => {
        setCurrentUser(false);
        setShowLogout(false);
        toast.success('????ng xu???t th??nh c??ng !', {
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
                            Trang Ch???
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/product" className={cx('header__item-link')} onClick={checkLogin}>
                            <FontAwesomeIcon icon={faProcedures} className={cx('mr-1')} />
                            S???n Ph???m
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/category" className={cx('header__item-link')} onClick={checkLogin}>
                            <FontAwesomeIcon icon={faBars} className={cx('mr-1')} />
                            Danh M???c
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/user" className={cx('header__item-link')} onClick={checkLogin}>
                            <FontAwesomeIcon icon={faUser} className={cx('mr-1')} />
                            Ng?????i D??ng
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/shipper" className={cx('header__item-link')} onClick={checkLogin}>
                            Ng?????i Giao H??ng
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/foodstore" className={cx('header__item-link')} onClick={checkLogin}>
                            <FontAwesomeIcon icon={faStore} className={cx('mr-1')} />
                            Qu??n ??n
                        </Link>
                    </li>
                    <li className={cx('header__item')}>
                        <Link to="/order" className={cx('header__item-link')} onClick={checkLogin}>
                            <FontAwesomeIcon icon={faMoneyBill} className={cx('mr-1')} />
                            ????n H??ng
                        </Link>
                    </li>
                    {currentUser ? (
                        <li className={cx('header__item')}>
                            <Link to="" className={cx('header__item-link')} onClick={handleShowLogout}>
                                <FontAwesomeIcon icon={faRightToBracket} className={cx('mr-1')} />
                                ????ng Xu???t
                            </Link>
                        </li>
                    ) : (
                        <li className={cx('header__item')}>
                            <Link to="" className={cx('header__item-link')} onClick={handleShowLogin}>
                                <FontAwesomeIcon icon={faArrowRightToBracket} className={cx('mr-1')} />
                                ????ng Nh???p
                            </Link>
                        </li>
                    )}
                </ul>
                <ToastContainer />
            </header>

            <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>????ng Nh???p</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="username"
                            placeholder="Nh???p username c???a b???n"
                            onChange={setUsernameAdmin}
                            value={username}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="password"
                            placeholder="Nh???p m???t kh???u c???a b???n"
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
                    <Modal.Title>????ng Xu???t</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <p>B???n c?? ch???c l?? mu???n ????ng xu???t kh??ng ?</p>
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
