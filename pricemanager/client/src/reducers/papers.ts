import { GET_PAPERS } from "../actions/types";

const initalState = {
    papers: []
}

export default function(state = initalState, action) {
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