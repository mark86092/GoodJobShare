import cn from 'classnames';
import React from 'react';

import { SalaryWorkTime } from 'apis/salaryWorkTime';
import { PageType } from 'constants/companyJobTitle';

import styles from './WorkingHourBlock.module.css';
import WorkingHourTable from './WorkingHourTable';

type WorkingHourBlockProps = {
  data: SalaryWorkTime[];
  pageType: PageType;
  onCloseReport: () => void;
};

const WorkingHourBlock: React.FC<WorkingHourBlockProps> = ({
  data,
  pageType,
  onCloseReport,
}) => {
  return (
    <section className={styles.container}>
      <div className={cn(styles.content, styles.expanded)}>
        <WorkingHourTable
          data={data}
          pageType={pageType}
          onCloseReport={onCloseReport}
        />
      </div>
    </section>
  );
};

export default WorkingHourBlock;
