import { useEffect } from 'react';

import { useViewSalaryWorkTimes } from 'hooks/viewLog';

type ViewLogProps = {
  // pageName 與 page 只當作 effect 的 key，切換公司／職稱或換頁時重送
  pageName: string;
  page: number;
  contentIds: string[];
};

const ViewLog = ({ pageName, page, contentIds }: ViewLogProps): null => {
  // Send view to backend
  const viewSalaryWorkTimes = useViewSalaryWorkTimes();
  useEffect(() => {
    const referrer = window.location.href;
    viewSalaryWorkTimes({ contentIds, referrer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, page, viewSalaryWorkTimes]);

  return null;
};

export default ViewLog;
