import React from 'react';
import cn from 'classnames';
import styles from './Loader.module.css';

type Size = 's' | 'l';

type LoaderProps = {
  size?: Size;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l' }) => (
  <div className={cn(styles.wrapper, styles[size])}>
    <div className={styles.loader} />
  </div>
);

export default Loader;
