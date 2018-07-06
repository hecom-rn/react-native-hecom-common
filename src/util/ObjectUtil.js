export function isEmpty(value) {
    const isUndefined = typeof value === 'undefined' || value === null;
    const isString = typeof value === 'string' && value.length === 0;
    const isArray = Array.isArray(value) && value.length === 0;
    const isDict = Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0;
    return isUndefined || isString || isArray || isDict;
}

export function clear(obj) {
    Object.keys(obj).forEach(key => delete obj[key]);
}

export function exportObject(obj) {
    if (Array.isArray(obj)) {
        const res = [];
        for (const item of obj) {
            res.push(exportObject(item));
        }
        return res;
    } else if (Object.prototype.isPrototypeOf(obj)) {
        const res = {};
        for (const key of Object.keys(obj)) {
            res[key] = obj[key];
        }
        return res;
    } else {
        return obj;
    }
}

export function convertListToDict(arr, keyname) {
    const list = {};
    arr && arr.forEach(value => {
        list[value[keyname]] = exportObject(value);
    });
    return list;
}

export function traverseTree(node, consumer, childKey = 'children') {
    if (isEmpty(node)) {
        return;
    }
    const stack = Array.isArray(node) ? [...node] : [node];
    while (stack.length > 0) {
        const tempNode = stack.pop();
        consumer && consumer(tempNode);
        const children = tempNode[childKey];
        if (children && children.length > 0) {
            children.forEach(child => stack.push(child));
        }
    }
}