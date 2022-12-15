import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Order.module.scss';
import { postMethod } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';

const cx = classNames.bind(styles);

function Order() {
    const state = useContext(GlobalState);
    const [orders, setOrders] = state.OrderAPI.orders;
    const [isAdmin, setIsAdmin] = state.UserAPI.admin;

    console.log(isAdmin);

    const [showAdd, setShowAdd] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [idEdit, setIdEdit] = useState('');
    const [idDelete, setIdDelete] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
        }
    }, []);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        setName('');
        setUsername('');
        setPhone('');
        setAddress('');
        setShowAdd(true);
    };

    const handleCloseView = () => setShowView(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowView = (e) => {
        setName(e.target.getAttribute('data-name'));
        setUsername(e.target.getAttribute('data-username'));
        setPhone(e.target.getAttribute('data-phone'));
        setAddress(e.target.getAttribute('data-address'));
        setShowView(true);
    };

    const handleShowEdit = (e) => {
        setName(e.target.getAttribute('data-name'));
        setUsername(e.target.getAttribute('data-username'));
        setPhone(e.target.getAttribute('data-phone'));
        setAddress(e.target.getAttribute('data-address'));
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

    const setAddressShipper = (e) => {
        setAddress(e.target.value);
    };

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
                        <FontAwesomeIcon icon={faMoneyBill} className={cx('icon', 'mr-8')} />
                        <span>Order</span>
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
                            <FontAwesomeIcon icon={faMoneyBill} className={cx('icon', 'mt-16')} />
                            <span className={cx('text', 'mt-16')}>Manage Order</span>
                        </div>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <td>Ảnh</td>
                                    <td>Tên</td>
                                    <td>Giá</td>
                                    <td>Số lượng</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, index) => (
                                    <tr className={cx('table-item')} key={index}>
                                        <td>
                                            <img src={item.image} alt="" className={cx('home-img')} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                onClick={handleShowView}
                                                data-name={item.name}
                                                data-price={item.price}
                                                data-quantity={item.quantity}
                                                data-category={item.category}
                                            >
                                                Xem
                                            </Link>

                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                // onClick={handleShowEdit}
                                                // data-id={item.id}
                                                // data-name={item.name}
                                                // data-price={item.price}
                                                // data-quantity={item.quantity}
                                                // data-category={item.category}
                                                // data-image={item.image}
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

            {/* <Modal show={showView} onHide={handleCloseView}>
                <Modal.Header closeButton>
                    <Modal.Title>Xem Món Ăn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập tên món ăn"
                            value={name}
                            readOnly
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="price"
                            placeholder="Nhập giá món ăn"
                            value={price}
                            readOnly
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="quantity"
                            placeholder="Nhập số lượng món ăn"
                            value={quantity}
                            readOnly
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="category"
                            placeholder="Nhập loại món ăn"
                            value={category}
                            readOnly
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseView}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}

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

export default Order;
