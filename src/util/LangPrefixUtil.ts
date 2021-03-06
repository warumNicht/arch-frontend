import { defaultLang, LangEnum, cookieValidity } from '../constants/appConstants';

function getPathWithoutLangPrefix(path: string): string {
    if (path.charAt(3) === '/') {
        return path.substring(3)
    }
    return '';
}

export function getLangPrefix(path: string): string {
    if (path.length >= 4 && path.charAt(3) === '/') {
        const res = path.substring(1, 3);
        console.log(res)
        return path.substring(1, 3)
    }
    return defaultLang;
}

export function getLangCookie(props: any): string {
    return props.cookies.get('lang') || LangEnum.EN;
}

export function createCookieOptions(): Object {
    let d = new Date();
    d.setTime(d.getTime() + cookieValidity); 
    return {
        path: '/',
        expires: d,
        // httpOnly: true
    }
}

export default getPathWithoutLangPrefix;