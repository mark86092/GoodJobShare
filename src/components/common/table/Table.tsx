import cn from 'classnames';
import React from 'react';

import styles from './Table.module.css';

export type Column<T> = {
  title: string;
  className?: string;
  alignRight?: boolean;
  // 表頭要放互動元素（例如說明用的 InfoButton）時給它，否則顯示 title
  header?: React.ReactNode;
  render: (row: T, index: number) => React.ReactNode;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T, index: number) => React.Key;
  className?: string;
  // 需要改寫某一列的格子時給它（例如把數欄換成一個「已鎖定」的格子）。
  // 回傳的是 <tr> 的內容，<tr> 與它的 key 仍由 Table 負責
  renderCells?: (args: {
    row: T;
    index: number;
    cells: React.ReactNode[];
  }) => React.ReactNode;
};

function Table<T>({
  data,
  columns,
  rowKey,
  className,
  renderCells,
}: TableProps<T>): React.ReactElement {
  return (
    <table className={cn([styles.rwdTable, className])}>
      <thead>
        <tr>
          {columns.map(col => (
            <th
              key={col.title}
              className={cn(col.className, {
                [styles.alignRight]: col.alignRight,
              })}
            >
              {col.header || col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          const cells = columns.map(col => (
            <td
              key={col.title}
              data-th={col.title}
              className={cn({ [styles.alignRight]: col.alignRight })}
            >
              {col.render(row, index)}
            </td>
          ));

          return (
            <tr key={rowKey(row, index)}>
              {renderCells ? renderCells({ row, index, cells }) : cells}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
