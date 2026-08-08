import { useParams } from 'react-router-dom';

import { Aspect, aspectFromURL } from 'constants/companyJobTitle';

// Matches the React Router route params for the aspect sub page.
// aspect 標成 optional：useParams 在沒有這個 param 的路由一樣會回傳物件
type Params = { aspect?: string };

const decodeSlug = (aspect: string | undefined): string => {
  if (aspect === undefined) {
    throw new Error(
      'aspect 不存在：只能用在 /companies/:companyName/work-experiences/:aspect 之下',
    );
  }
  return decodeURIComponent(aspect);
};

// 網址上的原始值。留給呼叫端判斷「不是合法 slug」時要 redirect 還是 NotFound
export const aspectSlugSelector = (params: Params): string =>
  decodeSlug(params.aspect);

// undefined 代表網址上的值不是合法 slug —— 使用者拼錯或舊網址，不是程式錯誤
export const aspectSelector = (params: Params): Aspect | undefined =>
  aspectFromURL(aspectSlugSelector(params));

// 名字帶 Param 的理由見 pages/Company/useCompanyNameParam
export const useAspectSlugParam = (): string =>
  decodeSlug(useParams<Params>().aspect);

const useAspectParam = (): Aspect | undefined =>
  aspectFromURL(useAspectSlugParam());

export default useAspectParam;
