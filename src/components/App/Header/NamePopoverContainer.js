import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import PopoverToggle from 'common/PopoverToggle';
import { useAuthUser } from 'hooks/auth';
import { useLogout } from 'hooks/login';
import styles from './Header.module.css';

const NamePopoverContainer = () => {
  const user = useAuthUser();
  const logout = useLogout();

  return (
    <PopoverToggle
      popoverClassName={cn(styles.popover, styles.nameContainer)}
      popoverContent={
        <ul className={styles.popoverItems}>
          <li>
            <Link className={styles.popoverItem} to="/me/subscriptions/current">
              我的方案
            </Link>
          </li>
          <li>
            <Link className={styles.popoverItem} to="/me">
              管理我的資料
            </Link>
          </li>
          <li>
            <button className={styles.popoverItem} onClick={logout}>
              登出
            </button>
          </li>
        </ul>
      }
    >
      <div className={styles.userNameBtn}>{user && user.name}</div>
    </PopoverToggle>
  );
};

export default NamePopoverContainer;
