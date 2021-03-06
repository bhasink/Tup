import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from "./reducers/RootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
RootReducer,
applyMiddleware(thunk),
composeWithDevTools()
);