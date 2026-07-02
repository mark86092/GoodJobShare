class UiNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UiNotFoundError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UiNotFoundError);
    }
  }
}

export default UiNotFoundError;
export const isUiNotFoundError = (error: unknown): error is UiNotFoundError =>
  error instanceof Error && error.name === 'UiNotFoundError';
