import { Dispatch } from "redux";
import { ADD_TO_CART } from "./types";


// ADD ITEM TO CART
export const addToCart = (cartItem) => (dispatch: Dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload: cartItem
    })
}