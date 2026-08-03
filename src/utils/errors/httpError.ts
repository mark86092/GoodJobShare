class HttpError extends Error {
  statusCode: number;

  constructor(message: string, { statusCode }: { statusCode: number }) {
    super(message);
<<<<<<< HEAD
=======

>>>>>>> upstream/master
    this.name = 'HttpError';
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}

export default HttpError;
<<<<<<< HEAD
export const isHttpError = (error: unknown): error is HttpError =>
  error instanceof Error && error.name === 'HttpError';
=======

// See the note in graphqlError.ts on why this compares `name`.
export const isHttpError = (error: unknown): error is HttpError =>
  error instanceof Object && (error as Error).name === 'HttpError';
>>>>>>> upstream/master
