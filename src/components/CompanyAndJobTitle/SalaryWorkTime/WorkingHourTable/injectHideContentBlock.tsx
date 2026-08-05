import cn from 'classnames';
import React from 'react';

import { BasicPermissionSimpleBlock } from 'common/PermissionBlock';

import styles from './injectHideContentBlock.module.css';

type InjectHideContentBlockArgs = {
  cells: React.ReactNode[];
  fromCol: number;
  toCol: number;
  shareLink: string;
};

// 把 [fromCol, toCol] 這段欄位遮起來。手機與桌機的做法不同，兩者同時輸出、
// 由 CSS 決定顯示哪一種：手機把原本的格子逐一換成鎖住的格子，桌機另外插入
// 一個橫跨這幾欄的格子
export default ({
  cells,
  fromCol,
  toCol,
  shareLink,
}: InjectHideContentBlockArgs): React.ReactNode[] => {
  const nHides = toCol - fromCol + 1;

  const masked = cells.map((cell, i) => {
    if (i < fromCol || i > toCol) return cell;
    const col = cell as React.ReactElement<{ className?: string }>;
    return React.cloneElement(
      col,
      { className: cn(col.props.className, styles.cell, styles.mobile) },
      <BasicPermissionSimpleBlock
        to={shareLink}
        rootClassName={styles.hideContentBlock}
      />,
    );
  });

  return [
    ...masked.slice(0, fromCol),
    <td key="__hideContent" colSpan={nHides} className={styles.cell}>
      <BasicPermissionSimpleBlock
        to={shareLink}
        rootClassName={styles.hideContentBlock}
      />
    </td>,
    ...masked.slice(fromCol),
  ];
};
