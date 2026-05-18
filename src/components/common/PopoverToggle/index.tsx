import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import styles from './Popover.module.css';

type IsOpenState = { isOpen: boolean };

type PopoverProps = React.PropsWithChildren<{
  active?: boolean;
  className?: string;
}>;

const Popover: React.FC<PopoverProps> = ({ active, className, children }) => (
  <div
    className={cn(styles.popover, { [styles.active]: active }, className)}
    onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation();
    }}
  >
    {children}
  </div>
);

type PopoverToggleProps = React.PropsWithChildren<{
  className?: string;
  popoverClassName?: string;
  popoverContent?: React.ReactNode | ((state: IsOpenState) => React.ReactNode);
}>;

const PopoverToggle: React.FC<PopoverToggleProps> = ({
  className,
  popoverClassName,
  popoverContent,
  children,
}) => {
  const history = useHistory();
  const dropdown = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  const outsideHandler = useCallback(
    (e: MouseEvent) => {
      // dropdown.current is always set here (handler only runs post-mount via useEffect),
      // but TypeScript can't infer that from useRef(null)'s nullable type
      if (dropdown.current && !dropdown.current.contains(e.target as Node)) {
        if (isOpen) {
          close();
        }
      }
    },
    [close, isOpen],
  );
  useEffect(() => {
    document.addEventListener('click', outsideHandler);
    return (): void => {
      document.removeEventListener('click', outsideHandler);
    };
  }, [outsideHandler]);

  // close when routing change
  useEffect(() => {
    return history.listen(close);
  }, [close, history]);

  return (
    <div
      ref={dropdown}
      className={cn(className, styles.popoverToggle)}
      onClick={(): void => setIsOpen(isOpen => !isOpen)}
    >
      <Popover className={popoverClassName} active={isOpen}>
        {typeof popoverContent === 'function'
          ? popoverContent({ isOpen })
          : popoverContent}
      </Popover>
      {children}
    </div>
  );
};

export default PopoverToggle;
