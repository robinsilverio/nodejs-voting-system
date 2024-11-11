export const filteredObjectByConditionSet = (paramOriginalObject, paramCondition) => {
    return Object.keys(paramOriginalObject).reduce((obj, key) => {
        if (typeof paramCondition === 'function' ? paramCondition(key, paramOriginalObject[key]) : key === paramCondition) {
            obj[key] = paramOriginalObject[key];
        }
        return obj;
    }, {});
}