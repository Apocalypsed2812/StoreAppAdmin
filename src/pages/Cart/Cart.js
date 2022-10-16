import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

let cartProduct = true;

function Cart() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('row', 'pt-16')}>
                    <div className={cx('col', 'l-12')}>
                        <span className={cx('cart')}>GIỎ HÀNG</span>
                    </div>
                </div>

                {cartProduct ? (
                    <>
                        <div className={cx('row', 'pt-16')}>
                            <div className={cx('col', 'l-9')}>
                                <div className={cx('above-product')}>
                                    <input type="checkbox" />
                                    <div className={cx('all-product')}>
                                        Tất cả (<span>1</span> sản phẩm)
                                    </div>
                                    <div className={cx('price-product')}>Đơn giá</div>
                                    <div className={cx('quantity-product')}>Số lượng</div>
                                    <div className={cx('buy-product')}>Thành tiền</div>
                                    <FontAwesomeIcon icon={faTrashCan} className={cx('delete-product')} />
                                </div>
                            </div>
                            <div className={cx('col', 'l-3')}>
                                <div className={cx('sale-code')}>Chọn hoặc nhập khuyến mãi khác</div>
                            </div>
                        </div>
                        <div className={cx('row', 'mt-16')}>
                            <div className={cx('col', 'l-9')}>
                                <div className={cx('row')}>
                                    <div className={cx('col', 'l-12')}>
                                        <div className={cx('product')}>
                                            <input type="checkbox" />
                                            <div className={cx('product-content')}>
                                                <img
                                                    src="https://salt.tikicdn.com/cache/w1200/ts/product/aa/24/e0/57914989351786ef9dfe027046ba4626.jpg"
                                                    alt=""
                                                />
                                                <div className={cx('content')}>
                                                    <h3 className={cx('heading')}>Iphone 13</h3>
                                                    <span>
                                                        <span className={cx('owner')}>Apple Company</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={cx('price')}>
                                                <div className={cx('new-price')}>13.324.000 đ</div>
                                                <div className={cx('old-sale')}>
                                                    <div className={cx('old-price')}>10.023.456 đ</div>
                                                    <div className={cx('sale-price')}>-19%</div>
                                                </div>
                                            </div>
                                            <div className={cx('quantity')}>
                                                <button className={cx('sub')}>-</button>
                                                <button className={cx('current')}>1</button>
                                                <button className={cx('add')}>+</button>
                                            </div>
                                            <div className={cx('buy-price')}>13.360.000 đ</div>
                                            <FontAwesomeIcon icon={faTrashCan} className={cx('delete-product')} />
                                        </div>
                                    </div>
                                    <div className={cx('col', 'l-12')}>
                                        <div className={cx('product')}>
                                            <input type="checkbox" />
                                            <div className={cx('product-content')}>
                                                <img
                                                    src="https://salt.tikicdn.com/cache/w1200/ts/product/aa/24/e0/57914989351786ef9dfe027046ba4626.jpg"
                                                    alt=""
                                                />
                                                <div className={cx('content')}>
                                                    <h3 className={cx('heading')}>Iphone 13</h3>
                                                    <span>
                                                        <span className={cx('owner')}>Apple Company</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={cx('price')}>
                                                <div className={cx('new-price')}>13.324.000 đ</div>
                                                <div className={cx('old-sale')}>
                                                    <div className={cx('old-price')}>10.023.456 đ</div>
                                                    <div className={cx('sale-price')}>-19%</div>
                                                </div>
                                            </div>
                                            <div className={cx('quantity')}>
                                                <button className={cx('sub')}>-</button>
                                                <button className={cx('current')}>1</button>
                                                <button className={cx('add')}>+</button>
                                            </div>
                                            <div className={cx('buy-price')}>13.360.000 đ</div>
                                            <FontAwesomeIcon icon={faTrashCan} className={cx('delete-product')} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('col', 'l-3')}>
                                <div className={cx('row')}>
                                    <div className={cx('col', 'l-12')}>
                                        <div className={cx('price')}>
                                            <div className={cx('temp')}>
                                                <p>Tạm Tính</p>
                                                <p>13.345.000đ</p>
                                            </div>
                                            <div className={cx('separate')}></div>
                                            <div className={cx('buy')}>
                                                <p>Thành Tiền</p>
                                                <div className={cx('buy-price')}>
                                                    <p>13.345.000đ</p>
                                                    <p>(Đã bao gồm VAT nếu có)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('row', 'mt-16')}>
                                    <div className={cx('col', 'l-12')}>
                                        <button className={cx('button')}>Tiến Hành Đặt Hàng</button>
                                    </div>
                                </div>

                                <div className={cx('row', 'mt-16')}>
                                    <div className={cx('col', 'l-12')}>
                                        <div className={cx('sale')}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={cx('row', 'mt-16')}>
                        <div className={cx('col', 'l-12')}>
                            <div className={cx('no-product')}>
                                <div>
                                    <img
                                        className={cx('no-product-img')}
                                        src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"
                                        alt=""
                                    />
                                    <p className={cx('no-product-text')}>Không có sản phẩm nào để hiển thị</p>
                                    <div className={cx('no-product-btn')}>
                                        <button>Tiếp tục mua sắm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={cx('modal')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body')}>
                    <div className={cx('auth-form')}>
                        <div className={cx('auth-form__container')}>
                            <div className={cx('auth-form__header')}>
                                <h2>Tiki khuyến mãi</h2>
                                <FontAwesomeIcon icon={faXmark} className={cx('auth-form__header-icon')} />
                            </div>

                            <div className={cx('auth-form__form')}>
                                <div className={cx('auth-form__group')}>
                                    <input
                                        type="text"
                                        className={cx('auth-form__input')}
                                        placeholder="Nhập mã giảm giá"
                                    />
                                    <button className={cx('auth-form__btn')}>Áp dụng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
