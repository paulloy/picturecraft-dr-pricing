import { combineReducers } from "redux";
import papers from './papers';
import cart from './cart';
import messages from './messages';

export const rootReducer = combineReducers({
    papers,
    cart,
    messages
});

export type RootState = ReturnType<typeof rootReducer>