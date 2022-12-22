import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

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
    const [showViewDetail, setShowViewDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [name, setName] = useState('');
    const [total, setTotal] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [product, setProduct] = useState([]);
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
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
        setTotal('');
        setPhone('');
        setAddress('');
        setShowAdd(true);
    };

    const handleCloseView = () => setShowView(false);
    const handleCloseViewDetail = () => setShowViewDetail(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowView = (e) => {
        setName(e.target.getAttribute('data-name'));
        setTotal(e.target.getAttribute('data-total'));
        setPhone(e.target.getAttribute('data-phone'));
        setAddress(e.target.getAttribute('data-address'));
        setStatus(e.target.getAttribute('data-status'));
        setDate(e.target.getAttribute('data-date'));
        setProduct(JSON.parse(e.target.getAttribute('data-product')))
        setShowView(true);
    };

    const handleDetail = () => {
        setShowViewDetail(true)
    }

    const handleShowEdit = (e) => {
        setName(e.target.getAttribute('data-name'));
        setTotal(e.target.getAttribute('data-total'));
        setPhone(e.target.getAttribute('data-phone'));
        setAddress(e.target.getAttribute('data-address'));
        setStatus(e.target.getAttribute('data-status'));
        setProduct(JSON.parse(e.target.getAttribute('data-product')))
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
    const setNameOrder = (e) => {
        setName(e.target.value);
    };

    const setPhoneOrder = (e) => {
        setPhone(e.target.value);
    };

    const setAddressOrder = (e) => {
        setAddress(e.target.value);
    };

    const setTotalOrder = (e) => {
        setTotal(e.target.value);
    };

    const setStatusOrder = (e) => {
        setStatus(e.target.value);
    };

    const handleEditOrder = () => {
        postMethod('order/update', {
            id: idEdit,
            name: name,
            phone: phone,
            address: address,
            total: total,
            status: status,
        })
            .then((res) => {
                setShowEdit(false);
                if (res.success) {
                    setOrders(res.orders);
                    Swal.fire({
                        title: 'Success',
                        text: 'Update order successfully',
                        icon: 'success',
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: res.message,
                        icon: 'error',
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


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
                                    <td>Tên</td>
                                    <td>Số điện thoại</td>
                                    <td>Tổng tiền</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, index) => (
                                    <tr className={cx('table-item')} key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.total}</td>
                                        <td>
                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                onClick={handleShowView}
                                                data-name={item.name}
                                                data-total={item.total}
                                                data-phone={item.phone}
                                                data-address={item.address}
                                                data-status={item.status}
                                                data-date={item.date}
                                                data-product={JSON.stringify(item.product)}
                                            >
                                                Xem
                                            </Link>

                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                onClick={handleShowEdit}
                                                data-id={item._id}
                                                data-name={item.name}
                                                data-total={item.total}
                                                data-phone={item.phone}
                                                data-address={item.address}
                                                data-status={item.status}
                                                data-product={JSON.stringify(item.product)}
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
                    <Modal.Title>Xem Đơn Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <span>Tên khách hàng: <b>{name}</b></span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>Số điện thoại: {phone}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>Địa chỉ: {address}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>Tổng tiền: <i>{total} VND</i></span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>Ngày tạo: <i>{date}</i></span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>Trạng thái: <b>{status}</b></span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseView}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDetail}>
                        Detail
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showViewDetail} onHide={handleCloseViewDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Xem Chi Tiết Đơn Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {product.map((item, index) => (
                        <div key={index}>
                            <div className={cx('form-group')}>
                                <label>Sản phẩm thứ {index + 1}</label>
                            </div>
                            <div className={cx('form-group', 'mb-5')}>
                                <img src={item.image_url} alt="" className={cx('home-img')} />
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewDetail}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa Đơn Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập tên danh mục"
                            onChange={setNameOrder}
                            value={name}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập địa chỉ quán ăn"
                            onChange={setPhoneOrder}
                            value={phone}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập địa chỉ quán ăn"
                            onChange={setAddressOrder}
                            value={address}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập địa chỉ quán ăn"
                            onChange={setTotalOrder}
                            value={total}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                            <select
                                className={cx('form-control')}
                                name="category"
                                onChange={setStatusOrder}
                                value={status}
                                required
                            >
                                <option value="">Choose</option>
                                <option value="Dang Giao">Đang Giao</option>
                                <option value="Đã Giao">Đã Giao</option>
                                <option value="Đã Hủy">Đã Hủy</option>
                            </select>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditOrder}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Order;
