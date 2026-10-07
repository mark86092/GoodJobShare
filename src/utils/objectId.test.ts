import { isObjectId } from './objectId';

describe('isObjectId', () => {
  it('accepts 24 hex chars', () => {
    expect(isObjectId('507f1f77bcf86cd799439011')).toBe(true);
    expect(isObjectId('507F1F77BCF86CD799439011')).toBe(true);
  });

  it('rejects other strings', () => {
    expect(isObjectId('')).toBe(false);
    expect(isObjectId('GoodJob')).toBe(false);
    expect(isObjectId('507f1f77bcf86cd79943901')).toBe(false); // 23
    expect(isObjectId('507f1f77bcf86cd7994390111')).toBe(false); // 25
    expect(isObjectId('507f1f77bcf86cd79943901g')).toBe(false); // non-hex
    expect(isObjectId(' 507f1f77bcf86cd799439011')).toBe(false);
  });
});
