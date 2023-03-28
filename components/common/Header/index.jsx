import { memo } from 'react';
import { Container } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useSelector, useDispatch } from '../../../providers/hooks';

import SearchProduct from '../Partials/SearchProduct';
import Logo from '../Partials/Logo';
import Cart from '../Partials/Cart';
import Notify from '../Partials/Notify';
import Shipping from '../Partials/Shipping';
import CategoryButton from '../Partials/CategoryButton';
import ProfileAccount from '../Partials/ProfileAccount';
import CategoryItemList from '../Partials/CategoryItemList';
import Promotion from '../Partials/Promotion';
import styles from '../../../styles/header.module.scss';
const Header = (props) => {
  const { data: session, status } = useSession();

  const bookingInfor = useSelector((state) => state.booking);

  const { categories, device } = props;

  if (device.isDesktop) {
    return (
      <header id="ec__header" className={styles.ec_header}>
        <div id="ec_header_top" className="header-top">
          <Container>
            <div className="header-row">
              <Logo className="header-logo" />
              <CategoryButton
                label="Danh mục"
                icon={() => <Icon.Menu size={20} />}
                className="header-category"
              />
              <Promotion className="header-promo" label="Khuyến mại" />
              <SearchProduct className="header-search" />
              <div className={styles.ec_header_actions}>
                <Cart
                  className="header-cart"
                  count={bookingInfor.products.count}
                  icon={() => <Icon.ShoppingCart size={20} />}
                  showCount={true}
                />
                <Shipping className="header-shipping" />
                <Notify
                  className="header-notify"
                  icon={() => <Icon.Bell size={20} />}
                />
                <ProfileAccount
                  icon={() => <Icon.User size={20} />}
                  className="header-account"
                  isAuthenticated={status === 'authenticated'}
                />
              </div>
            </div>
          </Container>
        </div>
        <div id="ec_header_bottom" className={styles.ec_header_bottom}>
          <Container>
            <CategoryItemList items={categories} type="slider" />
          </Container>
        </div>
      </header>
    );
  } else {
    return (
      <header id="ec__header" className={styles.ec_header}>
        <div id="ec_header_top" className="header-top">
          <Container>
            <Logo className="header-logo" />
            <SearchProduct className="header-search" />
          </Container>
        </div>
      </header>
    );
  }
};

export default memo(Header);
