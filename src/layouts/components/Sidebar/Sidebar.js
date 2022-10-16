import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
//import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('infor')}>
                <img className={cx('avatar')} src="https://salt.tikicdn.com/desktop/img/avatar.png" alt="" />
                <div className={cx('name')}>
                    Tài khoản của <span>Apocalysed</span>
                </div>
            </div>
            <div className={cx('item', 'background')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                Thông tin tài khoản
            </div>
            <div className={cx('item')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                Thông báo của tôi
            </div>
            <div className={cx('item')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                Quản lý đơn hàng
            </div>
            <div className={cx('item')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                Quản lý đổi trả
            </div>
            <div className={cx('item')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                Số địa chỉ
            </div>
            <div className={cx('item')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                Thông tin thanh toán
            </div>
            <div className={cx('item')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                Nhận xét sản phẩm đã mua
            </div>
            <div className={cx('item')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                Sản phẩm bạn đã xem
            </div>
            <div className={cx('item')}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                Sản phẩm yêu thích
            </div>
        </div>
    );
}

export default Sidebar;
