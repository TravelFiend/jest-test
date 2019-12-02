const { isNumber, isString, castToNumber, getCaster } = require('../lib/types.js');

describe('validator module', () => {
    describe('basic validation', () => {
        it('should tell if a value is a number', () => {
            expect(isNumber(3)).toBeTruthy();
            expect(isNumber(3.345)).toBeTruthy();
            expect(isNumber(NaN)).toBeTruthy();
            expect(isNumber('hi')).toBeFalsy();
            expect(isNumber([])).toBeFalsy();
            expect(isNumber({})).toBeFalsy();
            expect(isNumber(() => {})).toBeFalsy();
            expect(isNumber(true)).toBeFalsy();
        });

        it('should tell if a value is a string', () => {
            expect(isString('salmon')).toBeTruthy();
            expect(isString('234')).toBeTruthy();
            expect(isString('')).toBeTruthy();
            expect(isString(9425)).toBeFalsy();
            expect(isString([])).toBeFalsy();
            expect(isString({})).toBeFalsy();
            expect(isString(null)).toBeFalsy();
            expect(isString(undefined)).toBeFalsy();
            expect(isString(NaN)).toBeFalsy();
            expect(isString(true)).toBeFalsy();
            expect(isString(() => {})).toBeFalsy();
        });
    });

    describe('casters', () => {
        it('can cast values to a number', () => {
            expect(castToNumber(3)).toEqual(3);
            expect(castToNumber('3')).toEqual(3);
            expect(castToNumber(true)).toEqual(1);
            expect(castToNumber(false)).toEqual(0);
        });

        it('throws if value is not castable to number', () => {
            expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
            expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
        });
    });

    it('can get the right caster', () => {
        expect(getCaster(Number)).toEqual(castToNumber);
        expect(getCaster(Promise)).toBeNull();
    });
});
