import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-2-4')}>
                        <h3 className={cx('heading')}>Hỗ trợ khách hàng</h3>
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Hotline: 1900 - 6035
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Các câu hỏi thường gặp
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Gửi yêu cầu hỗ trợ
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Hướng dẫn đặt hàng
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Phương thức vận chuyển
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Chính sách đổi trả
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('col', 'l-2-4')}>
                        <h3 className={cx('heading')}>Về TiKi</h3>
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Gưới thiệu Tiki
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Tuyển dụng
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Chính sách bảo mật thanh toán
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Chính sách bảo mật thông tin cá nhân
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Chính sách giải quyết khiếu nại
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Điều khoản sử dụng
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('col', 'l-2-4')}>
                        <h3 className={cx('heading')}>Hợp tác và liên kết</h3>
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Quy chế hoạt động sàn TMDT
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Bán hàng cùng tiki
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('col', 'l-2-4')}>
                        <h3 className={cx('heading')}>Phương thức thanh toán</h3>
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Thẻ ngân hàng
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Visa
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Momo
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Zalopay
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    Moca
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('col', 'l-2-4')}>
                        <h3 className={cx('heading')}>Kết nối với chúng tôi</h3>
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    <FontAwesomeIcon icon={faFacebook} className={cx('item-link-social')} />
                                    Facebook
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    <FontAwesomeIcon icon={faInstagram} className={cx('item-link-social')} />
                                    Instagram
                                </Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="" className={cx('item-link')}>
                                    <FontAwesomeIcon icon={faLinkedin} className={cx('item-link-social')} />
                                    Linked-in
                                </Link>
                            </li>
                        </ul>

                        <h3 className={cx('heading', 'mt-16')}>Tải ứng dụng trên điện thoại</h3>
                        <div className={cx('download')}>
                            <img
                                src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png"
                                alt="Download QR"
                                className={cx('download-qr')}
                            />
                            <div className={cx('download-apps')}>
                                <Link to="" className={cx('download-app-link')}>
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                                        alt="Google Play"
                                        className={cx('download-app-img')}
                                    />
                                </Link>
                                <Link to="" className={cx('download-app-link')}>
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                                        alt="App Store"
                                        className={cx('download-app-img')}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
