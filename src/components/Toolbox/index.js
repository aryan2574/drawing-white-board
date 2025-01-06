import { useSelector } from 'react-redux';
import styles from './index.module.css';
import { COLORS, MENU_ITEMS } from '@/constants';

const Toolbox = () => {

    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER;

    const updateBrushSize = (e) => {
        // Update the brush size logic
    }

    return (
        <div className={styles.toolboxContainer}>
            {
                showStrokeToolOption &&
                <div className={styles.toolItem}>
                    <h4 className={styles.toolText}>Stroke Color</h4>
                    <div className={styles.itemContainer}>
                        <div className={styles.colorBox} style={{ backgroundColor: COLORS.BLACK }}></div>
                        <div className={styles.colorBox} style={{ backgroundColor: COLORS.RED }}></div>
                        <div className={styles.colorBox} style={{ backgroundColor: COLORS.GREEN }}></div>
                        <div className={styles.colorBox} style={{ backgroundColor: COLORS.BLUE }}></div>
                        <div className={styles.colorBox} style={{ backgroundColor: COLORS.ORANGE }}></div>
                        <div className={styles.colorBox} style={{ backgroundColor: COLORS.YELLOW }}></div>
                    </div>
                </div>
            }

            {
                showBrushToolOption &&
                <div className={styles.toolItem}>
                    <h4 className={styles.toolText}>Brush Size {activeMenuItem}</h4>
                    <div className={styles.itemContainer}>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            step={1}
                            onChange={updateBrushSize}
                            className={styles.brushSlider}
                        />
                    </div>
                </div>
            }

        </div>
    );
}

export default Toolbox;
