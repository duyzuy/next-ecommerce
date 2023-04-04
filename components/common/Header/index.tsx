import { memo, useState, useMemo, useRef } from 'react';
import { Container } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import { useSession } from 'next-auth/react';
import { useSelector } from '../../../providers/hooks';

import SearchProduct from '../Partials/SearchProduct';
import Logo from '../Partials/Logo';
import Cart from '../Partials/Cart';
import Notify from '../Partials/Notify';
import Shipping from '../Partials/Shipping';
import CategoryButton from '../Partials/CategoryButton';
import ProfileAccount from '../Partials/ProfileAccount';
import CategoryItemList from '../Partials/CategoryItemList';
import Promotion from '../Partials/Promotion';
import styles from './header.module.scss';
import { CategoryItemType, DeviceType, MenuItemType } from '../../../model';
import { BookingDataType } from '../../../reducer/booking';
import Image from 'next/image';
import { useWindowScroll } from '../../../hooks/useWindowScroll';
import Link from 'next/link';
const Header: React.FC = () => {
  const { data: session, status } = useSession();

  const bookingInfor = useSelector<BookingDataType>((state) => state.booking);
  const device = useSelector<DeviceType>((state) => state.device);
  const categories = useSelector<CategoryItemType[]>(
    (state) => state.menu.categories
  );
  const menuItems = useSelector((state) => state.menu.menuItems);
  const [isShowNavigation, setShowNavigation] = useState(false);
  const [subMenu, setSubMenu] = useState({
    index: 0,
    subitems: {}
  });
  const headerRef = useRef<HTMLDivElement>(null);
  console.log(subMenu);
  const subMenuList = useMemo(() => {
    let subItem: Partial<MenuItemType> = {};

    if (menuItems) {
      subItem = menuItems[subMenu.index];
    }
    return subItem;
  }, [menuItems, subMenu]);
  const elementScroll = useWindowScroll(headerRef);

  const isSticky = useMemo(() => {
    let isStick = false;
    if (elementScroll.windowOffsetY > elementScroll.elementOffsetTop) {
      isStick = true;
    }
    return isStick;
  }, [elementScroll]);
  if (device.isDesktop) {
    return (
      <>
        <header
          id="ec__header"
          className={`${styles.ec_header} ${
            (isSticky && 'sticky main-header') || 'main-header'
          }`}
          style={
            (isSticky && {
              position: isSticky ? 'sticky' : 'initial',
              top: -elementScroll.elementOffsetTop
            }) ||
            {}
          }
        >
          <div id="ec_header_top" className="header-top">
            <Container>
              <div className="header-row">
                <Logo className="header-logo" />
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
          <div
            id="ec_header_bottom"
            className={styles.ec_header_bottom}
            ref={headerRef}
          >
            <Container>
              <div className="row-navigation">
                <CategoryButton
                  label="Danh mục"
                  icon={() =>
                    (isShowNavigation && <Icon.X size={20} />) || (
                      <Icon.Menu size={20} />
                    )
                  }
                  className={
                    (isShowNavigation && 'header-category active') ||
                    'header-category'
                  }
                  onClick={() => setShowNavigation((prev) => !prev)}
                />

                <CategoryItemList items={categories} type="slider" />
              </div>
            </Container>
          </div>
        </header>
        {(isShowNavigation && (
          <div
            className={styles.navigation}
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              zIndex: 98,
              top: isSticky
                ? elementScroll.elementHeight
                : elementScroll.elementHeight +
                  elementScroll.elementOffsetTop -
                  elementScroll.windowOffsetY,
              height: isSticky
                ? `calc(100vh - ${elementScroll.elementHeight}px)`
                : `calc(100vh - ${
                    elementScroll.elementHeight +
                    elementScroll.elementOffsetTop -
                    elementScroll.windowOffsetY
                  }px)`
            }}
          >
            <div className="navigation-wrapper">
              <Container>
                <div className="navigation-items">
                  <div className="menu-col-left">
                    {menuItems?.map((item, itemIndx) => (
                      <div
                        className={
                          subMenu.index === itemIndx
                            ? 'menu-item active'
                            : 'menu-item'
                        }
                        key={item.ID}
                        onClick={() =>
                          setSubMenu((prev) => ({
                            index: itemIndx,
                            subitems: item
                          }))
                        }
                      >
                        <div className="menu-thumb">
                          <Image
                            src={
                              (item.menu_thumbnail && item.menu_thumbnail) ||
                              `/assets/images/image.svg`
                            }
                            width={100}
                            height={100}
                            alt={item.title}
                          />
                        </div>
                        <p className="menu-name">{item.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="menu-col-right">
                    <div className="menu-col-header">
                      <h3>{subMenuList.title}</h3>
                      <Link href={subMenuList.url} className="nav-link">
                        <a>
                          <span className="menu-btn-view">
                            Xem tất cả{' '}
                            <Icon.ArrowRight
                              size={10}
                              style={{ marginLeft: 5 }}
                            />
                          </span>
                        </a>
                      </Link>
                    </div>
                    <div className="menu-col-body">
                      <div className="menu-sub-list">
                        {subMenuList.child_items?.map((item) => (
                          <div className="sub-menu-item">
                            <div className="inner-sub-item">
                              <Link href={item.url} className="nav-link">
                                <a>
                                  <p className="menu-name" key={item.ID}>
                                    {item.title}
                                  </p>
                                  <span className="menu-btn-view">
                                    Xem{' '}
                                    <Icon.ArrowRight
                                      size={10}
                                      style={{ marginLeft: 5 }}
                                    />
                                  </span>
                                </a>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        )) || <></>}
      </>
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
