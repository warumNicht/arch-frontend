

const initialSelectedCategoriesState: {loadedCategories: string[]} = {loadedCategories: []};

function selectedCategories(state = initialSelectedCategoriesState, action: any) {
    switch (action.type) {
        case 'Cat':
            return action.payload
        default:
            return state
    }
}

export default selectedCategories;