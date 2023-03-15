import Cart from '../Partials/Cart';
import CategoryButton from '../Partials/CategoryButton';
import ProfileAccount from '../Partials/ProfileAccount';
import Logo from '../Partials/Logo';
import Promotion from '../Partials/Promotion';
import styles from './navbar.module.scss';
import * as Icon from 'react-feather';
const NavigationBar = () => {
  return (
    <div className={styles.navigation__bar}>
      <div className="inner__bar">
        <div className="navigation-items">
          <CategoryButton
            className="navbar-item"
            label="Danh mục"
            icon={() => <Icon.Menu size={20} />}
          />
          <Promotion
            className="navbar-item"
            label="Khuyến mại"
            icon={() => <Icon.Zap size={20} />}
          />
          <Logo className="navbar-item main" asIcon label="Home" />
          <Cart
            className="navbar-item"
            label="Giỏ hàng"
            icon={() => <Icon.ShoppingCart size={20} />}
          />
          <ProfileAccount
            className="navbar-item"
            label="Tài khoản"
            icon={() => <Icon.User size={20} />}
          />
        </div>
      </div>
    </div>
  );
};
export default NavigationBar;
