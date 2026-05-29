import React from 'react';
import cn from 'classnames';
import styles from './HamburgerButton.module.css';

type HamburgerButtonProps = {
  isNavOpen: boolean;
  toggle: () => void;
};

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isNavOpen,
  toggle,
}) => (
  <div
    className={cn(styles.mHeaderButton, { [styles.isNavOpen]: isNavOpen })}
    onClick={toggle}
  >
    <span />
  </div>
);

export default HamburgerButton;
