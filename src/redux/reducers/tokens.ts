import TokenActions from '../actions/ActionTypes'
import Action  from '../interfaces/Action';

function tokens(state = '', action: Action) {
    switch (action.type) {
        case TokenActions.SET_TOKEN:
            return action.payload

        default:
            return state
    }
}

export default tokens;