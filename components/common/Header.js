import { useState } from 'react';
import { Container, Menu, Input } from 'semantic-ui-react';
import styles from '../../styles/Header.module.css';
import * as Icon from 'react-feather';

import MenuItem from '../MenuItem';
import { MENUS } from '../../constants/menu';
import { useRouter } from 'next/router';
import { isActive } from '../../utils/acrtiveMenu';
const Header = () => {
  const [activeItem, setActiveItem] = useState('home');
  const router = useRouter();
  console.log(router);

  return (
    <header id="ec__header" className={styles.ec__header}>
      <Container>
        <Menu secondary>
          <ul className={styles.menu_items}>
            {MENUS &&
              MENUS.map((item) => {
                return (
                  <MenuItem
                    name={item.name}
                    path={item.path}
                    icon={item.icon}
                    active={console.log(isActive(item.path, 0))}
                  >
                    {item.hasChildren && (
                      <ul className={styles.menu_child}>
                        {item.childrens.map((childItem) => {
                          return (
                            <MenuItem
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

          <Menu.Menu position="center">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Icon.ShoppingCart color="red" size={24} />
      </Container>
    </header>
  );
};

export default Header;
