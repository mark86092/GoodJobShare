export const fragmentSalaryWorkTimeFields = /* GraphQL */ `
  fragment salaryWorkTimeFields on SalaryWorkTime {
    id
    week_work_time
    salary {
      type
      amount
    }
    sector
    day_real_work_time
    day_promised_work_time
    experience_in_year
    estimated_hourly_wage
    overtime_frequency
    employment_type
    job_title {
      name
    }
    company {
      name
    }
    originalCompanyName
    data_time {
      month
      year
    }
    reportCount
    reports {
      id
      reasonCategory
      reason
      createdAt
    }
  }
`;
