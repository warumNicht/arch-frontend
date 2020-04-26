import TokenActions from '../actions/ActionTypes'

function tokens(state = '', action: any) {
    switch (action.type) {
        case TokenActions.SET_TOKEN:
            return action.token

        default:
            return state
    }
}

export default tokens;