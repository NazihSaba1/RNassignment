import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {userReducer, articlesReducer} from './reducers';

const rootReducer = combineReducers({userReducer, articlesReducer});

export const store = createStore(rootReducer, applyMiddleware(thunk));
