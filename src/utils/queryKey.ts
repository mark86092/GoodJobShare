// 將查詢參數序列化成穩定的字串，用來當 redux 裡「同一個 resource 下不同查詢」的 key。
// key 排序後再序列化，undefined 的欄位會被略過，因此 { a: 1, b: undefined } 與 { a: 1 } 同 key。
const toQueryKey = (params: Record<string, unknown>): string =>
  JSON.stringify(
    Object.keys(params)
      .sort()
      .reduce<Record<string, unknown>>((acc, name) => {
        acc[name] = params[name];
        return acc;
      }, {}),
  );

export default toQueryKey;
