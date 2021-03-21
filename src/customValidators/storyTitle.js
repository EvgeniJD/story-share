export function isAlphaNum(value) {
    const regExp = /[A-Za-z\s\d]+/;
    return regExp.test(value);
}