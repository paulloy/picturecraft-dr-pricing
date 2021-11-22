import { ADD_TO_CART } from "../actions/types";


const initalState: any = {
    cart: []
}

export default function(state = initalState, action) {
    switch(action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        default:
            return state;
    }
}