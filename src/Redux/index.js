import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './Reducers';

const middlewares = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, undefined, composeEnhancers(middlewareEnhancer));
