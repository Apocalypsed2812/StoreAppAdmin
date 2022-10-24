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
import styles from './Product.module.scss';
import app from '~/firebase.js';
// import UploadImage from '~/utils/uploadImage';

const cx = classNames.bind(styles);

function Product() {
    //Lấy dữ liệu từ firebase
    const dbRef = ref(getDatabase());
    const [product, setProduct] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [productId, setProductId] = useState(1);
    //const imageListRef = refStorage(storage, 'images/');
    const loadProduct = () => {
        get(child(dbRef, `products`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (snapshot.val().length > 0) {
                        console.log(snapshot.val());
                        setProduct(snapshot.val());
                        setProductId(snapshot.val()[snapshot.val().length - 1].id + 1);
                    }
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const loadCategory = () => {
        get(child(dbRef, `categorys`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (snapshot.val().length > 0) {
                        console.log(snapshot.val());
                        setCategoryList(snapshot.val());
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
        loadProduct();
        loadCategory();
        // listAll(imageListRef).then((res) => {
        //     res.items.forEach((item) => {
        //         getDownloadURL(item).then((url) => {
        //             console.log(url);
        //         });
        //     });
        //     getDownloadURL(res.items).then((url) => {
        //         console.log(url);
        //     });
        // });
    }, [dbRef]);

    const [showAdd, setShowAdd] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [idEdit, setIdEdit] = useState('');
    const [idDelete, setIdDelete] = useState('');
    let btnEditConfirm = useRef();

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        setName('');
        setPrice('');
        setQuantity('');
        setCategory('');
        setImage('');
        loadCategory();
        setShowAdd(true);
    };

    const handleCloseView = () => setShowView(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowView = (e) => {
        setName(e.target.getAttribute('data-name'));
        setPrice(e.target.getAttribute('data-price'));
        setQuantity(e.target.getAttribute('data-quantity'));
        setCategory(e.target.getAttribute('data-category'));
        setShowView(true);
    };

    const handleShowEdit = (e) => {
        loadCategory();
        setName(e.target.getAttribute('data-name'));
        setPrice(e.target.getAttribute('data-price'));
        setQuantity(e.target.getAttribute('data-quantity'));
        setCategory(e.target.getAttribute('data-category'));
        setImage(e.target.getAttribute('data-image'));
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
    const setNameProduct = (e) => {
        setName(e.target.value);
    };

    const setPriceProduct = (e) => {
        setPrice(e.target.value);
    };

    const setQuantityProduct = (e) => {
        setQuantity(e.target.value);
    };

    const setCategoryProduct = (e) => {
        setCategory(e.target.value);
    };

    const setImageProduct = (e) => {
        // let path = e.target.value;
        // let imageName = path.split('\\')[2];
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };

    //Thêm dữ liệu vào firebase
    const handleAddProduct = () => {
        if (image == null) return;
        if (category === '') {
            toast.error('Vui lòng chọn loại món ăn !', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        const imageRef = refStorage(storage, `images/${image.name}`);
        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                console.log(url);
                set(child(dbRef, `products/` + productId), {
                    id: productId,
                    name: name,
                    price: price,
                    quantity: quantity,
                    category: category,
                    image: url,
                }).then(() => {
                    setShowAdd(false);
                    toast.success('Add Product Successfully !', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    loadProduct();
                });
            });
        });
    };

    //Sửa dữ liệu firebase
    const handleEditProduct = (e) => {
        console.log(idEdit);
        set(child(dbRef, `products/` + idEdit), {
            id: parseInt(idEdit),
            name: name,
            price: price,
            quantity: quantity,
            category: category,
            image: image,
        })
            .then(() => {
                toast.success('Edit Product Successfully !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loadProduct();
                setShowEdit(false);
            })
            .catch((error) => {
                toast.error('Has occured error !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    //Xóa dữ liệu firebase
    const handleDeleteProduct = (e) => {
        remove(child(dbRef, `products/` + idDelete))
            .then(() => {
                toast.success('Delete Product Successfully !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loadProduct();
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
                <h2 className={cx('text-center', 'text-danger', 'pt-5')}>Quản lý món ăn</h2>
                <div>
                    <Link
                        to=""
                        className={cx('btn', 'btn-primary', 'mb-3', 'ml-5', 'text-light')}
                        onClick={handleShowAdd}
                    >
                        Thêm món ăn +
                    </Link>
                    <table cellPadding="10" cellSpacing="10" border="0" className={cx('table', 'table-striped')}>
                        <thead className={cx('text-center')}>
                            <tr>
                                <td colSpan="2"></td>
                                <td>Tên</td>
                                <td>Giá</td>
                                <td>Số lượng</td>
                                <td>Loại món ăn</td>
                            </tr>
                        </thead>
                        <tbody className={cx('text-center')}>
                            {product.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            to=""
                                            className={cx('view-product', 'mr-3')}
                                            onClick={handleShowView}
                                            data-name={item.name}
                                            data-price={item.price}
                                            data-quantity={item.quantity}
                                            data-category={item.category}
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
                                            data-price={item.price}
                                            data-quantity={item.quantity}
                                            data-category={item.category}
                                            data-image={item.image}
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
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </div>

            <Modal show={showAdd} onHide={handleCloseAdd}>
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
            </Modal>

            <Modal show={showView} onHide={handleCloseView}>
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
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa Món Ăn</Modal.Title>
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
                            <option value={category}>{category}</option>
                            {categoryList.forEach((item, index) => {
                                if (item.name === category) {
                                    categoryList.splice(index, 1);
                                }
                            })}
                            {categoryList.map((item, index) => (
                                <option value={item.name} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button ref={btnEditConfirm} variant="primary" onClick={handleEditProduct}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa Món Ăn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <p>
                            Bạn có chắc là muốn xóa món ăn <b>{name}</b> không ?
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button ref={btnEditConfirm} variant="danger" onClick={handleDeleteProduct}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Product;
