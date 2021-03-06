import { ADD_PAPER, DELETE_PAPER, GET_PAPERS, UPDATE_PAPER } from "../actions/types";
import { PaperType } from "../components/papers/types/types";

interface Action { 
    type: string;
    payload: { id: number, name: string, cost: number };
}

const initalState: any = {
    papers: []
}

export default function(state = initalState, action: any) {
    switch(action.type) {
        case GET_PAPERS:
            return {
                ...state,
                papers: action.payload
            }
        case DELETE_PAPER:
            return {
                ...state,
                papers: state.papers.filter((paper: PaperType) => paper.id !== action.payload)
            }
        case ADD_PAPER:
            return {
                ...state,
                papers: [...state.papers, action.payload]
            }
        case UPDATE_PAPER:
            const i = state.papers.findIndex((paper: PaperType) => paper.id === action.payload.id);
            const newArr = [...state.papers];
            newArr[i] = action.payload;
            return {
                ...state,
                papers: newArr
            }
        default:
            return state;
    }
}