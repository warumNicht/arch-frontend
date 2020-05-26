import { createStore } from 'redux';
import mainReducer from '../redux/reducers';

const store = createStore(mainReducer);

export default store;