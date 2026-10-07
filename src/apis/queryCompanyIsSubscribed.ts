import {
  companyField,
  companyVariableDef,
  companyVariables,
} from 'apis/companyKey';
import graphqlClient from 'utils/graphqlClient';

const queryCompanyIsSubscribedGql = (
  companyKey: string,
): string => /* GraphQL */ `
  query(${companyVariableDef(companyKey)}) {
    ${companyField(companyKey)} {
      id
      isSubscribed
    }
  }
`;

type QueryCompanyIsSubscribedData = {
  company: {
    id: string;
    isSubscribed: boolean;
  } | null;
};

export type CompanyIsSubscribed = {
  // isSubscribed 反映使用者目前（後端確認或本地樂觀更新）是否訂閱該公司
  isSubscribed: boolean;
  // companyId 為 null 代表查無此公司（company 不存在）；為 string 時才可實際訂閱/取消訂閱
  companyId: string | null;
};

const queryCompanyIsSubscribed = async ({
  companyName,
  token,
}: {
  companyName: string;
  token?: string;
}): Promise<CompanyIsSubscribed> => {
  const data = await graphqlClient<QueryCompanyIsSubscribedData>({
    query: queryCompanyIsSubscribedGql(companyName),
    token,
    variables: companyVariables(companyName),
  });

  if (!data.company) {
    return {
      isSubscribed: false,
      companyId: null,
    };
  }

  return {
    isSubscribed: data.company.isSubscribed,
    companyId: data.company.id,
  };
};

export default queryCompanyIsSubscribed;
