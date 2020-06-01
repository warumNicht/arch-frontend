import { CategoryActions } from '../actions/ActionTypes';
import Action from '../interfaces/Action';
import Category from '../interfaces/ArchitectureAppStore';

const initialCattegoriesState: Category[] = [];

function categories(state = initialCattegoriesState, action: Action) {
    switch (action.type) {
        case CategoryActions.LOAD_CATEGORIES:
            return action.payload

        default:
            return state
    }
}

export default categories;