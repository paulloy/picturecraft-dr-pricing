import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, removeFromCart } from "../../../actions/cart";
import { RootState } from '../../../reducers/index';


export default function Cart() {
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.cart.cart);

    return (
        <div className="fixed z-10 p-5 top-96 border border-black right-0 bg-gray-100 w-screen h-96">
            <h2 className="text-2xl my-4 text-center">Cart</h2>
            <button className="float-right mr-5 bg-gray-300 py-2 px-1">CLOSE CART</button>
            <table className="mx-auto">
                <thead>
                    <tr className="grid grid-cols-9">
                        <th className="border border-black py-1 px-2">Paper Type</th>
                        <th className="border border-black py-1 px-2">Width</th>
                        <th className="border border-black py-1 px-2">Length</th>
                        <th className="border border-black py-1 px-2">Quantity</th>
                        <th className="border border-black py-1 px-2">Net-Total</th>
                        <th className="border border-black py-1 px-2">Discount</th>
                        <th className="border border-black py-1 px-2">VAT</th>
                        <th className="border border-black py-1 px-2">Sub Total</th>
                        <th className="border border-black py-1 px-2 bg-black" />
                    </tr>
                </thead>
                <tbody>
                {
                    cart.length === 0
                    ? null
                    : cart.map((cartItem: CartItem) => (
                        <tr className="grid grid-cols-9">
                            <td className="border border-black py-1 px-2 text-center">{ cartItem.paper }</td>
                            <td className="border border-black py-1 px-2 text-center">{ cartItem.width } { cartItem.unit }</td>
                            <td className="border border-black py-1 px-2 text-center">{ cartItem.length } { cartItem.unit }</td>
                            <td className="border border-black py-1 px-2 text-center">{ cartItem.qty }</td>
                            <td className="border border-black py-1 px-2 text-center">£{ cartItem.netTotal }</td>
                            <td className="text-red-400 border border-black py-1 px-2 text-center">£{ cartItem.discount }</td>
                            <td className="border border-black py-1 px-2 text-center">£{ cartItem.vat }</td>
                            <td className="border border-black py-1 px-2 text-center">£{ cartItem.subTotal }</td>
                            <td className="border border-black py-1 px-2 text-center"><button className="px-2 py-1 text-center bg-red-300 rounded-full" onClick={() => dispatch(removeFromCart(cartItem))}>REMOVE</button></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}