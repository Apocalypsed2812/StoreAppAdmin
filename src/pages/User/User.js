import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './User.module.scss';
import { postMethod } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';

const cx = classNames.bind(styles);

function User() {
    const state = useContext(GlobalState);
    const [userList, setUserList] = state.UserListAPI.userList;
    const [isAdmin, setIsAdmin] = state.UserAPI.admin;

    console.log(isAdmin);

    const [showAdd, setShowAdd] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [idEdit, setIdEdit] = useState('');
    const [idDelete, setIdDelete] = useState('');

    const navigate = useNavigate();
    // useEffect(() => {
    //     if (!isAdmin) {
    //         navigate('/login');
    //     }
    // }, []);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        setName('');
        setUsername('');
        setPhone('');
        setEmail('');
        setShowAdd(true);
    };

    const handleCloseView = () => setShowView(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowView = (e) => {
        setName(e.target.getAttribute('data-name'));
        setUsername(e.target.getAttribute('data-username'));
        setPhone(e.target.getAttribute('data-phone'));
        setEmail(e.target.getAttribute('data-email'));
        setShowView(true);
    };

    const handleShowEdit = (e) => {
        setName(e.target.getAttribute('data-name'));
        setUsername(e.target.getAttribute('data-username'));
        setPhone(e.target.getAttribute('data-phone'));
        // setAddress(e.target.getAttribute('data-address'));
        setIdEdit(e.target.getAttribute('data-id'));
        setShowEdit(true);
    };

    const handleShowDelete = (e) => {
        console.log(e.target.getAttribute('data-id'));
        setIdDelete(e.target.getAttribute('data-id'));
        console.log(idDelete);
        setShowDelete(true);
    };

    //Set dữ liệu cho input
    const setNameShipper = (e) => {
        setName(e.target.value);
    };

    const setPhoneShipper = (e) => {
        setPhone(e.target.value);
    };

    // const setAddressShipper = (e) => {
    //     setAddress(e.target.value);
    // };

    const setUsernameShipper = (e) => {
        setUsername(e.target.value);
    };

    //Thêm dữ liệu vào firebase
    const handleAddShipper = () => {};

    //Sửa dữ liệu firebase
    const handleEditShipper = (e) => {};

    //Xóa dữ liệu firebase
    const handleDeleteShipper = (e) => {};

    return (
        <>
            <div className={cx('dashboard')}>
                <div className={cx('top')}>
                    <div>
                        <FontAwesomeIcon icon={faUser} className={cx('icon', 'mr-8')} />
                        <span>User</span>
                    </div>
                    <div className={cx('dashboard-search-box')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('icon')} />
                        <input type="text" placeholder="Search here..." />
                    </div>
                    <img src="" alt="" />
                </div>
                <div className={cx('dash-content')}>
                    <div className={cx('activity')}>
                        <div className={cx('title')}>
                            <FontAwesomeIcon icon={faUser} className={cx('icon', 'mt-16')} />
                            <span className={cx('text', 'mt-16')}>Manage User</span>
                        </div>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <td>Username</td>
                                    <td>Tên</td>
                                    <td>Số điện thoại</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((item, index) => (
                                    <tr className={cx('table-item')} key={index}>
                                        <td>{item.username}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                onClick={handleShowView}
                                                data-name={item.name}
                                                data-username={item.username}
                                                data-phone={item.phone}
                                                data-email={item.email}
                                            >
                                                Xem
                                            </Link>

                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                // onClick={handleShowEdit}
                                                // data-id={item.id}
                                                // data-name={item.name}
                                                // data-username={item.username}
                                                // data-phone={item.phone}
                                                // data-email={item.category}
                                            >
                                                Sửa
                                            </Link>
                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                // onClick={handleShowDelete}
                                                // data-id={item.id}
                                                // data-name={item.name}
                                            >
                                                Xóa
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={showView} onHide={handleCloseView}>
                <Modal.Header closeButton>
                    <Modal.Title>Xem Người Dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            value={username}
                            readOnly
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="price"
                            value={name}
                            readOnly
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="quantity"
                            value={phone}
                            readOnly
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="category"
                            value={email}
                            readOnly
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseView}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Món Ăn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập tên món ăn"
                            onChange={setNameProduct}
                            value={name}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="price"
                            placeholder="Nhập giá món ăn"
                            onChange={setPriceProduct}
                            value={price}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="quantity"
                            placeholder="Nhập số lượng món ăn"
                            onChange={setQuantityProduct}
                            value={quantity}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <select
                            className={cx('form-control')}
                            name="category"
                            // placeholder="Nhập loại món ăn"
                            onChange={setCategoryProduct}
                            required
                        >
                            <option value="">Vui Lòng Chọn Loại Món Ăn</option>
                            {categoryList.map((item, index) => (
                                <option value={item.name} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type="file"
                            className={cx('form-control')}
                            required
                            name="image"
                            onChange={setImageProduct}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}

export default User;
