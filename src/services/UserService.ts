import ArchitectureAppStore, { User } from "../redux/interfaces/ArchitectureAppStore";
import store from '../redux/store';
import { UserRoles } from "../constants/appConstants";

var jwtDecode = require('jwt-decode');

const userService = {
    getCurrentUserRoles,
    getPrincipal,
    getMainRole
};

function getCurrentUserRoles(): string[] {
    const state: ArchitectureAppStore = store.getState();
    if(state.user){
        return state.user.roles;
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

function getMainRole(): string {
    const state: ArchitectureAppStore = store.getState();
    if(state.user){
        if(state.user.roles.indexOf(UserRoles.ADMIN) === -1){
            return UserRoles.USER
        }
        return UserRoles.ADMIN;
    }
    return '';
}

export default userService;