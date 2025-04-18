import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { loadingReducer } from './reducer/loading';
import { noteReducer } from './reducer/noteCrud'

const reducer = combineReducers({
    loading: loadingReducer,
    note: noteReducer
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store;
