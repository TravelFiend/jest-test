const {
    isNumber,
    isString,
    isBoolean,
    isArray,
    isObject,
    isFunction,
    castToNumber,
    castToString,
    castToBoolean,
} = require('./lib/types.js');

console.log(isNumber('3'));
console.log(isString('3'));
console.log(isBoolean(false));
console.log(isArray([]));
console.log(isObject({}));
console.log(isFunction(() => {}));
console.log(castToNumber('98696'));
console.log(castToString(63346));
console.log(castToBoolean(0));
