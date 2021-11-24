import { CartItem } from "../actions/cart";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

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
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((cartItem: CartItem) => cartItem !== action.payload)
            }
        default:
            return state;
    }
}