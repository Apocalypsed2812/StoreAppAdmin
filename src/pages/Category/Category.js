// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Category.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Category() {
    // const [productList, setProductList] = useState([]);

    // const quantityProduct = 6;

    // useEffect(() => {
    //     fetch('http://localhost:4000/staff/getProductList/' + quantityProduct, {
    //         method: 'GET',
    //     })
    //         .then((res) => res.json())
    //         .then((json) => {
    //             setProductList(json.data);
    //         })
    //         .catch((e) => console.log(e));
    // }, []);

    return (
        <div className={cx('container')}>
            <h2 className={cx('text-center', 'text-primary', 'pt-5')}>Quản lý danh mục</h2>
            <div>
                <Link to="" className={cx('btn', 'btn-danger', 'mb-3', 'text-light')}>
                    Thêm danh mục +
                </Link>
                <table cellPadding="10" cellSpacing="10" border="0" className={cx('table', 'table-striped')}>
                    <thead className={cx('text-center')}>
                        <tr>
                            <td>Mã</td>
                            <td>Tên</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody className={cx('text-center')}>
                        <tr>
                            <td>1</td>
                            <td>Cơm</td>
                            <td>
                                <Link to="" className={cx('view-product', 'mr-3')}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Link>

                                <Link to="" className={cx('edit-product', 'mr-3')}>
                                    <FontAwesomeIcon icon={faPen} />
                                </Link>
                                <Link
                                    to=""
                                    className={cx('delete-product', 'mr-3')}
                                    data-toggle="modal"
                                    data-target="#delete-modal"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Category;
