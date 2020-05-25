import ArchitectureAppStore, { User } from "../redux/interfaces/ArchitectureAppStore";
import store from '../redux/store';

var jwtDecode = require('jwt-decode');

const userService = {
    getCurrentUserRoles,
    getPrincipal
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


export default userService;