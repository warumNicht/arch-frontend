import { csrfHeaderName, tokenAttributeName } from "../constants/appConstants";

export function setNestedKey(obj: any, path: string, value: any) {
    if (!path.includes('.')) {
        obj[path] = value;
        return obj;
    }
    const pList = path.split('.');
    const key = pList.pop();
    if (!key) {
        return obj;
    }
    const pointer = pList.reduce((accumulator, currentValue) => {
        if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
        return accumulator[currentValue];
    }, obj);
    pointer[key] = value;
    return obj;
}

export function getTokenHeader(){
    return {
        headers: {
            [csrfHeaderName]: localStorage.getItem(tokenAttributeName)
        }
    };
}