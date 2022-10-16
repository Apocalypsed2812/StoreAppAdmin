import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
// import HeadlessTippy from '@tippyjs/react/headless';

//import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

let orderHistory = true;

function Order() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Đơn hàng của tôi</div>
            <div className={cx('header-list', 'mt-16')}>
                <div className={cx('header-item', 'header-item-choose')}>Tất cả</div>
                <div className={cx('header-item')}>Chờ thanh toán</div>
                <div className={cx('header-item')}>Đang xử lý</div>
                <div className={cx('header-item')}>Đang vận chuyển</div>
                <div className={cx('header-item')}>Đã giao</div>
                <div className={cx('header-item')}>Đã hủy</div>
            </div>
            <div className={cx('search', 'mt-16')}>
                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                <input type="text" placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm" />
                <div className={cx('search-text')}>Tìm đơn hàng</div>
            </div>

            {orderHistory ? (
                <>
                    <div className={cx('container', 'mt-16')}>
                        <div className={cx('header-order')}>
                            <div>
                                <p>Mã Đơn hàng</p>
                                <p>DH001</p>
                            </div>
                            <div>
                                <p>Ngày mua</p>
                                <p>22/12/2022</p>
                            </div>
                            <div>
                                <p>Tổng tiền</p>
                                <p>100.000 đ</p>
                            </div>
                        </div>
                        <div className={cx('content-order', 'mt-16')}>
                            <img
                                src="https://salt.tikicdn.com/cache/w1200/ts/product/aa/24/e0/57914989351786ef9dfe027046ba4626.jpg"
                                alt=""
                            />
                            <div className={cx('content-order-des')}>
                                <div className={cx('content-order-heading')}>Iphone 13 pro max</div>
                                <div className={cx('content-order-price')}>
                                    <span>100.000</span> đ
                                </div>
                                <div className={cx('content-order-quantity')}>
                                    Số lượng <span>1</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-order', 'mt-16')}>
                            <img
                                src="https://salt.tikicdn.com/cache/w1200/ts/product/aa/24/e0/57914989351786ef9dfe027046ba4626.jpg"
                                alt=""
                            />
                            <div className={cx('content-order-des')}>
                                <div className={cx('content-order-heading')}>Iphone 13 pro max</div>
                                <div className={cx('content-order-price')}>
                                    <span>100.000</span> đ
                                </div>
                                <div className={cx('content-order-quantity')}>
                                    Số lượng <span>1</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-btn', 'mt-16')}>
                            <button>Xem chi tiết đơn hàng</button>
                            <button>Theo dõi đơn hàng</button>
                        </div>
                    </div>
                    <div className={cx('container', 'mt-16')}>
                        <div className={cx('header-order')}>
                            <div>
                                <p>Mã Đơn hàng</p>
                                <p>DH001</p>
                            </div>
                            <div>
                                <p>Ngày mua</p>
                                <p>22/12/2022</p>
                            </div>
                            <div>
                                <p>Tổng tiền</p>
                                <p>100.000 đ</p>
                            </div>
                        </div>
                        <div className={cx('content-order', 'mt-16')}>
                            <img
                                src="https://salt.tikicdn.com/cache/w1200/ts/product/aa/24/e0/57914989351786ef9dfe027046ba4626.jpg"
                                alt=""
                            />
                            <div className={cx('content-order-des')}>
                                <div className={cx('content-order-heading')}>Iphone 13 pro max</div>
                                <div className={cx('content-order-price')}>
                                    <span>100.000</span> đ
                                </div>
                                <div className={cx('content-order-quantity')}>
                                    Số lượng <span>1</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-order', 'mt-16')}>
                            <img
                                src="https://salt.tikicdn.com/cache/w1200/ts/product/aa/24/e0/57914989351786ef9dfe027046ba4626.jpg"
                                alt=""
                            />
                            <div className={cx('content-order-des')}>
                                <div className={cx('content-order-heading')}>Iphone 13 pro max</div>
                                <div className={cx('content-order-price')}>
                                    <span>100.000</span> đ
                                </div>
                                <div className={cx('content-order-quantity')}>
                                    Số lượng <span>1</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-btn', 'mt-16')}>
                            <button>Xem chi tiết đơn hàng</button>
                            <button>Theo dõi đơn hàng</button>
                        </div>
                    </div>
                </>
            ) : (
                <div className={cx('container-no-order', 'mt-16')}>
                    <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png" alt="" />
                    <div className={cx('no-order')}>Chưa có đơn hàng</div>
                </div>
            )}
        </div>
    );
}

export default Order;
