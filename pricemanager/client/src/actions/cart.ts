import { Dispatch } from "redux";
import { createMessage } from "./messages";
import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export interface CartItem {
    width: number;
    length: number,
    qty: number;
    unit: string;
    paper: string;
    netTotal: number;
    discount: number;
    vat: number;
    subTotal: number;
}

// ADD ITEM TO CART
export const addToCart = (cartItem: CartItem) => (dispatch: Dispatch) => {
    dispatch(createMessage({ success: `${cartItem.paper} | (${cartItem.width} x ${cartItem.length}) ${cartItem.unit} | Quantity: ${cartItem.qty} | Added to cart` }));
    dispatch({
        type: ADD_TO_CART,
        payload: cartItem
    });
}

// REMOVE ITEM FROM CART
export const removeFromCart = (cartItem: CartItem) => (dispatch: Dispatch) => {
    dispatch(createMessage({ success: `${cartItem.paper} | (${cartItem.width} x ${cartItem.length}) ${cartItem.unit} | Quantity: ${cartItem.qty} | Removed from cart` }));
    dispatch({
        type: REMOVE_FROM_CART,
        payload: cartItem
    });
}