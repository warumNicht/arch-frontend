import  { UserActions } from '../actions/ActionTypes'

function users(state = {}, action: any) {
    switch (action.type) {
        case UserActions.SET_CURRENT_USER:
            return action.user

        default:
            return state
    }
}

export default users