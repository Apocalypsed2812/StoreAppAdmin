import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Category.module.scss';
import { GlobalState } from '~/context/GlobalState';
import { postMethod } from '~/utils/fetchData';

const cx = classNames.bind(styles);

function Category() {
    //Lấy dữ liệu
    const state = useContext(GlobalState);
    const navigate = useNavigate()
    const [category, setCategory] = state.CategoryAPI.categorys;
    const [isAdmin, setIsAdmin] = state.UserAPI.admin;

    const [showAdd, setShowAdd] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [idEdit, setIdEdit] = useState('');
    const [idDelete, setIdDelete] = useState('');

    // useEffect(() => {
    //     if (!isAdmin) {
    //         navigate('/login');
    //     }
    // }, []);

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
        setImage(e.target.getAttribute('data-image'));
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

    const setImageProduct = (e) => {
        setImage(e.target.files[0]);
    };

    //Thêm dữ liệu vào firebase
    const handleAddCategory = (e) => {
        e.preventDefault();
        const body = new FormData(e.target);
        postMethod('category/add', body)
            .then((res) => {
                setShowAdd(false);
                if (res.success) {
                    setCategory([...category, res.category]);
                    Swal.fire({
                        title: 'Success',
                        text: 'Add category successfully',
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
    };

    //Sửa dữ liệu firebase
    const handleEditCategory = (e) => {
        postMethod('category/update', { id: idEdit, name: name })
            .then((res) => {
                setShowEdit(false);
                if (res.success) {
                    setCategory(res.categorys);
                    Swal.fire({
                        title: 'Success',
                        text: 'Update category successfully',
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
    };

    //Xóa dữ liệu firebase
    const handleDeleteCategory = (e) => {
        postMethod('category/delete', { category_id: idDelete })
            .then((res) => {
                setShowDelete(false);
                if (res.success) {
                    setCategory([...category]);
                    Swal.fire({
                        title: 'Success',
                        text: 'Delete category suceessfully',
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
    };

    return (
        <>
            <div className={cx('dashboard')}>
                <div className={cx('top')}>
                    <div>
                        <FontAwesomeIcon icon={faBars} className={cx('icon', 'mr-8')} />
                        <span>Category</span>
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
                            <FontAwesomeIcon icon={faBars} className={cx('icon', 'mt-16')} />
                            <span className={cx('text', 'mt-16')}>Manage Category</span>
                        </div>
                        <div>
                            <button className={cx('btn-add')} onClick={handleShowAdd}>
                                Thêm Danh Mục +
                            </button>
                        </div>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <td>Tên</td>
                                    <td>Ảnh</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {category.map((item, index) => (
                                    <tr className={cx('table-item')} key={index}>
                                        <td>{item.name}</td>
                                        <td>
                                            <img src={item.image_url} alt="" className={cx('category-img')} />
                                        </td>
                                        <td>
                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                onClick={handleShowView}
                                                data-name={item.name}
                                                data-image={item.image_url}
                                            >
                                                Xem
                                            </Link>

                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                onClick={handleShowEdit}
                                                data-id={item._id}
                                                data-name={item.name}
                                            >
                                                Sửa
                                            </Link>
                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                onClick={handleShowDelete}
                                                data-id={item._id}
                                                data-name={item.name}
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
                    <div className={cx('form-group')}>
                        <img src={image} alt="" className={cx('category-img')} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseView}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Danh Mục</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleAddCategory}>
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
                        <div className={cx('form-group')}>
                            <input
                                className={cx('form-control')}
                                type="file"
                                name="image"
                                onChange={(e) => setImageProduct(e)}
                                required
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa Danh Mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <p className={cx('form-control')}>
                            Bạn có chắc là muốn xóa danh mục <b>{name}</b> không ?
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteCategory}>
                        Delete
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
                            placeholder="Nhập tên danh mục"
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
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Category;
