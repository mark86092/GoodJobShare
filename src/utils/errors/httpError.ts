class HttpError extends Error {
  statusCode: number;

  constructor(message: string, { statusCode }: { statusCode: number }) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}

export default HttpError;
export const isHttpError = (error: unknown): error is HttpError =>
  error instanceof Error && error.name === 'HttpError';
