// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, child, get, set, remove } from 'firebase/database';
import { list, getDownloadURL, listAll, ref as refStorage, uploadBytes } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { storage } from '~/firebase.js';
import styles from './Category.module.scss';
import app from '~/firebase.js';

const cx = classNames.bind(styles);

function Category() {
    //Lấy dữ liệu từ firebase
    const dbRef = ref(getDatabase());
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    //const imageListRef = refStorage(storage, 'images/');
    useEffect(() => {
        get(child(dbRef, `categorys`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    setCategory(snapshot.val());
                    setCategoryId(snapshot.val()[snapshot.val().length - 1].id + 1);
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [showAdd, setShowAdd] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [name, setName] = useState('');
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
        console.log(idDelete);
        setShowDelete(true);
    };

    //Set dữ liệu cho input
    const setNameCategory = (e) => {
        setName(e.target.value);
    };

    //Thêm dữ liệu vào firebase
    const handleAddCategory = () => {
        set(child(dbRef, `products/` + categoryId), {
            id: categoryId,
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
        setShowEdit(false);
    };

    //Sửa dữ liệu firebase
    const handleEditCategory = (e) => {
        console.log(idEdit);
        set(child(dbRef, `products/` + idEdit), {
            name: name,
        })
            .then(() => {
                toast.success('Edit Category Successfully !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setShowEdit(false);
            })
            .catch((error) => {
                toast.error('Has occured error !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    //Xóa dữ liệu firebase
    const handleDeleteCategory = (e) => {
        remove(child(dbRef, `products/` + idDelete))
            .then(() => {
                toast.success('Delete Category Successfully !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setShowDelete(false);
            })
            .catch((error) => {
                toast.error('Has occured error !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    return (
        <>
            <div className={cx('container')}>
                <h2 className={cx('text-center', 'text-primary', 'pt-5')}>Quản lý danh mục</h2>
                <div>
                    <Link to="" className={cx('btn', 'btn-danger', 'mb-3', 'text-light')} onClick={handleShowAdd}>
                        Thêm danh mục +
                    </Link>
                    <table cellPadding="10" cellSpacing="10" border="0" className={cx('table', 'table-striped')}>
                        <thead className={cx('text-center')}>
                            <tr>
                                <td></td>
                                <td>Mã</td>
                                <td>Tên</td>
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
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Danh Mục</Modal.Title>
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
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddCategory}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showView} onHide={handleCloseView}>
                <Modal.Header closeButton>
                    <Modal.Title>Xem Danh Mục</Modal.Title>
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
                    <Button ref={btnEditConfirm} variant="primary" onClick={handleEditCategory}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa Danh Mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <p>Bạn có chắc là muốn xóa món ăn này không ?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button ref={btnEditConfirm} variant="danger" onClick={handleDeleteCategory}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Category;
