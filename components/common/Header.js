import { useState } from 'react';
import { Container, Menu, Input } from 'semantic-ui-react';
import styles from '../../styles/Header.module.css';
import * as Icon from 'react-feather';

import MenuItem from '../MenuItem';
import { MENUS } from '../../constants/menu';
import { isActive } from '../../utils/acrtiveMenu';
import Image from 'next/image';

const Header = () => {
  return (
    <header id="ec__header" className={styles.ec_header}>
      <div id="ec_header_top" className={styles.ec_header_top}>
        <Container>
          <div className={styles.flex_row}>
            <Image
              src="/assets/images/logo-sgsv.png"
              alt="SGSV logo"
              width={340}
              height={90}
            />
            <Input loading icon="user" placeholder="Search..." />
          </div>
        </Container>
      </div>
      <div id="ec_header_middle">
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
            <Menu.Menu position="right">
              <Menu.Item>
                <Input icon="search" placeholder="Search..." />
              </Menu.Item>
              <Icon.ShoppingCart color="red" size={24} />
            </Menu.Menu>
          </Menu>
        </Container>
      </div>
    </header>
  );
};

export default Header;
