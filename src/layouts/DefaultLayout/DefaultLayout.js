import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            {/* <Header /> */}
            <div className={cx('container')}>{children}</div>
            {/* <Footer /> */}
        </div>
    );
}

export default DefaultLayout;
