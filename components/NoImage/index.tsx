import * as Icon from 'react-feather';
import styles from './noimage.module.scss';
const NoImage = () => {
  return (
    <div className={styles.no_image}>
      <div className="image-inner">
        <Icon.Image size={32} color="#f1f1f1" />
        <p>No image</p>
      </div>
    </div>
  );
};
export default NoImage;
