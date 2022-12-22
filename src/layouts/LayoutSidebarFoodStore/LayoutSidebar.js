import classNames from 'classnames/bind';

import styles from './LayoutSidebar.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarFoodStore from '../components/SidebarFoodStore';

const cx = classNames.bind(styles);

function LayoutSidebar({ children }) {
    return (
        <div>
            {/* <Header /> */}
            <SidebarFoodStore />
            <div className={cx('container')}>{children}</div>
            {/* <Footer /> */}
        </div>
    );
}

export default LayoutSidebar;
