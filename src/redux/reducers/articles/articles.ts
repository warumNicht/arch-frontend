
import { Article } from '../../interfaces/ArchitectureAppStore';

const initialArticlesState: Article[] = [];

function articles(state = initialArticlesState, action: any) {
    switch (action.type) {
        case 'Articles':
            return action.payload
        default:
            return state
    }
}

export default articles;