import { useState } from 'react';
import Image from 'next/image';
import { Container, Menu, Input } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import MenuItem from '../MenuItem';
import { MENUS, MENUS_BOTTOM } from '../../constants/menu';
import { isActive } from '../../utils/acrtiveMenu';
import styles from '../../styles/header.module.scss';
import Link from 'next/link';
import Slider from '../Slider';
const Header = () => {
  return (
    <header id="ec__header" className={styles.ec_header}>
      <div id="ec_header_top" className={styles.ec_header_top}>
        <Container>
          <div className={styles.flex_row}>
            <div className={styles.ec_header_logo}>
              <Image
                src="/assets/images/logo-saigonhome-original.svg"
                alt="logo"
                width={340}
                height={90}
              />
            </div>
            <div className={styles.ec_header_category}>
              <span className="ec_icon">
                <Icon.Menu size={20} />
              </span>
              <span>Danh mục</span>
            </div>
            <div className={styles.ec_header_promo}>
              <Link href="/">
                <a>Khuyến mại</a>
              </Link>
            </div>
            <div className={styles.ec_header_search}>
              <Input icon="search" placeholder="Nhập sản phẩm cần tìm..." />
            </div>
            <div className={styles.ec_header_actions}>
              <div className={styles.ec_header_cart}>
                <Link href="/">
                  <a className="item">
                    <Icon.ShoppingCart size={20} />
                    <span className="cart_count">10</span>
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
                <Link href="/">
                  <a className="item">
                    <Icon.User size={20} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div id="ec_header_middle" style={{ display: 'none' }}>
        <Container>
          <Menu secondary>
            <ul className={styles.menu_items}>
              {MENUS &&
                MENUS.map((item) => {
                  return (
                    <MenuItem
                      key={item.path}
                      name={item.name}
                      path={item.path}
                      icon={item.icon}
                      active={isActive(item.path, 1)}
                    >
                      {item.hasChildren && (
                        <ul className={styles.menu_child}>
                          {item.childrens.map((childItem) => {
                            return (
                              <MenuItem
                                key={childItem.path}
                                name={childItem.name}
                                path={childItem.path}
                                icon={childItem.icon}
                              />
                            );
                          })}
                        </ul>
                      )}
                    </MenuItem>
                  );
                })}
            </ul>
          </Menu>
        </Container>
      </div>
      <div id="ec_header_bottom" className={styles.ec_header_bottom}>
        <Container>
          <Slider
            itemView={6}
            autoplay={true}
            mode="sub"
            itemSpacing={15}
            itemScroll={2}
          >
            {MENUS_BOTTOM.map((item, index) => (
              <Slider.Item
                key={index}
                name={item.name}
                path={item.path}
                thumbnail={item.thumbnail}
              />
            ))}
          </Slider>
        </Container>
      </div>
    </header>
  );
};

export default Header;
