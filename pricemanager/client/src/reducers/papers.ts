import { GET_PAPERS } from "../actions/types";

interface Action { 
    type: string, 
    payload: { id: number, name: string, cost: number }
}

const initalState: any = {
    papers: []
}

export default function(state = initalState, action: Action) {
    switch(action.type) {
        case GET_PAPERS:
            return {
                ...state,
                papers: action.payload
            }
        default:
            return state;
    }
}