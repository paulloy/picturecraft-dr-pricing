import { combineReducers } from "redux";
import papers from './papers';

export const rootReducer = combineReducers({
    papers
});

export type RootState = ReturnType<typeof rootReducer>