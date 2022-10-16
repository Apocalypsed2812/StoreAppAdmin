import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);

    useEffect(() => {
        setSearchResult([
            {
                id: 1,
                nickname: 'pham thu',
                avatar: 'phamthu1235',
                full_name: 'Pham Anh Thu',
                tick: true,
            },

            {
                id: 2,
                nickname: 'pham thu',
                avatar: 'phamthu1235',
                full_name: 'Pham Anh Thu',
                tick: true,
            },
        ]);
    }, []);

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div className={cx('search')}>
            <div>
                <HeadlessTippy
                    interactive
                    // visible={showResult && searchResult.length > 0}
                    visible={false}
                    placement={'top-start'}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Kết quả tìm kiếm</h4>
                                {searchResult.map((result) => (
                                    <AccountItem key={result.id} data={result} />
                                ))}
                            </PopperWrapper>
                        </div>
                    )}
                    onClickOutside={handleHideResult}
                >
                    <div className={cx('with-search')}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn ..."
                            onFocus={() => {
                                setShowResult(true);
                            }}
                        />
                        <button>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon-search')} />
                            Tìm kiếm
                        </button>
                    </div>
                </HeadlessTippy>
            </div>
            <div className={cx('search-category')}>
                <span>Trái cây</span>
                <span>Trái cây</span>
                <span>Trái cây</span>
                <span>Trái cây</span>
                <span>Trái cây</span>
                <span>Trái cây</span>
                <span>Trái cây</span>
                <span>Trái cây</span>
                <span>Trái cây</span>
                <span>Trái cây</span>
            </div>
        </div>
    );
}

export default Search;
