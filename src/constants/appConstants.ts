const backendHost: string = 'http://localhost:8080';
const csrfHeaderName: string = 'X-CSRF-Token';

enum UserRoles{
    user = 'ROLE_USER',
    admin = 'ROLE_ADMIN'
}

export default backendHost;
export {csrfHeaderName, UserRoles};