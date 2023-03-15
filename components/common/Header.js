import { memo } from 'react';
import Image from 'next/image';
import { Container, Input } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import styles from '../../styles/header.module.scss';
import HeaderBottom from '../HeaderBottom';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useSelector, useDispatch } from '../../providers/hooks';

import SearchProduct from './Partials/SearchProduct';
import Logo from './Partials/Logo';
import Cart from './Partials/Cart';
import Notify from './Partials/Notify';
import Shipping from './Partials/Shipping';
import CategoryButton from './Partials/CategoryButton';
import ProfileAccount from './Partials/ProfileAccount';
import CategoryItemList from './Partials/CategoryItemList';
import Promotion from './Partials/Promotion';
const Header = (props) => {
  const { data: session, status } = useSession();

  const bookingInfor = useSelector((state) => state.booking);

  const { categories, device } = props;

  if (device.isDesktop) {
    return (
      <header id="ec__header" className={styles.ec_header}>
        <div id="ec_header_top" className={styles.ec_header_top}>
          <Container>
            <div className={styles.flex_row}>
              <Logo className={styles.ec_header_logo} />
              <CategoryButton className={styles.ec_header_category} />

              <Promotion className={styles.ec_header_promo} />
              <SearchProduct className={styles.ec_header_search} />
              <div className={styles.ec_header_actions}>
                <Cart
                  className={styles.ec_header_cart}
                  count={bookingInfor.products.count}
                />
                <Shipping className={styles.ec_header_ship} />
                <Notify className={styles.ec_header_notify} />
                <ProfileAccount
                  className={styles.ec_header_acount}
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
        <div id="ec_header_top" className={styles.ec_header_top}>
          <Container>
            <Logo className={styles.ec_header_logo} />
            <SearchProduct className={styles.ec_header_search} />
          </Container>
        </div>
      </header>
    );
  }
};

export default memo(Header);
