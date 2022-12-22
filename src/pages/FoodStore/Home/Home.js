import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { faComment, faHome, faSearch, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Home.module.scss';
import { GlobalState } from '~/context/GlobalState';
// import UploadImage from '~/utils/uploadImage';

const cx = classNames.bind(styles);

function Home() {
    const state = useContext(GlobalState);
    const [isLogin, setIsLogin] = state.UserAPI.login;
    const user = state.UserAPI.user[0];

    console.log("username foodstore", user)

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate('/login');
        }
    }, []);
    
    return (
        <>
            <div className={cx('dashboard')}>
                <div className={cx('top')}>
                    <div>
                        <FontAwesomeIcon icon={faHome} className={cx('icon', 'mr-8')} />
                        <span>Home</span>
                    </div>
                    <div className={cx('dashboard-search-box')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('icon')} />
                        <input type="text" placeholder="Search here..." />
                    </div>
                    <img src="" alt="" />
                </div>
                <div className={cx('dash-content')}>
                    <div className={cx('overview')}>
                        <div className={cx('boxes')}>
                            <div className={cx('box', 'box1')}>
                                <FontAwesomeIcon icon={faThumbsUp} className={cx('icon')} />
                                <span className={cx('text')}>Total Likes</span>
                                <span className={cx('number')}>50,120</span>
                            </div>
                            <div className={cx('box', 'box1')}>
                                <FontAwesomeIcon icon={faComment} className={cx('icon')} />
                                <span className={cx('text')}>Comment</span>
                                <span className={cx('number')}>50,120</span>
                            </div>
                            <div className={cx('box', 'box1')}>
                                <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                                <span className={cx('text')}>Total Share</span>
                                <span className={cx('number')}>50,120</span>
                            </div>
                        </div>
                    </div>

                    {/* <Map /> */}
                </div>
            </div>
        </>
    );
}

export default Home;
