var jwtDecode = require('jwt-decode');

const userService = {
    getCurrentUserRoles
};

function getCurrentUserRoles() : string[] {
    const token = localStorage.getItem('token');
    if(token){
        var decoded = jwtDecode(token);
        if(decoded.user){
            return decoded.user.roles
        }
    }
    return [];
}


export default userService;