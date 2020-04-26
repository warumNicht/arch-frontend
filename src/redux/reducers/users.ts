import  { UserActions } from '../actions/ActionTypes'
import Action  from '../interfaces/Action';

function user(state = {}, action: Action) {
    switch (action.type) {
        case UserActions.SET_CURRENT_USER:
            return action.payload.user

        default:
            return state
    }
}

export default user