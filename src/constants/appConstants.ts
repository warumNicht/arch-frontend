const backendHost: string = 'http://localhost:8080';
const csrfHeaderName: string = 'X-CSRF-Token';

enum LangEnum {
    EN = 'en',
    DE = 'de',
    FR = 'fr'
}

const defaultLang: string = LangEnum.EN;

export const cookieValidity: number = 60 * 60 * 1000; // 60 min

const supportedLanguages: string[] = Object.entries(LangEnum).filter(entry => typeof entry[0] !== 'number')
    .map(entry => {
        return `/${entry[1]}`
    })

export const languagesArray: string[] = Object.entries(LangEnum).filter(entry => typeof entry[0] !== 'number')
    .map(entry => {
        return entry[1];
    })

enum UserRoles {
    USER = 'ROLE_USER',
    ADMIN = 'ROLE_ADMIN'
}

export default backendHost;
export { csrfHeaderName, UserRoles, defaultLang, supportedLanguages, LangEnum };