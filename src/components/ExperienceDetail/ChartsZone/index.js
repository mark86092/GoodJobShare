import loadable from '@loadable/component';
import cn from 'classnames';
import PropTypes from 'prop-types';
import R from 'ramda';
import React from 'react';

import { generatePageURL, PageType } from 'constants/companyJobTitle';

import moduleStyles from './ChartsZone.module.css';
import ChartWrapper from '../../LandingPage/ChartWrapper';
import styles from '../../LandingPage/SummarySection.module.css';

const isEmptyOrNull = R.either(R.isEmpty, R.isNil);

const SalaryDistributionChart = loadable(() =>
  import('common/Charts/SalaryDistributionChart'),
);
const JobTitleDistributionChart = loadable(() =>
  import('common/Charts/JobTitleDistributionChart'),
);

const ChartsZone = ({
  experience: {
    company: {
      name: companyName,
      salary_work_time_statistics: { job_average_salaries },
    },
    job_title: {
      name: jobTitle,
      salary_distribution: { bins },
    },
  },
}) => {
  if (isEmptyOrNull(job_average_salaries) && isEmptyOrNull(bins)) {
    return null;
  }
  return (
    <div className={cn(styles.page, moduleStyles.container)}>
      {isEmptyOrNull(job_average_salaries) ? null : (
        <ChartWrapper
          className={styles.chartWrapper}
          title={`${companyName}的薪水`}
          to={generatePageURL({
            pageType: PageType.COMPANY,
            pageName: companyName,
          })}
        >
          <React.Fragment>
            <div className={styles.barChart}>
              <JobTitleDistributionChart data={job_average_salaries} />
            </div>
          </React.Fragment>
        </ChartWrapper>
      )}
      {isEmptyOrNull(bins) ? null : (
        <ChartWrapper
          className={styles.chartWrapper}
          title={`${jobTitle}的薪水分佈`}
          to={generatePageURL({
            pageType: PageType.JOB_TITLE,
            pageName: jobTitle,
          })}
        >
          <React.Fragment>
            <div className={styles.barChart}>
              <SalaryDistributionChart data={bins} />
            </div>
          </React.Fragment>
        </ChartWrapper>
      )}
    </div>
  );
};

ChartsZone.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ChartsZone;
