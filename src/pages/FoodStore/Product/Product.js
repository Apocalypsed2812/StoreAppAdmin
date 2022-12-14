import {
    faBowlFood,
    faBowlRice,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

import styles from './Product.module.scss';
import { postMethod } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';

const cx = classNames.bind(styles);

function Product() {
    const state = useContext(GlobalState);
    const [isLogin, setIsLogin] = state.UserAPI.login;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate('/login');
        }
    }, []);

    const categorys = state.CategoryAPI.categorys[0];
    const foodStores = state.FoodStoreAPI.foodStores[0];
    let [products, setProducts] = state.ProductAPI.products;
    const user = state.UserAPI.user[0];

    console.log("username foodstore", user)

    const [showAdd, setShowAdd] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);


    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [foodstore, setFoodStore] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');
    const [idEdit, setIdEdit] = useState('');
    const [idDelete, setIdDelete] = useState('');
    const [nameFoodStore, setNameFoodStore] = useState('');


    useEffect(() => {
        const getNameFoodStore = async () => {
            let response = await postMethod("foodstore/username", {username: user.username})
            return response
        }
        getNameFoodStore()
            .then(res => {
                if (res.success) {
                    setNameFoodStore(res.foodStore.name)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    console.log("Name FoodStore", nameFoodStore)

    products = products.filter(item => (
        item.foodstore === nameFoodStore
    ))

    console.log("Product List FoodStore", products)

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        setName('');
        setQuantity('');
        setPrice('');
        setDescription('');
        setShowAdd(true);
    };

    const handleCloseView = () => setShowView(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowView = (e) => {
        setName(e.target.getAttribute('data-name'));
        setPrice(e.target.getAttribute('data-price'));
        setQuantity(e.target.getAttribute('data-quantity'));
        setDescription(e.target.getAttribute('data-description'));
        setCategory(e.target.getAttribute('data-category'));
        setFoodStore(e.target.getAttribute('data-foodstore'));
        setImage(e.target.getAttribute('data-image'));
        setStatus(e.target.getAttribute('data-status'));
        setShowView(true);
    };

    const handleShowEdit = (e) => {
        setName(e.target.getAttribute('data-name'));
        setPrice(e.target.getAttribute('data-price'));
        setQuantity(e.target.getAttribute('data-quantity'));
        setDescription(e.target.getAttribute('data-description'));
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

    //Set d??? li???u cho input
    const setNameProduct = (e) => {
        setName(e.target.value);
    };

    const setQuantityProduct = (e) => {
        setQuantity(e.target.value);
    };

    const setPriceProduct = (e) => {
        setPrice(e.target.value);
    };

    const setDescriptionProduct = (e) => {
        setDescription(e.target.value);
    };

    const setCategoryProduct = (e) => {
        setCategory(e.target.value);
    };

    const setFoodStoreProduct = (e) => {
        setFoodStore(e.target.value);
    };

    const setImageProduct = (e) => {
        setImage(e.target.files[0]);
    };

    const setStatusProduct = (e) => {
        setStatus(e.target.value);
    };

    //Th??m d??? li???u
    const handleAddProduct = (e) => {
        e.preventDefault();
        const body = new FormData(e.target);
        postMethod('product/add', body)
            .then((res) => {
                setShowAdd(false);
                if (res.success) {
                    setProducts([...products, res.product]);
                    Swal.fire({
                        title: 'Success',
                        text: 'Add product successfully',
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

    //S???a d??? li???u 
    const handleEditProduct = (e) => {
        postMethod('product/update', {
            id: idEdit,
            name: name,
            quantity: quantity,
            description: description,
            price: price,
            status: status,
        })
            .then((res) => {
                setShowEdit(false);
                if (res.success) {
                    setProducts(res.products);
                    Swal.fire({
                        title: 'Success',
                        text: 'Update product successfully',
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

    //X??a d??? li???u firebase
    const handleDeleteProduct = (e) => {
        postMethod('product/delete', { id: idDelete })
            .then((res) => {
                setShowDelete(false);
                if (res.success) {
                    setProducts([...products]);
                    Swal.fire({
                        title: 'Success',
                        text: 'Delete product successfully',
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
                        <FontAwesomeIcon icon={faBowlFood} className={cx('icon', 'mr-8')} />
                        <span>Food</span>
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
                            <FontAwesomeIcon icon={faBowlRice} className={cx('icon', 'mt-16')} />
                            <span className={cx('text', 'mt-16')}>Manage Food</span>
                        </div>
                        <div>
                            <button className={cx('btn-add')} onClick={handleShowAdd}>
                                Th??m M??n ??n +
                            </button>
                        </div>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <td>???nh</td>
                                    <td>T??n</td>
                                    <td>Gi??</td>
                                    <td>S??? l?????ng</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item, index) => (
                                    <tr className={cx('table-item')} key={index}>
                                        <td>
                                            <img src={item.image_url} alt="" className={cx('home-img')} />
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
                                                data-description={item.description}
                                                data-category={item.category}
                                                data-foodstore={item.foodstore}
                                                data-image={item.image_url}
                                                data-status={item.status}
                                            >
                                                Xem
                                            </Link>

                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                onClick={handleShowEdit}
                                                data-id={item._id}
                                                data-name={item.name}
                                                data-price={item.price}
                                                data-quantity={item.quantity}
                                                data-description={item.description}
                                                data-image={item.image_url}
                                            >
                                                S???a
                                            </Link>
                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                onClick={handleShowDelete}
                                                data-id={item._id}
                                                data-name={item.name}
                                            >
                                                X??a
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
                    <Modal.Title>Xem M??n ??n</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className={cx('form-group','text-center')}>
                        <img src={image} alt="" className={cx('home-img-view')} />
                    </div>
                    <div className={cx('form-group')}>
                        <span>T??n m??n ??n: <b>{name}</b></span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>S??? l?????ng: <b>{quantity}</b></span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>Gi??: <i>{price} VND</i></span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>Qu??n ??n: {foodstore}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>M?? t???: {description}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>Tr???ng Th??i: {status}</span>
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
                    <Modal.Title>Th??m M??n ??n</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleAddProduct}>
                    <Modal.Body>
                        <div className={cx('form-group')}>
                            <input
                                className={cx('form-control')}
                                name="name"
                                placeholder="Nh???p t??n m??n ??n"
                                onChange={setNameProduct}
                                value={name}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                className={cx('form-control')}
                                name="quantity"
                                placeholder="Nh???p s??? l?????ng m??n ??n"
                                onChange={setQuantityProduct}
                                value={quantity}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                className={cx('form-control')}
                                name="price"
                                type="Number"
                                placeholder="Nh???p gi?? m??n ??n"
                                onChange={setPriceProduct}
                                value={price}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <textarea
                                className={cx('form-control')}
                                name="description"
                                placeholder="Nh???p m?? t??? m??n ??n"
                                onChange={setDescriptionProduct}
                                required
                                rows={5}
                            >
                            {description}
                            </textarea>
                        </div>
                        <div className={cx('form-group')}>
                            <select
                                className={cx('form-control')}
                                name="category"
                                onChange={setCategoryProduct}
                                value={category}
                                required
                            >
                                <option value="">Choose</option>
                                {categorys.map((item, index) => (
                                    <option value={item.name} key={index}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <select
                                className={cx('form-control')}
                                name="foodstore"
                                onChange={setFoodStoreProduct}
                                value={foodstore}
                                required
                            >
                                <option value="">Choose</option>
                                {foodStores.map((item, index) => (
                                    <option value={item.name} key={index}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
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
                    <Modal.Title>X??a M??n ??n</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <p className={cx('form-control')}>
                            B???n c?? ch???c l?? mu???n x??a m??n ??n <b>{name}</b> kh??ng ?
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProduct}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>S???a M??n ??n</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nh???p t??n danh m???c"
                            onChange={setNameProduct}
                            value={name}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nh???p ?????a ch??? qu??n ??n"
                            onChange={setQuantityProduct}
                            value={quantity}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nh???p ?????a ch??? qu??n ??n"
                            onChange={setPriceProduct}
                            value={price}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <textarea
                            className={cx('form-control')}
                            name="description"
                            placeholder="Nh???p m?? t??? m??n ??n"
                            onChange={setDescriptionProduct}
                            required
                            rows={5}
                        >
                        {description}
                        </textarea>
                    </div>
                    {/* <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nh???p t??n qu??n ??n"
                            onChange={setDescriptionProduct}
                            value={description}
                            required
                        />
                    </div> */}
                    <div className={cx('form-group')}>
                            <select
                                className={cx('form-control')}
                                name="category"
                                onChange={setStatusProduct}
                                value={status}
                                required
                            >
                                <option value="">Choose</option>
                                <option value="V???n C??n">V???n C??n</option>
                                <option value="???? H???t">???? H???t</option>
                            </select>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditProduct}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Product;
