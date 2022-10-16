// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
//import { Link } from 'react-router-dom';
//import HeadlessTippy from '@tippyjs/react/headless';

//import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './UserInfor.module.scss';

const cx = classNames.bind(styles);

function UserInfor() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thông tin tài khoản</h3>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-7', 'user-infor')}>
                        <div className={cx('title')}>Thông tin cá nhân</div>
                        <div className={cx('infor-avatar')}>
                            <img
                                src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png"
                                alt=""
                            />
                            <div className={cx('name-nickname')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="name">Họ và Tên</label>
                                    <input type="text" defaultValue="Apoca lysed" id="name" />
                                </div>
                                <div className={cx('form-group')}>
                                    <label htmlFor="nickname">Nickname</label>
                                    <input type="text" defaultValue="" placeholder="Thêm nickname" id="nickname" />
                                </div>
                            </div>
                        </div>
                        <div className={cx('year', 'mt-16')}>
                            <label>Ngày sinh</label>
                            <div className={cx('year-select')}>
                                <select>
                                    <option>Ngày</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <select>
                                    <option>Tháng</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <select>
                                    <option>Năm</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx('sex', 'mt-32')}>
                            <label>Giới tính</label>
                            <div className={cx('sex-select')}>
                                <div className={cx('sex-form-group')}>
                                    <input type="radio" /> Nam
                                </div>
                                <div className={cx('sex-form-group')}>
                                    <input type="radio" /> Nữ
                                </div>
                                <div className={cx('sex-form-group')}>
                                    <input type="radio" /> Khác
                                </div>
                            </div>
                        </div>
                        <div className={cx('country', 'mt-32')}>
                            <label>Quốc tịch</label>
                            <div className={cx('country-select')}>
                                <select>
                                    <option>Chọn quốc tịch</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx('btn-save', 'mt-32')}>
                            <label></label>
                            <div className={cx('btn')}>
                                <button>Lưu thay đổi</button>
                            </div>
                        </div>
                    </div>

                    {/* <div className={cx('col', 'l-1', 'separate-infor')}>
                        <div className={cx('separate')}></div>
                    </div> */}

                    <div className={cx('col', 'l-5', 'user-update')}>
                        <div className={cx('title')}>Số điện thoại và email</div>
                        <div className={cx('update-infor', 'mt-16')}>
                            <div className={cx('update-text')}>
                                <FontAwesomeIcon icon={faPhone} className={cx('icon-update')} />
                                <div>
                                    <p>Số điện thoại</p>
                                    <p>0582564360</p>
                                </div>
                            </div>
                            <button>Cập nhật</button>
                        </div>
                        <div className={cx('update-infor', 'mt-32')}>
                            <div className={cx('update-text')}>
                                <FontAwesomeIcon icon={faEnvelope} className={cx('icon-update')} />
                                <div>
                                    <p>Địa chỉ email</p>
                                    <p>Thêm địa chỉ email</p>
                                </div>
                            </div>
                            <button>Cập nhật</button>
                        </div>

                        <div className={cx('title', 'mt-32')}>Bảo mật</div>
                        <div className={cx('update-infor', 'mt-16')}>
                            <div className={cx('update-text', 'update-text-one')}>
                                <FontAwesomeIcon icon={faUnlockKeyhole} className={cx('icon-update', 'mr-8')} />
                                <p>Đổi mật khẩu</p>
                            </div>
                            <button>Cập nhật</button>
                        </div>

                        <div className={cx('title', 'mt-32')}>Liên kết mạng xã hội</div>
                        <div className={cx('update-infor', 'mt-16')}>
                            <div className={cx('update-text', 'update-text-one')}>
                                <FontAwesomeIcon icon={faFacebook} className={cx('mr-8', 'icon-facebook')} />
                                <p>Facebook</p>
                            </div>
                            <button>Liên kết</button>
                        </div>
                        <div className={cx('update-infor', 'mt-24')}>
                            <div className={cx('update-text')}>
                                <FontAwesomeIcon icon={faGoogle} className={cx('icon-update', 'mr-8')} />
                                <p>Google</p>
                            </div>
                            <button>Liên kết</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfor;
