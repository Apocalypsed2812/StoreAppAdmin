import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStore } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

import styles from './FoodStore.module.scss';
import { postMethod } from '~/utils/fetchData';
import { GlobalState } from '~/context/GlobalState';

const cx = classNames.bind(styles);

function FoodStore() {
    const state = useContext(GlobalState);
    const [foodStores, setFoodStores] = state.FoodStoreAPI.foodStores;
    const [isAdmin, setIsAdmin] = state.UserAPI.admin;

    console.log(isAdmin);

    const [showAdd, setShowAdd] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [foodStore, setFoodStore] = useState([]);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
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
        setAddress('');
        setDescription('');
        setShowAdd(true);
    };

    const handleCloseView = () => setShowView(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);

    const handleShowView = (e) => {
        setName(e.target.getAttribute('data-name'));
        setUsername(e.target.getAttribute('data-username'));
        setAddress(e.target.getAttribute('data-address'));
        setDescription(e.target.getAttribute('data-description'));
        setImage(e.target.getAttribute('data-image'));
        setShowView(true);
    };

    const handleShowEdit = (e) => {
        setName(e.target.getAttribute('data-name'));
        setAddress(e.target.getAttribute('data-address'));
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
    const setNameFoodStore = (e) => {
        setName(e.target.value);
    };

    const setUsernameFoodStore = (e) => {
        setUsername(e.target.value)
    }

    const setAddressFoodStore = (e) => {
        setAddress(e.target.value);
    };

    const setDescriptionFoodStore = (e) => {
        setDescription(e.target.value);
    };

    const setImageFoodStore = (e) => {
        setImage(e.target.files[0]);
    };

    //Th??m d??? li???u v??o firebase
    const handleAddFoodStore = (e) => {
        e.preventDefault();
        const body = new FormData(e.target);
        postMethod('foodstore/add', body)
            .then((res) => {
                setShowAdd(false);
                if (res.success) {
                    setFoodStores([...foodStores, res.foodStore]);
                    Swal.fire({
                        title: 'Success',
                        text: 'Add foodstore successfully',
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

    //S???a d??? li???u firebase
    const handleEditFoodStore = (e) => {
        postMethod('foodstore/update', { id: idEdit, name: name, address: address, description: description })
            .then((res) => {
                setShowEdit(false);
                if (res.success) {
                    setFoodStores(res.foodStores);
                    Swal.fire({
                        title: 'Success',
                        text: 'Update foodStores successfully',
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
    const handleDeleteFoodStore = (e) => {
        postMethod('foodstore/delete', { foodstore_id: idDelete })
            .then((res) => {
                setShowDelete(false);
                if (res.success) {
                    setFoodStores(res.foodStores);
                    Swal.fire({
                        title: 'Success',
                        text: 'Delete foodstore suceessfully',
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
                        <FontAwesomeIcon icon={faStore} className={cx('icon', 'mr-8')} />
                        <span>FoodStore</span>
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
                            <FontAwesomeIcon icon={faStore} className={cx('icon', 'mt-16')} />
                            <span className={cx('text', 'mt-16')}>Manage FoodStore</span>
                        </div>
                        <div>
                            <button className={cx('btn-add')} onClick={handleShowAdd}>
                                Th??m Qu??n ??n +
                            </button>
                        </div>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <td>???nh</td>
                                    <td>T??n</td>
                                    <td>?????a ch???</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {foodStores.map((item, index) => (
                                    <tr className={cx('table-item')} key={index}>
                                        <td>
                                            <img src={item.image_url} alt="" className={cx('home-img')} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <Link
                                                to=""
                                                className={cx('ml-8')}
                                                onClick={handleShowView}
                                                data-name={item.name}
                                                data-username={item.username}
                                                data-address={item.address}
                                                data-description={item.description}
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
                                                data-address={item.address}
                                                data-description={item.description}
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
                    <Modal.Title>Xem Qu??n ??n</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <img src={image} alt="" className={cx('home-img')} />
                    </div>
                    <div className={cx('form-group')}>
                        <span>T??n ????ng nh???p: <b>{username}</b></span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>T??n qu??n: <i>{name}</i></span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>?????a ch???: {address}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <span>M?? t???: {description}</span>
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
                    <Modal.Title>Th??m Qu??n ??n</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleAddFoodStore}>
                    <Modal.Body>
                        <div className={cx('form-group')}>
                            <input
                                className={cx('form-control')}
                                name="name"
                                placeholder="Nh???p t??n qu??n ??n"
                                onChange={setNameFoodStore}
                                value={name}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                className={cx('form-control')}
                                name="username"
                                placeholder="Nh???p t??n ????ng nh???p qu??n ??n"
                                onChange={setUsernameFoodStore}
                                value={username}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                className={cx('form-control')}
                                name="address"
                                placeholder="Nh???p ?????a ch??? qu??n ??n"
                                onChange={setAddressFoodStore}
                                value={address}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <textarea
                                className={cx('form-control')}
                                name="description"
                                placeholder="Nh???p m?? t??? m??n ??n"
                                onChange={setDescriptionFoodStore}
                                required
                                rows={5}
                            >
                            {description}
                            </textarea>
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                className={cx('form-control')}
                                type="file"
                                name="image"
                                onChange={(e) => setImageFoodStore(e)}
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
                    <Modal.Title>X??a Qu??n ??n</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <p className={cx('form-control')}>
                            B???n c?? ch???c l?? mu???n x??a qu??n ??n <b>{name}</b> kh??ng ?
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteFoodStore}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>S???a Qu??n ??n</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nh???p t??n danh m???c"
                            onChange={setNameFoodStore}
                            value={name}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            className={cx('form-control')}
                            name="name"
                            placeholder="Nh???p ?????a ch??? qu??n ??n"
                            onChange={setAddressFoodStore}
                            value={address}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <textarea
                            className={cx('form-control')}
                            name="description"
                            placeholder="Nh???p m?? t??? qu??n ??n"
                            onChange={setDescriptionFoodStore}
                            required
                            // cols={20}
                            rows={5}
                        >
                        {description}
                        </textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditFoodStore}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FoodStore;
