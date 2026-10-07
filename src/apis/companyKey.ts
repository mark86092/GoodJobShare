import { isObjectId } from 'utils/objectId';

// 公司可以用名稱或 ObjectId 定位（/companies/:companyName 兩者都收）。
// 這三個 helper 讓各 query 組出對應的變數宣告、root field 與 variables：
// id 走 companyById，並用 alias 維持回應仍是 data.company

export const companyVariableDef = (companyKey: string): string =>
  isObjectId(companyKey) ? '$companyId: ID!' : '$companyName: String!';

export const companyField = (companyKey: string): string =>
  isObjectId(companyKey)
    ? 'company: companyById(id: $companyId)'
    : 'company(name: $companyName)';

export const companyVariables = (
  companyKey: string,
): { companyId: string } | { companyName: string } =>
  isObjectId(companyKey)
    ? { companyId: companyKey }
    : { companyName: companyKey };
