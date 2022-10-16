import classNames from 'classnames/bind';

import styles from './LayoutSidebar.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const cx = classNames.bind(styles);

function LayoutSidebar({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('container')}>
                <div className={cx('grid', 'wide')}>
                    <div className={cx('row', 'pt-32')}>
                        <div className={cx('col', 'l-3')}>
                            <Sidebar />
                        </div>
                        <div className={cx('col', 'l-9')}> {children}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LayoutSidebar;
