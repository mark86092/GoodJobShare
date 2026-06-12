type GraphqlErrorInput = {
  message: string;
  extensions?: { code?: string };
  path?: (string | number)[];
};

class GraphqlError extends Error {
  codes: (string | undefined)[];
  paths: ((string | number)[] | undefined)[];

  constructor(errors: GraphqlErrorInput[]) {
    super(errors.map(e => e.message).join(', '));
    this.name = 'GraphqlError';
    this.codes = errors.map(e => e.extensions && e.extensions.code);
    this.paths = errors.map(e => e.path);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphqlError);
    }
  }
}

export default GraphqlError;
export const isGraphqlError = (error: unknown): error is GraphqlError =>
  error instanceof Error && error.name === 'GraphqlError';
