import { useState } from 'react';
import Image from 'next/image';
import { Container, Menu, Input } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import MenuItem from '../MenuItem';
import { MENUS, MENUS_BOTTOM } from '../../constants/menu';
import { isActive } from '../../utils/acrtiveMenu';
import styles from '../../styles/header.module.scss';
import Link from 'next/link';
import Item from '../Item';
const Header = () => {
  return (
    <header id="ec__header" className={styles.ec_header}>
      <div id="ec_header_top" className={styles.ec_header_top}>
        <Container>
          <div className={styles.flex_row}>
            <div className={styles.ec_header_logo}>
              <Image
                src="/assets/images/logo-sgsv.png"
                alt="logo"
                width={340}
                height={90}
              />
            </div>
            <div className={styles.ec_header_category}>
              <Icon.Menu color="red" size={24} />
              <span>Danh mục</span>
            </div>
            <div className={styles.ec_header_promo}>
              <Link href="/">
                <a>Khuyến mại</a>
              </Link>
            </div>
            <div className={styles.ec_header_search}>
              <Input loading icon="user" placeholder="Search..." />
            </div>
            <div className={styles.ec_header_cart}>
              <Icon.ShoppingCart color="red" size={24} />
              <span className={styles.cart_count}>10</span>
            </div>
            <div className={styles.ec_header_ship}>
              <Icon.Truck color="red" size={24} />
              <span className={styles.cart_count}>10</span>
            </div>
            <div className={styles.ec_header_notify}>
              <Icon.Bell color="red" size={24} />
              <span className={styles.cart_count}>10</span>
            </div>
            <div className={styles.ec_header_acount}>
              <Icon.User color="red" size={24} />
              <span className={styles.cart_count}>10</span>
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
          <div className="ec__slide">
            <ul className="ec__slide--list">
              {MENUS_BOTTOM.map((item) => {
                return (
                  <Item
                    name={item.name}
                    path={item.path}
                    thumbnail={item.thumbnail}
                  />
                );
              })}
            </ul>
            <div className="ec__slide--nav">
              <span className="ec__slide--prev" onClick={handlePrev}>
                <Icon.ArrowLeft width={16} />
              </span>
              <span className="ec__slide--next" onClick={handleNext}>
                <Icon.ArrowRight width={16} />
              </span>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
