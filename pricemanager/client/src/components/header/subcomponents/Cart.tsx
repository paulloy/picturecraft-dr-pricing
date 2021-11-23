import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../reducers/index';

export default function Cart() {
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.cart.cart);

    return (
        <div className="fixed z-10 top-96 right-0 bg-gray-200 w-screen h-96">
            <h2>Cart</h2>
            <table>
                <thead>
                    <tr className="grid grid-cols-8 gap-4">
                        <th>Paper Type</th>
                        <th>Width</th>
                        <th>Length</th>
                        <th>Quantity</th>
                        <th>Net-Total</th>
                        <th>Discount</th>
                        <th>VAT</th>
                        <th>Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cart.length === 0
                    ? null
                    : cart.map(cartItem => (
                        <tr className="grid grid-cols-8 gap-4">
                            <td>{ cartItem.paper }</td>
                            <td>{ cartItem.width } { cartItem.unit }</td>
                            <td>{ cartItem.length } { cartItem.unit }</td>
                            <td>{ cartItem.qty }</td>
                            <td>£{ cartItem.netTotal }</td>
                            <td className="text-red-400">£{ cartItem.discount }</td>
                            <td>£{ cartItem.vat }</td>
                            <td>£{ cartItem.subTotal }</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}