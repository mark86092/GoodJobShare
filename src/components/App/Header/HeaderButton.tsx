import React from 'react';
import cn from 'classnames';
import styles from './Header.module.css';

type HeaderButtonProps = {
  isNavOpen: boolean;
  toggle: () => void;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({ isNavOpen, toggle }) => (
  <div
    className={cn(styles.mHeaderButton, { [styles.isNavOpen]: isNavOpen })}
    onClick={toggle}
  >
    <span />
  </div>
);

export default HeaderButton;
