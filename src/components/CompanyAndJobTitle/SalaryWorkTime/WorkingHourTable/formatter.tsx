import React from 'react';
import { Link } from 'react-router-dom';

import { SalaryWorkTime } from 'apis/salaryWorkTime';
import { formatSalaryAmount, formatSalaryType } from 'common/formatter';
import { generatePageURL, PageType } from 'constants/companyJobTitle';
import {
  EmploymentType,
  employmentTypeTranslation,
} from 'constants/employmentType';

import styles from './formatter.module.css';

export const getNameAsCompanyName = (
  o: SalaryWorkTime['company'],
  row: SalaryWorkTime,
): React.ReactElement => (
  <Link
    to={generatePageURL({
      pageType: PageType.COMPANY,
      pageName: o.name,
    })}
  >
    {row.originalCompanyName}{' '}
    <span className={`pM ${styles.sector}`}>{row.sector}</span>
  </Link>
);

export const getNameAsJobTitle = (
  o: SalaryWorkTime['job_title'],
  row: SalaryWorkTime,
): React.ReactElement => (
  <Link
    to={generatePageURL({
      pageType: PageType.JOB_TITLE,
      pageName: o.name,
    })}
  >
    {o.name} <span className={`pM ${styles.sector}`}>{row.sector}</span>
  </Link>
);

export const getEmploymentType = (type: EmploymentType | null): string =>
  type ? employmentTypeTranslation[type] : '';

export const getWorkingHour = (
  val: number | null,
  row: SalaryWorkTime,
): React.ReactElement => (
  <div>{`${val === undefined || val === null ? '-' : val} / ${
    row.day_real_work_time === undefined || row.day_real_work_time === null
      ? '-'
      : row.day_real_work_time
  }`}</div>
);

export const getYear = (val: number | null): string => {
  if (typeof val === 'number') {
    if (!val) return '-';
    return `${Math.round(val)} 年`;
  }
  return '-';
};

const getFrequencyText = (item: SalaryWorkTime): string => {
  switch (item.overtime_frequency) {
    case 0:
      return '幾乎不';
    case 1:
      return '偶爾';
    case 2:
      return '經常';
    case 3:
      return '幾乎每天';
    default:
      return '幾乎不';
  }
};

const getFrequencyStyle = (item: SalaryWorkTime): string => {
  switch (item.overtime_frequency) {
    case 0:
      return styles.hardly;
    case 1:
      return styles.sometimes;
    case 2:
      return styles.usually;
    case 3:
      return styles.always;
    default:
      return styles.hardly;
  }
};

export const getFrequency = (item: SalaryWorkTime): React.ReactElement => {
  const style = getFrequencyStyle(item);
  const text = getFrequencyText(item);
  return (
    <div>
      <div className={`${styles.dot} ${style}`} />
      {text}
    </div>
  );
};

export const getWeekWorkTime = (item: SalaryWorkTime): React.ReactNode =>
  item.week_work_time ? (
    <div
      className={styles.bar}
      style={{
        width: `${item.week_work_time >= 100 ? 100 : item.week_work_time}%`,
      }}
    >
      {item.week_work_time}
    </div>
  ) : (
    '-'
  );

export const getSalary = (item: SalaryWorkTime): string => {
  if (!item.salary) {
    return '-';
  }

  const { amount, type } = item.salary;

  return `${formatSalaryAmount(amount)} / ${formatSalaryType(type)}`;
};

export const formatWage = (wage: number | null): string => {
  if (typeof wage === 'number') {
    if (!wage) return '-';
    return `${Math.round(wage)} 元`;
  }
  return '';
};

export const formatDate = ({
  year,
  month,
}: SalaryWorkTime['data_time']): string =>
  `${year}.${month >= 10 ? '' : 0}${month}`;
