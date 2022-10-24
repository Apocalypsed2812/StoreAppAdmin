// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, child, get, set, remove } from 'firebase/database';
import { list, getDownloadURL, listAll, ref as refStorage, uploadBytes } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { storage } from '~/firebase.js';
import styles from './Shipper.module.scss';
import app from '~/firebase.js';
// import UploadImage from '~/utils/uploadImage';

const cx = classNames.bind(styles);

function Shipper() {
    //Lấy dữ liệu từ firebase
    const dbRef = ref(getDatabase());
    const [shipper, setShipper] = useState([]);
    const [shipperId, setShipperId] = useState(1);
    const loadShipper = () => {
        get(child(dbRef, `shippers`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (snapshot.val().length > 0) {
                        console.log(snapshot.val());
                        setShipper(snapshot.val());
                        setShipperId(snapshot.val()[snapshot.val().length - 1].id + 1);
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
        loadShipper();
    }, [dbRef]);

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
        setName(e.target.getAttribute('data-name'));
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
    const handleAddShipper = () => {
        set(child(dbRef, `shippers/` + shipperId), {
            id: shipperId,
            name: name,
            username: username,
            phone: phone,
            address: address,
            password: '123456789',
        })
            .then(() => {
                toast.success('Add Shipper Successfully !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loadShipper();
            })
            .catch((error) => {
                toast.error('Has occured error !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
        setShowAdd(false);
    };

    //Sửa dữ liệu firebase
    const handleEditShipper = (e) => {
        console.log(idEdit);
        set(child(dbRef, `shippers/` + idEdit), {
            id: parseInt(idEdit),
            name: name,
            username: username,
            phone: phone,
            address: address,
        })
            .then(() => {
                toast.success('Edit Shipper Successfully !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loadShipper();
            })
            .catch((error) => {
                toast.error('Has occured error !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
        setShowEdit(false);
    };

    //Xóa dữ liệu firebase
    const handleDeleteShipper = (e) => {
        remove(child(dbRef, `shippers/` + idDelete))
            .then(() => {
                toast.success('Delete Shipper Successfully !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loadShipper();
            })
            .catch((error) => {
                toast.error('Has occured error !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
        setShowDelete(false);
    };

    return (
        <>
            <div className={cx('container')}>
                <h2 className={cx('text-center', 'text-danger', 'pt-5')}>Quản lý người giao hàng</h2>
                <div>
                    <Link
                        to=""
                        className={cx('btn', 'btn-primary', 'mb-3', 'ml-5', 'text-light')}
                        onClick={handleShowAdd}
                    >
                        Thêm người giao hàng +
                    </Link>
                    <table cellPadding="10" cellSpacing="10" border="0" className={cx('table', 'table-striped')}>
                        <thead className={cx('text-center')}>
                            <tr>
                                <td colSpan="2"></td>
                                <td>Username</td>
                                <td>Tên</td>
                                <td>SDT</td>
                                <td>Địa chỉ</td>
                            </tr>
                        </thead>
                        <tbody className={cx('text-center')}>
                            {shipper.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            to=""
                                            className={cx('view-product', 'mr-3')}
                                            onClick={handleShowView}
                                            data-name={item.name}
                                            data-username={item.username}
                                            data-phone={item.phone}
                                            data-address={item.address}
                                        >
                                            {/* <FontAwesomeIcon icon={faEye} /> */}
                                            Xem
                                        </Link>

                                        <Link
                                            to=""
                                            className={cx('edit-product', 'mr-3')}
                                            onClick={handleShowEdit}
                                            data-id={item.id}
                                            data-name={item.name}
                                            data-username={item.username}
                                            data-phone={item.phone}
                                            data-address={item.address}
                                        >
                                            {/* <FontAwesomeIcon icon={faPen} /> */}
                                            Sửa
                                        </Link>
                                        <Link
                                            to=""
                                            className={cx('delete-product')}
                                            onClick={handleShowDelete}
                                            data-id={item.id}
                                            data-name={item.name}
                                        >
                                            {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
                                            Xóa
                                        </Link>
                                    </td>
                                    <td>
                                        <img src={item.image} alt="" className={cx('product-img')} />
                                    </td>
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </div>

            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Người Giao Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="category"
                            placeholder="Nhập username"
                            onChange={setUsernameShipper}
                            value={username}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập tên người giao hàng"
                            onChange={setNameShipper}
                            value={name}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="price"
                            placeholder="Nhập số điện thoại"
                            onChange={setPhoneShipper}
                            value={phone}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="quantity"
                            placeholder="Nhập địa chỉ người giao hàng"
                            onChange={setAddressShipper}
                            value={address}
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddShipper}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showView} onHide={handleCloseView}>
                <Modal.Header closeButton>
                    <Modal.Title>Xem Thông Tin Người Giao Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập tên món ăn"
                            value={username}
                            readOnly
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="price"
                            placeholder="Nhập giá món ăn"
                            value={name}
                            readOnly
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="quantity"
                            placeholder="Nhập số lượng món ăn"
                            value={phone}
                            readOnly
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="category"
                            placeholder="Nhập loại món ăn"
                            value={address}
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

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa Người Giao Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="quantity"
                            placeholder="Nhập số lượng món ăn"
                            onChange={setUsernameShipper}
                            value={username}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập tên món ăn"
                            onChange={setNameShipper}
                            value={name}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="price"
                            placeholder="Nhập giá món ăn"
                            onChange={setPhoneShipper}
                            value={phone}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="category"
                            placeholder="Nhập loại món ăn"
                            onChange={setAddressShipper}
                            value={address}
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditShipper}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa Người Giao Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <p>
                            Bạn có chắc là muốn xóa người giao hàng <b>{name}</b> không ?
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteShipper}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Shipper;
