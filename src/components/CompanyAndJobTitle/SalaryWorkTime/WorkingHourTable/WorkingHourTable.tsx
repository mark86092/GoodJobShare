import React, { useCallback, useMemo, useState } from 'react';

import { SalaryWorkTime } from 'apis/salaryWorkTime';
import ReportBadgeImpl from 'common/button/ReportBadge';
import { InfoButton } from 'common/Modal';
import TableImpl from 'common/table/Table';
import ReportZone from 'components/ExperienceDetail/ReportZone';
import { REPORT_TYPE } from 'components/ExperienceDetail/ReportZone/ReportForm/constants';
import { PageType } from 'constants/companyJobTitle';
import { Gender, genderTranslation } from 'constants/gender';
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

// ReportBadge 與 Table 都還是 JS，TS 會把它們解構到的每個參數都當成必填。
// 比照 common/FormBuilder 的 OptionPill 用 cast 收斂成實際會用到的那幾個
const ReportBadge = (ReportBadgeImpl as unknown) as React.FC<{
  reportCount?: number;
}>;

type ColumnComponentProps = React.PropsWithChildren<{
  title?: string;
  className?: string;
  alignRight?: boolean;
}>;

type TableComponentProps = React.PropsWithChildren<{
  className?: string;
  // 每一列的形狀由 Column 的 dataField / dataFormatter 決定，Table 本身不看
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  primaryKey: string;
  postProcessRows?: (rows: TableRow[], data: Row[]) => TableRow[];
}>;

const Table = (TableImpl as unknown) as React.FC<TableComponentProps> & {
  Column: React.FC<ColumnComponentProps>;
};

// 每一列額外掛上 onCloseReport，供「回報」欄的 formatter 取用
type Row = SalaryWorkTime & { onCloseReport: () => void };

// Table 產出的 <tr>，injectHideContentBlock 會就地改寫它的 children
type TableRow = React.ReactElement<{
  children: React.ReactElement<{ className?: string }>[];
}>;

// 四個 modal 開關由 WorkingHourTable 持有，一律傳給每個欄位的 Children，
// 各自取自己要的那兩個
type HeaderProps = {
  isInfoSalaryModalOpen: boolean;
  toggleInfoSalaryModal: () => void;
  isInfoTimeModalOpen: boolean;
  toggleInfoTimeModal: () => void;
};

// SalaryWorkTime.gender 是任意字串，對不到翻譯就顯示 '-'
// （這裡不用 ?? 是因為專案的 prettier 版本在 .tsx 解析不了）
const formatGender = (gender: string | null): string => {
  if (gender === null) return '-';
  return genderTranslation[gender as Gender] || '-';
};

const SalaryHeader: React.FC<
  Pick<HeaderProps, 'isInfoSalaryModalOpen' | 'toggleInfoSalaryModal'>
> = ({ isInfoSalaryModalOpen, toggleInfoSalaryModal }) => (
  <React.Fragment>
    <InfoSalaryModal
      isOpen={isInfoSalaryModalOpen}
      close={toggleInfoSalaryModal}
    />
    <InfoButton onClick={toggleInfoSalaryModal}>估計時薪</InfoButton>
  </React.Fragment>
);

const TimeHeader: React.FC<
  Pick<HeaderProps, 'isInfoTimeModalOpen' | 'toggleInfoTimeModal'>
> = ({ isInfoTimeModalOpen, toggleInfoTimeModal }) => (
  <React.Fragment>
    <InfoTimeModal isOpen={isInfoTimeModalOpen} close={toggleInfoTimeModal} />
    <InfoButton onClick={toggleInfoTimeModal}>參考時間</InfoButton>
  </React.Fragment>
);

type ColumnProp = {
  className: string;
  title: string;
  // 字串代表取 row 的該欄位，函式代表直接由整列算出內容
  dataField: string | ((row: Row) => React.ReactNode);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataFormatter?: (value: any, row: Row) => React.ReactNode;
  alignRight?: boolean;
  Children: React.FC<HeaderProps> | (() => string);
  isEnabled?: (args: { pageType: PageType }) => boolean;
  permissionRequiredStart?: boolean;
  permissionRequiredEnd?: boolean;
};

const columnProps: ColumnProp[] = [
  {
    className: styles.colPosition,
    title: '職稱',
    dataField: 'job_title',
    dataFormatter: getNameAsJobTitle,
    Children: () => '職稱',
    isEnabled: ({ pageType }) => pageType === PageType.COMPANY,
  },
  {
    className: styles.colPosition,
    title: '公司名稱',
    dataField: 'company',
    dataFormatter: getNameAsCompanyName,
    Children: () => '公司名稱',
    isEnabled: ({ pageType }) => pageType === PageType.JOB_TITLE,
  },
  {
    className: styles.colType,
    title: '職務型態',
    dataField: 'employment_type',
    dataFormatter: getEmploymentType,
    Children: () => '職務型態',
  },
  {
    className: styles.colDayTime,
    title: '表訂 / 實際工時',
    dataField: 'day_promised_work_time',
    dataFormatter: getWorkingHour,
    Children: () => '表訂 / 實際工時',
  },
  {
    className: styles.colWeekTime,
    title: '一週總工時',
    dataField: getWeekWorkTime,
    Children: () => '一週總工時',
  },
  {
    className: styles.colFrequency,
    title: '加班頻率',
    dataField: getFrequency,
    Children: () => '加班頻率',
  },
  {
    className: styles.colExperience,
    title: '業界工作經歷',
    dataField: 'experience_in_year',
    dataFormatter: getYear,
    Children: () => '業界工作經歷',
  },
  {
    className: styles.colGender,
    title: '性別',
    dataField: 'gender',
    dataFormatter: formatGender,
    Children: () => '性別',
  },
  {
    className: styles.colSalary,
    title: '薪資',
    dataField: getSalary,
    alignRight: true,
    Children: () => '薪資',
    permissionRequiredStart: true,
  },
  {
    className: styles.colHourly,
    title: '估計時薪',
    dataField: (row: Row) => formatWage(row.estimated_hourly_wage),
    alignRight: true,
    Children: SalaryHeader,
    permissionRequiredEnd: true,
  },
  {
    className: styles.colDataTime,
    title: '參考時間',
    dataField: (row: Row) => formatDate(row.data_time),
    Children: TimeHeader,
  },
  {
    className: styles.colDataTime,
    title: '回報',
    dataField: ({ id, reportCount, reports, onCloseReport }: Row) => (
      <ReportZone
        reportType={REPORT_TYPE.SALARY}
        id={id}
        reports={reports}
        reportCount={reportCount}
        onCloseReport={onCloseReport}
      >
        <ReportBadge reportCount={reportCount} />
      </ReportZone>
    ),
    Children: () => '回報',
  },
];

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

  const filteredColumnProps = useMemo(
    () =>
      columnProps.filter(({ isEnabled }) =>
        isEnabled ? isEnabled({ pageType }) : true,
      ),
    [pageType],
  );

  const [fromCol, toCol] = useMemo(
    () => [
      filteredColumnProps.findIndex(c => c.permissionRequiredStart === true),
      filteredColumnProps.findIndex(c => c.permissionRequiredEnd === true),
    ],
    [filteredColumnProps],
  );

  const [, , canViewPublishId] = usePermission();

  const postProcessRows = useCallback(
    (rows: TableRow[], data: Row[]) => {
      injectHideContentBlock({
        rows,
        data,
        fromCol,
        toCol,
        canViewPublishId,
      });
      return rows;
    },
    [canViewPublishId, fromCol, toCol],
  );

  const memoizedData: Row[] = useMemo(
    () => data.map(row => ({ ...row, onCloseReport })),
    [data, onCloseReport],
  );

  return (
    <Table
      className={styles.companyTable}
      data={memoizedData}
      primaryKey="created_at"
      postProcessRows={postProcessRows}
    >
      {filteredColumnProps.map(({ Children, ...props }) => (
        // eslint-disable-next-line react/prop-types
        <Table.Column key={props.title} {...props}>
          <Children
            isInfoSalaryModalOpen={isInfoSalaryModalOpen}
            toggleInfoSalaryModal={toggleInfoSalaryModal}
            isInfoTimeModalOpen={isInfoTimeModalOpen}
            toggleInfoTimeModal={toggleInfoTimeModal}
          />
        </Table.Column>
      ))}
    </Table>
  );
};

export default WorkingHourTable;
