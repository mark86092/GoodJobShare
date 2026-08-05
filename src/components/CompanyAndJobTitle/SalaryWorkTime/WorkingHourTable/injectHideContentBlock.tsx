import cn from 'classnames';
import React from 'react';

import { SalaryWorkTime } from 'apis/salaryWorkTime';
import { BasicPermissionSimpleBlock } from 'common/PermissionBlock';
import { TableRow } from 'common/table/Table';
import { useShareLink } from 'hooks/experiments';

import styles from './injectHideContentBlock.module.css';

type InjectHideContentBlockArgs = {
  rows: TableRow[];
  data: SalaryWorkTime[];
  fromCol: number;
  toCol: number;
  canViewPublishId: (id: string) => boolean;
};

// 注意：這支在 render 期間被 Table 的 postProcessRows 呼叫，內部又用了
// useShareLink()。名字不以 use 開頭，但實際上受 hook 規則約束
export default ({
  rows,
  data,
  fromCol,
  toCol,
  canViewPublishId,
}: InjectHideContentBlockArgs): void => {
  const nHides = toCol - fromCol + 1;
  const shareLink = useShareLink();

  // Replace original cells with locked cells
  // on small screens
  rows.forEach((row, i) => {
    const d = data[i];
    const isMyPublish = canViewPublishId(d.id);
    if (isMyPublish) return;

    row.props.children.splice(
      fromCol,
      nHides,
      ...row.props.children.slice(fromCol, fromCol + nHides).map(col => {
        return React.cloneElement(
          col,
          {
            className: cn(col.props.className, styles.cell, styles.mobile),
          },
          <BasicPermissionSimpleBlock
            to={shareLink}
            rootClassName={styles.hideContentBlock}
          />,
        );
      }),
    );
  });

  // Add locked cells on regular screens
  // that spans multiple columns
  if (rows.length > 0) {
    for (let i = 0; i < rows.length; i++) {
      const d = data[i];
      const isMyPublish = canViewPublishId(d.id);
      if (isMyPublish) continue;

      const row = rows[i];
      row.props.children.splice(
        fromCol,
        0,
        <td key="__hideContent" colSpan={nHides} className={styles.cell}>
          <BasicPermissionSimpleBlock
            to={shareLink}
            rootClassName={styles.hideContentBlock}
          />
        </td>,
      );
    }
  }
};
