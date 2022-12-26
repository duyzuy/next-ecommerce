import Image from 'next/image';
import { Container, Input } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import styles from '../../styles/header.module.scss';
import HeaderBottom from '../HeaderBottom';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useSelector, useDispatch } from '../../providers/hooks';
import { useEffect } from 'react';
import { getCustomerByEmail } from '../../api/customer';
import { LOAD_USER_INFO } from '../../constants/actions';
import { client } from '../../api/client';
const Header = (props) => {
  const { data: session, status } = useSession();

  const bookingInfor = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const { categories } = props;
  console.log(session);
  useEffect(() => {
    if (session) {
      (async () => {
        const profile = await client.get('/user', {
          email: session.user.email
        });

        dispatch({ type: LOAD_USER_INFO, payload: profile });
      })();
    }
  }, []);
  return (
    <header id="ec__header" className={styles.ec_header}>
      <div id="ec_header_top" className={styles.ec_header_top}>
        <Container>
          <div className={styles.flex_row}>
            <div className={styles.ec_header_logo}>
              <Link href="/">
                <a>
                  <Image
                    src="/assets/images/logo-saigonhome-original.svg"
                    alt="logo"
                    width={340}
                    height={90}
                    placeholder="blur"
                    blurDataURL="/assets/images/logo-saigonhome-original.svg"
                  />
                </a>
              </Link>
            </div>
            <div className={styles.ec_header_category}>
              <span className="ec_icon">
                <Icon.Menu size={20} />
              </span>
              <span>Danh mục</span>
            </div>
            <div className={styles.ec_header_promo}>
              <Link href="/khuyen-mai">
                <a>Khuyến mại</a>
              </Link>
            </div>
            <div className={styles.ec_header_search}>
              <Input icon="search" placeholder="Nhập sản phẩm cần tìm..." />
            </div>
            <div className={styles.ec_header_actions}>
              <div className={styles.ec_header_cart}>
                <Link href="/cart">
                  <a className="item">
                    <Icon.ShoppingCart size={20} />
                    <span className="cart_count">
                      {bookingInfor.products.count}
                    </span>
                  </a>
                </Link>
              </div>
              <div className={styles.ec_header_ship}>
                <Link href="/">
                  <a className="item">
                    <Icon.Truck size={20} />
                  </a>
                </Link>
              </div>
              <div className={styles.ec_header_notify}>
                <Link href="/">
                  <a className="item">
                    <Icon.Bell size={20} />
                  </a>
                </Link>
              </div>
              <div className={styles.ec_header_acount}>
                <Link
                  href={`/user/${
                    (status === 'authenticated' && 'profile') || 'login'
                  }`}
                >
                  <a className="item">
                    <Icon.User size={20} />
                  </a>
                </Link>
                {(status === 'authenticated' && (
                  <div className="user--dropdown">
                    <ul>
                      <li>
                        <Link href="/user/profile">
                          <a className="item">
                            <Icon.User size={20} /> Tài khoản
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/user/profile">
                          <a className="item">
                            <Icon.Inbox size={20} /> Đơn hàng
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/user/profile">
                          <a className="item">
                            <Icon.Map size={20} /> Địa chỉ
                          </a>
                        </Link>
                      </li>
                      <li>
                        <button
                          className="item"
                          onClick={() => signOut('credentials')}
                        >
                          <Icon.LogOut size={20} /> Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                )) ||
                  null}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <HeaderBottom items={categories} />
    </header>
  );
};

export default Header;
