import Cart from '../Partials/Cart';
import CategoryButton from '../Partials/CategoryButton';
import ProfileAccount from '../Partials/ProfileAccount';
import Logo from '../Partials/Logo';
import Promotion from '../Partials/Promotion';
import styles from './style.module.scss';
const NavigationBar = () => {
  return (
    <div className={styles.navigation__bar}>
      <div className="inner__bar">
        <CategoryButton />
        <Promotion />
        <Logo />
        <Cart />
        <ProfileAccount />
      </div>
    </div>
  );
};
export default NavigationBar;
