type RequestArgs = {
  body?: unknown;
  query?: Record<string, unknown>;
  options?: { apiHost?: string };
  token?: string | null;
};

type Request = (args?: RequestArgs) => Promise<unknown>;

declare function fetchUtil(
  endpoint: string,
): Record<'get' | 'post' | 'patch' | 'delete', Request>;

export default fetchUtil;
