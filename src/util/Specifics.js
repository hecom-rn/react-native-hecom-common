import * as StringUtil from './StringUtil';

export const defaultProp = '__default__';

/**
 * 在指定对象中，根据路径值查找处理函数，不存在则查找各级默认值。
 * @param obj 根对象
 * @param type 路径值，通用情况可以为一个数组
 * @param state 当前状态，用于判断特殊条件
 * @param params 用于处理函数的参数
 * @returns {*} 处理函数的结果
 */
export function get(obj, type, state, params) {
    const keyType = Array.isArray(type) ? type[0] : type;
    const keyItem = obj[keyType];
    if (keyItem && keyItem.specifics && keyItem.specifics.length > 0) {
        const specs = keyItem.specifics.filter(specItem => specItem.specific(state));
        if (specs.length > 0) {
            return calculateFinal(specs[0].final, params);
        }
    }
    const types = Array.isArray(type) ? type : [type];
    let result = obj[defaultProp];
    types.filter(typeitem => typeof typeitem !== 'undefined').reduce((prv, cur) => {
        if (!prv) {
            return prv;
        } else {
            if (prv[cur]) {
                const defaultItem = prv[cur][defaultProp];
                if (defaultItem) {
                    result = defaultItem;
                }
                return prv[cur];
            } else {
                const defaultItem = prv[defaultProp];
                if (defaultItem) {
                    result = defaultItem;
                }
                return undefined;
            }
        }
    }, obj);
    if (typeof result !== 'undefined') {
        return calculateFinal(result, params);
    } else {
        return result;
    }
}

/**
 * 在指定对象中动态注册一个事件。
 * @param obj 根对象
 * @param type 路径值，通用情况可以为一个数组
 * @param specificFunc 特殊条件判断函数
 * @param finalFunc 特殊条件判断成功后的处理函数
 * @returns {*} 如果是特殊条件，则返回该次注册的ID，用于取消注册
 */
export function register(obj, type, specificFunc, finalFunc) {
    if (specificFunc) {
        const keyType = Array.isArray(type) ? type[0] : type;
        if (!obj[keyType]) {
            obj[keyType] = {};
        }
        const funcId = StringUtil.guid();
        const value = {
            id: funcId,
            specific: specificFunc,
            final: finalFunc,
        };
        if (obj[keyType].specifics) {
            obj[keyType].specifics.push(value);
        } else {
            obj[keyType].specifics = [value];
        }
        return funcId;
    } else {
        const types = Array.isArray(type) ? type : [type];
        const item = types
            .filter(typeitem => typeof typeitem !== 'undefined' && typeitem !== defaultProp)
            .reduce((prv, cur) => {
                if (!prv[cur]) {
                    prv[cur] = {};
                }
                return prv[cur];
            }, obj);
        item[defaultProp] = finalFunc;
    }
}

/**
 * 在指定对象中取消注册一个事件。
 * @param obj 根对象
 * @param type 路径值，通用情况可以为一个数组
 * @param funcId 特殊事件则为注册时返回的ID，如果为空，则取消注册通用事件
 * @returns {boolean} 成功或失败
 */
export function unregister(obj, type, funcId) {
    if (funcId) {
        const keyType = Array.isArray(type) ? type[0] : type;
        const item = obj[keyType];
        if (!item || !item.specifics) {
            return false;
        } else {
            const len = item.specifics.length;
            item.specifics = item.specifics.filter(specItem => specItem.id !== funcId);
            return item.specifics.length !== len;
        }
    } else {
        const types = Array.isArray(type) ? type : [type];
        const filterTypes = types.filter(typeItem => typeof typeItem !== 'undefined');
        if (filterTypes.length >= 1) {
            if (obj[filterTypes[0]]) {
                return unregister(obj[filterTypes[0]], filterTypes.slice(1, filterTypes.length), undefined);
            } else {
                return false;
            }
        } else {
            if (obj.hasOwnProperty(defaultProp)) {
                delete obj[defaultProp];
                return true;
            } else {
                return false;
            }
        }
    }
}

function calculateFinal(finalFunc, params) {
    if (typeof finalFunc === 'function') {
        if (!params) {
            return finalFunc;
        } else {
            return finalFunc(params);
        }
    } else {
        return finalFunc;
    }
}