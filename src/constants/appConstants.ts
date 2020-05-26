const backendHost: string = 'http://localhost:8080';
const csrfHeaderName: string = 'X-CSRF-Token';

const defaultLang: string = 'en';
enum LangEnum {
    EN = 'en',
    DE = 'de'
}

const supportedLanguages: string[] = Object.entries(LangEnum).filter(entry => typeof entry[0] !== 'number')
.map(entry => {
    return `/${entry[1]}`
})


enum UserRoles {
    user = 'ROLE_USER',
    admin = 'ROLE_ADMIN'
}

export default backendHost;
export { csrfHeaderName, UserRoles, defaultLang, supportedLanguages, LangEnum};