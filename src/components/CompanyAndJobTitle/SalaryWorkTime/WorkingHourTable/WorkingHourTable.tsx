import React, { useCallback, useMemo, useState } from 'react';

import { SalaryWorkTime } from 'apis/salaryWorkTime';
import ReportBadgeImpl from 'common/button/ReportBadge';
import { InfoButton } from 'common/Modal';
import Table, { Column } from 'common/table/Table';
import ReportZone from 'components/ExperienceDetail/ReportZone';
import { REPORT_TYPE } from 'components/ExperienceDetail/ReportZone/ReportForm/constants';
import { PageType } from 'constants/companyJobTitle';
import { Gender, genderTranslation } from 'constants/gender';
import { useShareLink } from 'hooks/experiments';
import usePermission from 'hooks/usePermission';

import {
  formatDate,
  formatWage,
  getEmploymentType,
  getFrequency,
  getNameAsCompanyName,
  getNameAsJobTitle,
  getSalary,
  getWeekWorkTime,
  getWorkingHour,
  getYear,
} from './formatter';
import { InfoSalaryModal, InfoTimeModal } from './InfoModal';
import injectHideContentBlock from './injectHideContentBlock';
import styles from './WorkingHourTable.module.css';

// ReportBadge 還是 JS，TS 會把它解構到的每個參數都當成必填，用 cast 收斂
const ReportBadge = (ReportBadgeImpl as unknown) as React.FC<{
  reportCount?: number;
}>;

// 「薪資」到「估計時薪」這幾欄需要權限才看得到，用兩個標記圈出範圍
type SalaryColumn = Column<SalaryWorkTime> & {
  permissionRequiredStart?: boolean;
  permissionRequiredEnd?: boolean;
};

// SalaryWorkTime.gender 是任意字串，對不到翻譯就顯示 '-'
// （這裡不用 ?? 是因為專案的 prettier 版本在 .tsx 解析不了）
const formatGender = (gender: string | null): string => {
  if (gender === null) return '-';
  return genderTranslation[gender as Gender] || '-';
};

type WorkingHourTableProps = {
  data: SalaryWorkTime[];
  pageType: PageType;
  onCloseReport: () => void;
};

const WorkingHourTable: React.FC<WorkingHourTableProps> = ({
  data,
  pageType,
  onCloseReport,
}) => {
  const [isInfoSalaryModalOpen, setInfoSalaryModalOpen] = useState(false);
  const [isInfoTimeModalOpen, setInfoTiimeModalOpen] = useState(false);

  const toggleInfoSalaryModal = useCallback(() => {
    setInfoSalaryModalOpen(!isInfoSalaryModalOpen);
  }, [isInfoSalaryModalOpen]);

  const toggleInfoTimeModal = useCallback(() => {
    setInfoTiimeModalOpen(!isInfoTimeModalOpen);
  }, [isInfoTimeModalOpen]);

  const columns = useMemo<SalaryColumn[]>(
    () => [
      ...(pageType === PageType.COMPANY
        ? [
            {
              className: styles.colPosition,
              title: '職稱',
              render: (row: SalaryWorkTime): React.ReactNode =>
                getNameAsJobTitle(row.job_title, row),
            },
          ]
        : []),
      ...(pageType === PageType.JOB_TITLE
        ? [
            {
              className: styles.colPosition,
              title: '公司名稱',
              render: (row: SalaryWorkTime): React.ReactNode =>
                getNameAsCompanyName(row.company, row),
            },
          ]
        : []),
      {
        className: styles.colType,
        title: '職務型態',
        render: row => getEmploymentType(row.employment_type),
      },
      {
        className: styles.colDayTime,
        title: '表訂 / 實際工時',
        render: row => getWorkingHour(row.day_promised_work_time, row),
      },
      {
        className: styles.colWeekTime,
        title: '一週總工時',
        render: getWeekWorkTime,
      },
      {
        className: styles.colFrequency,
        title: '加班頻率',
        render: getFrequency,
      },
      {
        className: styles.colExperience,
        title: '業界工作經歷',
        render: row => getYear(row.experience_in_year),
      },
      {
        className: styles.colGender,
        title: '性別',
        render: row => formatGender(row.gender),
      },
      {
        className: styles.colSalary,
        title: '薪資',
        alignRight: true,
        render: getSalary,
        permissionRequiredStart: true,
      },
      {
        className: styles.colHourly,
        title: '估計時薪',
        alignRight: true,
        header: (
          <>
            <InfoSalaryModal
              isOpen={isInfoSalaryModalOpen}
              close={toggleInfoSalaryModal}
            />
            <InfoButton onClick={toggleInfoSalaryModal}>估計時薪</InfoButton>
          </>
        ),
        render: row => formatWage(row.estimated_hourly_wage),
        permissionRequiredEnd: true,
      },
      {
        className: styles.colDataTime,
        title: '參考時間',
        header: (
          <>
            <InfoTimeModal
              isOpen={isInfoTimeModalOpen}
              close={toggleInfoTimeModal}
            />
            <InfoButton onClick={toggleInfoTimeModal}>參考時間</InfoButton>
          </>
        ),
        render: row => formatDate(row.data_time),
      },
      {
        className: styles.colDataTime,
        title: '回報',
        render: row => (
          <ReportZone
            reportType={REPORT_TYPE.SALARY}
            id={row.id}
            reports={row.reports}
            reportCount={row.reportCount}
            onCloseReport={onCloseReport}
          >
            <ReportBadge reportCount={row.reportCount} />
          </ReportZone>
        ),
      },
    ],
    [
      pageType,
      onCloseReport,
      isInfoSalaryModalOpen,
      toggleInfoSalaryModal,
      isInfoTimeModalOpen,
      toggleInfoTimeModal,
    ],
  );

  const [fromCol, toCol] = useMemo(
    () => [
      columns.findIndex(c => c.permissionRequiredStart === true),
      columns.findIndex(c => c.permissionRequiredEnd === true),
    ],
    [columns],
  );

  const [, , canViewPublishId] = usePermission();
  const shareLink = useShareLink();

  const renderCells = useCallback(
    ({
      row,
      cells,
    }: {
      row: SalaryWorkTime;
      cells: React.ReactNode[];
    }): React.ReactNode => {
      if (canViewPublishId(row.id)) return cells;
      return injectHideContentBlock({ cells, fromCol, toCol, shareLink });
    },
    [canViewPublishId, fromCol, toCol, shareLink],
  );

  return (
    <Table
      className={styles.companyTable}
      data={data}
      columns={columns}
      rowKey={(row): string => row.id}
      renderCells={renderCells}
    />
  );
};

export default WorkingHourTable;
