import Helper from './helper';

describe('Helper', () => {

  it('should handle invalid input parameters', () => {
    expect(Helper.convertToLocalIso(null)).toBeUndefined();
    expect(Helper.convertToLocalIso(undefined)).toBeUndefined();
    expect(Helper.convertToLocalIso(Object as any)).toBeUndefined();
    expect(Helper.convertToLocalIso('' as any)).toBeUndefined();
    expect(Helper.convertToLocalIso({} as any)).toBeUndefined();

  });

  it('should check ISO date format for local timezone', () => {
    expect(Helper.convertToLocalIso(new Date(2012, 11 - 1, 20, 4, 5, 6))).toEqual('2012-11-20T04:05');
  });
});

