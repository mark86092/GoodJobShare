import React, { useEffect } from 'react';

import { SalaryWorkTime } from 'apis/salaryWorkTime';
import { Section } from 'common/base';
import Pagination from 'common/Pagination';
import NotFoundStatus from 'common/routing/NotFound';
import { PageType, TabType } from 'constants/companyJobTitle';
import usePermission from 'hooks/usePermission';

import EmptyView from '../EmptyView';
import ViewLog from './ViewLog';
import WorkingHourBlock from './WorkingHourBlock';

type SalaryWorkTimeSectionProps = {
  salaryWorkTimes: SalaryWorkTime[];
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  page: number;
  pageSize: number;
  totalCount: number;
  onCloseReport: () => void;
  // 轉手給 Pagination，回傳值是 react-router 的 location descriptor
  createPageLinkTo: (p: number) => object;
};

const SalaryWorkTimeSection: React.FC<SalaryWorkTimeSectionProps> = ({
  salaryWorkTimes,
  pageType,
  pageName,
  tabType,
  page,
  pageSize,
  totalCount,
  onCloseReport,
  createPageLinkTo,
}) => {
  const [, fetchPermission] = usePermission();
  useEffect(() => {
    fetchPermission();
  }, [fetchPermission]);

  return (
    <Section Tag="main" paddingBottom>
      {salaryWorkTimes.length > 0 ? (
        <React.Fragment>
          <WorkingHourBlock
            data={salaryWorkTimes}
            pageType={pageType}
            onCloseReport={onCloseReport}
          />
          <Pagination
            totalCount={totalCount}
            unit={pageSize}
            currentPage={page}
            createPageLinkTo={createPageLinkTo}
          />
        </React.Fragment>
      ) : (
        <NotFoundStatus>
          <EmptyView pageName={pageName} tabType={tabType} />
        </NotFoundStatus>
      )}
      <ViewLog
        pageName={pageName}
        page={page}
        contentIds={salaryWorkTimes.map(i => i.id)}
      />
    </Section>
  );
};

export default SalaryWorkTimeSection;
