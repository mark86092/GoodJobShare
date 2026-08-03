<<<<<<< HEAD
type GraphqlErrorInput = {
  message: string;
  extensions?: { code?: string };
  path?: (string | number)[];
=======
type GraphqlErrorItem = {
  message: string;
  path?: (string | number)[];
  extensions?: {
    code?: string;
  };
>>>>>>> upstream/master
};

class GraphqlError extends Error {
  codes: (string | undefined)[];
  paths: ((string | number)[] | undefined)[];

<<<<<<< HEAD
  constructor(errors: GraphqlErrorInput[]) {
    super(errors.map(e => e.message).join(', '));
    this.name = 'GraphqlError';
    this.codes = errors.map(e => e.extensions && e.extensions.code);
    this.paths = errors.map(e => e.path);
=======
  constructor(errors: GraphqlErrorItem[]) {
    super(errors.map(({ message }) => message).join(', '));

    this.name = 'GraphqlError';
    this.codes = errors.map(({ extensions }) => extensions && extensions.code);
    this.paths = errors.map(({ path }) => path);
>>>>>>> upstream/master
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphqlError);
    }
  }
}

export default GraphqlError;
<<<<<<< HEAD
export const isGraphqlError = (error: unknown): error is GraphqlError =>
  error instanceof Error && error.name === 'GraphqlError';
=======

// Compares `name` instead of using `instanceof`: the build targets es5, where
// subclassing Error breaks the prototype chain and `instanceof` is unreliable.
export const isGraphqlError = (error: unknown): error is GraphqlError =>
  error instanceof Object && (error as Error).name === 'GraphqlError';
>>>>>>> upstream/master
