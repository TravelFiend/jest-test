const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isArray = val => Array.isArray(val);
const isObject = val => typeof val === 'object' && val !== null && !Array.isArray(val);
const isFunction = val => typeof val === 'function';

const castToNumber = val => {
    if(isNumber(val)) return val;
    const number = Number(val);
    if(isNaN(number)) throw new CastError(Number, val);
    return number;
};

const castToString = val => {
    if(isObject(val)){
        return JSON.stringify(val);
    }
    if(val === undefined || val === null) throw new CastError(String, val);
    return val.toString();
};

const castToBoolean = val => !!val;

const castToArray = (...args) => args;

class CastError extends Error {
    constructor(Type, value) {
        const type = Type.name;
        super(`Cannot cast >>${value}<< to ${type}`);
        this.type = type;
        this.value = value;
    }
}

const casters = {
    Number: castToNumber,
    String: castToString
};

const getCaster = Type => {
    return casters[Type.name] || null;
};

module.exports = {
    isNumber,
    isString,
    isBoolean,
    isArray,
    isObject,
    isFunction,
    CastError,
    getCaster,
    castToNumber,
    castToString,
    castToBoolean,
    castToArray
};
