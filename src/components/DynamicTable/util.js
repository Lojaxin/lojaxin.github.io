export const isEmptyValue = value => {
    if (!value) {
        return true;
    }
    return Object.keys(value).every(key => value[key] === undefined);
};

export const getInitialValue = (min, initialValue, defaultValue = {}) => {
    let value = [];
    let num = 0;

    if (initialValue && initialValue.length) {
        num = initialValue.length;
    } else {
        num = min;
    }

    if (num && num > 0) {
        for (let i = 0, l = num; i < l; i++) {
            const currentValue = isEmptyValue(initialValue?.[i]) ? defaultValue : initialValue[i];
            value.push(currentValue);
        }
    }

    return value;
};

export const getName = name => {
    if (typeof name === 'string') {
        return [name];
    } else {
        return [...name];
    }
};

export const getFormName = (name, prefixName) => {
    let formName = getName(name);
    if (prefixName) {
        if (typeof prefixName === 'string') {
            formName = [prefixName, ...formName];
        } else {
            formName = [...prefixName, ...formName];
        }
    }
    return formName;
};