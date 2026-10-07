// MongoDB ObjectId：24 位十六進位字元
const OBJECT_ID_PATTERN = /^[0-9a-f]{24}$/i;

export const isObjectId = (value: string): boolean =>
  OBJECT_ID_PATTERN.test(value);
