import  { UserActions } from '../actions/ActionTypes'
import { SetUserAction }  from '../interfaces/Action';

function user(state = null, action: SetUserAction) {
    switch (action.type) {
        case UserActions.SET_CURRENT_USER:
            return action.user;
        default:
            return state
    }
}

export default user