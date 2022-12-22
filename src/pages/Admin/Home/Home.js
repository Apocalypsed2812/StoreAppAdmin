import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faBowlRice, faComment, faHome, faSearch, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef, useContext } from 'react';
import { getDatabase, ref, child, get, set, remove } from 'firebase/database';
import { list, getDownloadURL, listAll, ref as refStorage, uploadBytes } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { storage } from '~/firebase.js';
import styles from './Home.module.scss';
import app from '~/firebase.js';
import { getMethod } from '~/utils/fetchData';
import Map from '~/components/Map';
import { GlobalState } from '~/context/GlobalState';
// import UploadImage from '~/utils/uploadImage';

const cx = classNames.bind(styles);

function Home() {
    const state = useContext(GlobalState);
    const [isAdmin, setIsAdmin] = state.UserAPI.admin;

    console.log(isAdmin);

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
        }
    }, []);
    return (
        <>
            <div className={cx('dashboard')}>
                {/* <div className={cx('container')}>
                    <div className={cx('row', 'mt-5')}>
                        <div className={cx('col-lg-6')}>
                            <img
                                src="https://lelogama.go-jek.com/component/information/homeabout_KV_mobile_copy_6.jpg"
                                alt=""
                                className={cx('home-img')}
                            />
                        </div>
                        <div className={cx('col-lg-6')}>
                            <p className={cx('text-justify')}>
                                To improve people’s lives, we don’t think adding more stuff would do any good. Quite the
                                opposite. We believe it’s about removing obstacles that make us lose focus on the things
                                that matters. Getting rid of inefficiencies, stealing time from things we rather would be
                                doing. And eliminating hassles getting in the way of us spending time with our loved ones.
                                That would do good. No more hiccups testing our temper.
                            </p>
                            <p className={cx('text-justify')}>
                                No more bumps on the road draining our energy. No more friction getting to our heads.
                                Therefore we’ll always strive to make things run smoother, faster and easier. And it’s in
                                our DNA to think there’s a hack for every difficulty, a remedy for every headache and a
                                shortcut around.
                            </p>
                        </div>
                    </div>
    
                    <div className={cx('row', 'mt-5')}>
                        <div className={cx('col-lg-6')}>
                            <h1>Want on-demand services that won't break your bank?</h1>
                            <p>We're here to help – try Gojek and experience it yourself!</p>
                            <button className={cx('btn btn-outline-success')}>Download Now</button>
                        </div>
    
                        <div className={cx('col-lg-4')}>
                            <img
                                src="https://lelogama.go-jek.com/component/information/KV_Desktop_VN.jpg"
                                alt=""
                                className={cx('home-img')}
                            />
                        </div>
                    </div>
                </div> */}
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
