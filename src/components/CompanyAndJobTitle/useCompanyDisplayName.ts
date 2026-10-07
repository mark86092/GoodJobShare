import { useSelector } from 'react-redux';

import { companyNameBoxSelectorByKey } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';
import { isObjectId } from 'utils/objectId';

// 給人看的名稱。用名稱定位時 pageName 本身就是公司名；用 ObjectId 定位時
// 要等 queryCompanyDisplayName 回來，在那之前先退回 pageName
const useCompanyDisplayName = (pageName: string): string => {
  const box = useSelector(companyNameBoxSelectorByKey(pageName));
  if (isObjectId(pageName) && isFetched(box) && box.data) {
    return box.data;
  }
  return pageName;
};

export default useCompanyDisplayName;
