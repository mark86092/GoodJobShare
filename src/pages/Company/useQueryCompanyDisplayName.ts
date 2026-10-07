import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { queryCompanyDisplayName } from 'actions/company';

// client 端的對應：SSR 由各 Provider 的 fetchData 負責。
// 只有 ObjectId 定位時才會真的發請求，見 actions/company 的 queryCompanyDisplayName
const useQueryCompanyDisplayName = (companyName: string): void => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(queryCompanyDisplayName({ companyName }));
  }, [dispatch, companyName]);
};

export default useQueryCompanyDisplayName;
