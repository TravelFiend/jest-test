const { isNumber, isString, isBoolean, isArray, isObject, isFunction, castToNumber, getCaster } = require('../lib/types.js');

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

        it('should tell if a value is a boolean', () => {
            expect(isBoolean(true)).toBeTruthy();
            expect(isBoolean(false)).toBeTruthy();
            expect(isBoolean('polaroid')).toBeFalsy();
            expect(isBoolean(3987)).toBeFalsy();
            expect(isBoolean(null)).toBeFalsy();
            expect(isBoolean(NaN)).toBeFalsy();
            expect(isBoolean(undefined)).toBeFalsy();
            expect(isBoolean([])).toBeFalsy();
            expect(isBoolean({})).toBeFalsy();
            expect(isBoolean(() => {})).toBeFalsy();
        });

        it('should tell if a value is an array', () => {
            expect(isArray([])).toBeTruthy();
            expect(isArray([1, 'red', null])).toBeTruthy();
            expect(isArray('platypus')).toBeFalsy();
            expect(isArray(100000)).toBeFalsy();
            expect(isArray(NaN)).toBeFalsy();
            expect(isArray(undefined)).toBeFalsy();
            expect(isArray(null)).toBeFalsy();
            expect(isArray({})).toBeFalsy();
            expect(isArray(() => {})).toBeFalsy();
        });

        it('should tell if a value is an object', () => {
            expect(isObject({ first: 'place' })).toBeTruthy();
            expect(isObject({})).toBeTruthy();
            expect(isObject('Cornstarch')).toBeFalsy();
            expect(isObject(3464)).toBeFalsy();
            expect(isObject(null)).toBeFalsy();
            expect(isObject(undefined)).toBeFalsy();
            expect(isObject(NaN)).toBeFalsy();
            expect(isObject([])).toBeFalsy();
            expect(isObject(() => {})).toBeFalsy();
        });

        it('should tell if a value is a function', () => {
            expect(isFunction(isNumber)).toBeTruthy();
            expect(isFunction(isString)).toBeTruthy();
            expect(isFunction(isBoolean)).toBeTruthy();
            expect(isFunction(isArray)).toBeTruthy();
            expect(isFunction(isObject)).toBeTruthy();
            expect(isFunction(() => {})).toBeTruthy();
            expect(isFunction({})).toBeFalsy();
            expect(isFunction('Cornstarch')).toBeFalsy();
            expect(isFunction(3464)).toBeFalsy();
            expect(isFunction(null)).toBeFalsy();
            expect(isFunction(undefined)).toBeFalsy();
            expect(isFunction(NaN)).toBeFalsy();
            expect(isFunction([])).toBeFalsy();
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
