export function urlConjuction() {
    let result = arguments[1];
    for (let i = 0; i < arguments.length; i++) {
        if (i === 0) {
            result = arguments[i] && arguments[i].length > 0 ? arguments[i] : '';
        } else if (arguments[i] && arguments[i].length > 0) {
            const url = arguments[i][0] === '/' ? arguments[i].slice(1, arguments[i].length) : arguments[i];
            result = result + '/' + url;
        }
        if (result[result.length - 1] === '/') {
            result = result.slice(0, result.length - 1);
        }
    }
    return result;
}

export function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}

export function base62Encode(byteArr) {
    let out = "", b;
    for (let i = 0; i < byteArr.length; i += 3) {
        b = (byteArr[i] & 0xFC) >> 2;
        out += append(b);
        b = (byteArr[i] & 0x03) << 4;
        if (i + 1 < byteArr.length) {
            b |= (byteArr[i + 1] & 0xF0) >> 4;
            out += append(b);
            b = (byteArr[i + 1] & 0x0F) << 2;
            if (i + 2 < byteArr.length) {
                b |= (byteArr[i + 2] & 0xC0) >> 6;
                out += append(b);
                b = byteArr[i + 2] & 0x3F;
                out += append(b);
            } else {
                out += append(b);
            }
        } else {
            out += append(b);
        }
    }
    return out.substr(0, 32);
}

function append(b) {
    const CODEFLAG = '9';
    const CODES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return b < 61 ? CODES.charAt(b) : CODEFLAG + CODES.charAt(b - 61);
}