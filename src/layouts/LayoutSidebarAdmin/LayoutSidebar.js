import classNames from 'classnames/bind';

import styles from './LayoutSidebar.module.scss';
import Sidebar from '../components/SidebarAdmin';

const cx = classNames.bind(styles);

function LayoutSidebar({ children }) {
    return (
        <div>
            <Sidebar />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default LayoutSidebar;
