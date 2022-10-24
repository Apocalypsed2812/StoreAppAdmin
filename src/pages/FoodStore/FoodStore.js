// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import styles from './FoodStore.module.scss';
import app from '~/firebase.js';

const cx = classNames.bind(styles);

function FoodStore() {
    //Lấy dữ liệu từ firebase
    const dbRef = ref(getDatabase());
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState(1);
    //const imageListRef = refStorage(storage, 'images/');
    const loadFoodStore = () => {
        get(child(dbRef, `foodstores`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (snapshot.val().length > 0) {
                        console.log(snapshot.val());
                        setCategory(snapshot.val());
                        setCategoryId(parseInt(snapshot.val()[snapshot.val().length - 1].id) + 1);
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
        loadFoodStore();
    }, [dbRef]);

    const [showAdd, setShowAdd] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [idEdit, setIdEdit] = useState('');
    const [idDelete, setIdDelete] = useState('');

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        setName('');
        setShowAdd(true);
    };

    const handleCloseView = () => setShowView(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowView = (e) => {
        setName(e.target.getAttribute('data-name'));
        setPhone(e.target.getAttribute('data-phone'));
        setAddress(e.target.getAttribute('data-address'));
        setShowView(true);
    };

    const handleShowEdit = (e) => {
        setName(e.target.getAttribute('data-name'));
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
    const setNameCategory = (e) => {
        setName(e.target.value);
    };

    //Thêm dữ liệu vào firebase
    const handleAddCategory = () => {
        set(child(dbRef, `foodstores/` + categoryId), {
            id: parseInt(categoryId),
            name: name,
        })
            .then(() => {
                toast.success('Add Category Successfully !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
                toast.error('Has occured error !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
        setShowAdd(false);
    };

    //Sửa dữ liệu firebase
    const handleEditCategory = (e) => {
        console.log(idEdit);
        set(child(dbRef, `foodstores/` + idEdit), {
            id: parseInt(idEdit),
            name: name,
        })
            .then(() => {
                toast.success('Edit Category Successfully !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
                toast.error('Has occured error !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
        setShowEdit(false);
    };

    //Xóa dữ liệu firebase
    const handleDeleteCategory = (e) => {
        remove(child(dbRef, `foodstores/` + idDelete))
            .then(() => {
                toast.success('Delete Category Successfully !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
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
                <h2 className={cx('text-center', 'text-success', 'pt-5', 'mb-5')}>Quản lý quán ăn</h2>
                <div>
                    {/* <Link to="" className={cx('btn', 'btn-danger', 'mb-3', 'text-light')} onClick={handleShowAdd}>
                        Thêm danh mục +
                    </Link> */}
                    <table cellPadding="10" cellSpacing="10" border="0" className={cx('table', 'table-striped')}>
                        <thead className={cx('text-center')}>
                            <tr>
                                <td></td>
                                <td>Mã</td>
                                <td>Tên</td>
                                <td>SDT</td>
                                <td>Địa chỉ</td>
                            </tr>
                        </thead>
                        <tbody className={cx('text-center')}>
                            {category.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            to=""
                                            className={cx('view-product', 'mr-3')}
                                            onClick={handleShowView}
                                            data-name={item.name}
                                            data-id={item.id}
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
                                            data-name={item.name}
                                            data-id={item.id}
                                            data-address={item.address}
                                        >
                                            {/* <FontAwesomeIcon icon={faPen} /> */}
                                            Sửa
                                        </Link>
                                        <Link
                                            to=""
                                            className={cx('delete-product')}
                                            onClick={handleShowDelete}
                                            data-name={item.name}
                                            data-id={item.id}
                                            data-address={item.address}
                                        >
                                            {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
                                            Xóa
                                        </Link>
                                    </td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ToastContainer />
                </div>
            </div>
            {/* <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Danh Mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập tên danh mục"
                            onChange={setNameCategory}
                            value={name}
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddCategory}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal> */}

            <Modal show={showView} onHide={handleCloseView}>
                <Modal.Header closeButton>
                    <Modal.Title>Xem Quán Ăn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control', 'mb-3')}
                            name="name"
                            placeholder="Nhập tên món ăn"
                            value={name}
                            readOnly
                        />
                        <input
                            className={cx('form-control', 'mb-3')}
                            name="phone"
                            placeholder="Nhập tên món ăn"
                            value={phone}
                            readOnly
                        />
                        <input
                            className={cx('form-control', 'mb-3')}
                            name="address"
                            placeholder="Nhập tên món ăn"
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
                    <Modal.Title>Sửa Danh Mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nhập tên món ăn"
                            onChange={setNameCategory}
                            value={name}
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditCategory}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa Người Dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <p>
                            Bạn có chắc là muốn xóa nguời dùng <b>{name}</b> không ?
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteCategory}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FoodStore;
