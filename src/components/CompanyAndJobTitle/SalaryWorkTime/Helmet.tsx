import React from 'react';
import ReactHelmet from 'react-helmet';

import {
  generateTabURL,
  PageType,
  TabType,
  tabTypeDetailTranslation as TAB_TYPE_DETAIL_TRANSLATION,
} from 'constants/companyJobTitle';
import { SITE_NAME } from 'constants/helmetData';
import SalaryWorkTimeOgImage from 'images/og/salary-work-time.jpg';
import { formatCanonicalPath, formatTitle } from 'utils/helmetHelper';

const formatKeyword = (name: string): string =>
  `${name}薪水, ${name}薪資, ${name}加班狀況, ${name}工時`;

type CompanySalaryWorkTimeHelmetProps = {
  companyName: string;
  page: number;
  totalCount: number;
  // 只有公司頁會查 top N 職稱，且查回來之前是 undefined
  topNJobTitles?: { name: string }[];
};

export const CompanySalaryWorkTimeHelmet: React.FC<
  CompanySalaryWorkTimeHelmetProps
> = ({ companyName, page, totalCount, topNJobTitles }) => {
  // title
  const title =
    page === 1
      ? `${companyName} ${TAB_TYPE_DETAIL_TRANSLATION[TabType.TIME_AND_SALARY]}`
      : `${companyName} ${
          TAB_TYPE_DETAIL_TRANSLATION[TabType.TIME_AND_SALARY]
        } - 第${page}頁`;

  // description
  let description = `目前還沒有${companyName}的薪水、加班狀況資料。分享你的薪水、加班狀況，一起讓職場更透明。`;
  if (totalCount > 0) {
    const jobTitles = topNJobTitles
      ? topNJobTitles.map(item => item.name).join('、')
      : '';
    description = `${companyName}薪水如何？${companyName}的${jobTitles}薪水大概多少？立即查看${totalCount}筆由${companyName}內部員工提供的薪水、加班狀況資料。`;
  }

  // canonical url
  const path = generateTabURL({
    pageType: PageType.COMPANY,
    pageName: companyName,
    tabType: TabType.TIME_AND_SALARY,
  });
  const url = formatCanonicalPath(path);

  return (
    <ReactHelmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={formatKeyword(companyName)} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SalaryWorkTimeOgImage} />
      <link rel="canonical" href={url} />
    </ReactHelmet>
  );
};

type JobTitleSalaryWorkTimeHelmetProps = {
  jobTitle: string;
  page: number;
  totalCount: number;
};

export const JobTitleSalaryWorkTimeHelmet: React.FC<
  JobTitleSalaryWorkTimeHelmetProps
> = ({ jobTitle, page, totalCount }) => {
  // title
  const title = `${jobTitle} ${
    TAB_TYPE_DETAIL_TRANSLATION[TabType.TIME_AND_SALARY]
  } - 第${page}頁`;

  // description
  let description = `目前還沒有${jobTitle}的薪水、加班狀況資料。分享你的薪水、加班狀況，一起讓職場更透明。`;
  if (totalCount > 0) {
    description = `查看${totalCount}筆由${jobTitle}提供的薪水、加班狀況資料。`;
  }

  // canonical url
  const path = generateTabURL({
    pageType: PageType.JOB_TITLE,
    pageName: jobTitle,
    tabType: TabType.TIME_AND_SALARY,
  });
  const url = formatCanonicalPath(path);

  return (
    <ReactHelmet>
      <title itemProp="name" lang="zh-TW">
        {title}
      </title>
      <meta name="description" content={description} />
      <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={formatKeyword(jobTitle)} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SalaryWorkTimeOgImage} />
      <link rel="canonical" href={url} />
    </ReactHelmet>
  );
};
