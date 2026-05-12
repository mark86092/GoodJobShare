import R from 'ramda';
import { useParams } from 'react-router-dom';

export type Params = { companyName: string };

export const companyNameSelector = R.compose(
  decodeURIComponent,
  (params: Params) => params.companyName,
);

const useCompanyName = (): string => {
  const params = useParams<Params>();
  return companyNameSelector(params);
};

export default useCompanyName;
