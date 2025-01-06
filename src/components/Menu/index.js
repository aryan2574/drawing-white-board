import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencil,
    faEraser,
    faRotateLeft,
    faRotateRight,
    faFileArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';
import { MENU_ITEMS } from '@/constants';

import { menuItemClick, actionItemClick } from '@/slice/menuSlice';

const Menu = () => {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

    const handleMenuClick = (itemName) => {
        dispatch(menuItemClick(itemName));
    }

    return (
        <div className={styles.menuContainer}>
            <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={faPencil} className={cx(styles.icon, { [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL })} onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)} />
                <FontAwesomeIcon icon={faEraser} className={cx(styles.icon, { [styles.active]: activeMenuItem === MENU_ITEMS.ERASER })} onClick={() => handleMenuClick(MENU_ITEMS.ERASER)} />
                <FontAwesomeIcon icon={faRotateLeft} className={cx(styles.icon, { [styles.active]: activeMenuItem === MENU_ITEMS.UNDO })} onClick={() => handleMenuClick(MENU_ITEMS.UNDO)} />
                <FontAwesomeIcon icon={faRotateRight} className={cx(styles.icon, { [styles.active]: activeMenuItem === MENU_ITEMS.REDO })} onClick={() => handleMenuClick(MENU_ITEMS.REDO)} />
                <FontAwesomeIcon icon={faFileArrowDown} className={cx(styles.icon, { [styles.active]: activeMenuItem === MENU_ITEMS.DOWNLOAD })} onClick={() => handleMenuClick(MENU_ITEMS.DOWNLOAD)} />
            </div>
        </div>
    );
};

export default Menu;
