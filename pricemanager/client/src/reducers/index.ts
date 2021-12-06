import { combineReducers } from "redux";
import papers from './papers';
import cart from './cart';
import messages from './messages';
import auth from './auth';

export const rootReducer = combineReducers({
    papers,
    cart,
    messages,
    auth
});

export type RootState = ReturnType<typeof rootReducer>