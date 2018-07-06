import { AsyncStorage } from 'react-native';

const SeperatorChar = '$';
const CommonPrefix = '__common__';

// 非公共部分的前缀
let uncommonPrefix = undefined;

export function set(keys, content, isCommon = false) {
    const value = JSON.stringify(content);
    const key = generateKey(keys, isCommon);
    return AsyncStorage.setItem(key, value);
}

export function get(keys, isCommon = false) {
    const key = generateKey(keys, isCommon);
    return AsyncStorage.getItem(key).then(result => JSON.parse(result));
}

export function remove(keys, isCommon = false) {
    const key = generateKey(keys, isCommon);
    return AsyncStorage.removeItem(key);
}

export function filter(keys, isCommon = false) {
    const prefix = generateKey(keys, isCommon);
    return AsyncStorage.getAllKeys()
        .then(keys => {
            const filteredKeys = keys.filter(item => item.startsWith(prefix));
            return AsyncStorage.multiGet(filteredKeys);
        })
        .then(result => {
            return [{}, ...result].reduce((prv, cur) => {
                prv[cur[0]] = JSON.parse(cur[1]);
                return prv;
            });
        });
}

export function setUncommonPrefix(prefix) {
    uncommonPrefix = prefix;
}

function generateKey(keys, isCommon) {
    const key = Array.isArray(keys) ? keys : [keys];
    const prefix = isCommon ? CommonPrefix : uncommonPrefix;
    return [prefix, ...key].join(SeperatorChar);
}