import { User } from "../redux/interfaces/ArchitectureAppStore";

var jwtDecode = require('jwt-decode');

const userService = {
    getCurrentUserRoles,
    getPrincipal
};

function getCurrentUserRoles(): string[] {
    const token = localStorage.getItem('token');
    if (token) {
        var decoded = jwtDecode(token);
        if (decoded.user) {
            return decoded.user.roles
        }
    }
    return [];
}

function getPrincipal(): User | null {
    const token = localStorage.getItem('token');
    if (token) {
        var decoded = jwtDecode(token);
        if (decoded.user) {
            return decoded.user
        }
    }
    return null;
}


export default userService;