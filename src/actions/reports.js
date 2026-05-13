import { tokenSelector } from 'selectors/authSelector';
import createExperienceReportApi from 'apis/createExperienceReport';
import createSalaryWorkTimeReportApi from 'apis/createSalaryWorkTimeReport';

export const createExperienceReport = ({ id, reason, reasonCategory }) => (
  _,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);
  return createExperienceReportApi({
    id,
    reason,
    reasonCategory,
    token,
  });
};

export const createSalaryWorkTimeReport = ({ id, reason, reasonCategory }) => (
  _,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);
  return createSalaryWorkTimeReportApi({
    id,
    reason,
    reasonCategory,
    token,
  });
};
