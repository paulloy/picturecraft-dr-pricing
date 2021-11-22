import { combineReducers } from "redux";
import papers from './papers';
import cart from './cart';

export const rootReducer = combineReducers({
    papers,
    cart
});

export type RootState = ReturnType<typeof rootReducer>