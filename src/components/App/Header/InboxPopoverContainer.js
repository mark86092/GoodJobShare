import React from 'react';
import { useSelector } from 'react-redux';

import PopoverToggle from 'common/PopoverToggle';
import { messagesSelector } from 'selectors/inbox';
import popoverStyles from './Header.module.css';
import styles from './InboxIcon.module.css';
import InboxContent from './InboxContent';
import InboxIcon from './InboxIcon';

const InboxPopoverContainer = () => {
  const messages = useSelector(messagesSelector);

  return (
    <PopoverToggle
      className={styles.inboxIconContainer}
      popoverClassName={popoverStyles.popover}
      popoverContent={({ isOpen }) => (
        <InboxContent
          className={styles.InboxContent}
          messages={messages}
          isOpen={isOpen}
        />
      )}
    >
      <InboxIcon className={styles.topNavIcon} />
    </PopoverToggle>
  );
};

export default InboxPopoverContainer;
