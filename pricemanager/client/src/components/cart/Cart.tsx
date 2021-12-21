import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, removeFromCart } from "../../actions/cart";
import { RootState } from '../../reducers/index';
import generatePDF from "../../services/generatePDF";


export default function Cart() {
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.cart.cart);

    const [finalTotals, setFinalTotals] = useState({
        netTotal: 0,
        discount: 0,
        vat: 0,
        grandTotal: 0
    });

    const cartSum = (cartProp: string) => {
        return cart.map((obj: CartItem) => obj[cartProp]).reduce((prev: number, next: number) => prev + next, 0);
    }

    useEffect(() => {
        setFinalTotals({
            netTotal: cartSum('netTotal'),
            discount: cartSum('discount'),
            vat: cartSum('vat'),
            grandTotal: cartSum('subTotal')
        });
    }, [cart]);

    return (
        <div id="displayAsPdf" className='z-10 p-5 z-10 relative top-0 border border-black right-0 bg-blue-100'>
            <h2 className="text-3xl mt-4 mb-8 text-center">Cart</h2>
            <table className="mx-auto mb-5">
                <thead>
                    <tr className="grid grid-cols-9">
                        <th className="border border-black py-2 bg-gray-100 px-4">Paper Type</th>
                        <th className="border border-black py-2 bg-gray-100 px-4">Width</th>
                        <th className="border border-black py-2 bg-gray-100 px-4">Length</th>
                        <th className="border border-black py-2 bg-gray-100 px-4">Quantity</th>
                        <th className="border border-black py-2 bg-gray-100 px-4">Net-Total</th>
                        <th className="border border-black py-2 bg-gray-100 px-4">Discount</th>
                        <th className="border border-black py-2 bg-gray-100 px-4">VAT</th>
                        <th className="border border-black py-2 bg-gray-100 px-4">Sub Total</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                {
                    cart.length === 0
                    ? null
                    : cart.map((cartItem: CartItem, index: number) => (
                        <tr key={index} className="grid grid-cols-9 bg-white">
                            <td className="border border-black py-2 px-4 text-center">{ cartItem.paper }</td>
                            <td className="border border-black py-2 px-4 text-center">{ cartItem.width } { cartItem.unit }</td>
                            <td className="border border-black py-2 px-4 text-center">{ cartItem.length } { cartItem.unit }</td>
                            <td className="border border-black py-2 px-4 text-center">{ cartItem.qty }</td>
                            <td className="border border-black py-2 px-4 text-center">£{ cartItem.netTotal.toFixed(2) }</td>
                            <td className="text-red-400 border border-black py-2 px-4 text-center">£{ cartItem.discount.toFixed(2) }</td>
                            <td className="border border-black py-2 px-4 text-center">£{ cartItem.vat.toFixed(2) }</td>
                            <td className="border border-black py-2 px-4 text-center">£{ cartItem.subTotal.toFixed(2) }</td>
                            <td className="border border-black py-2 px-4 text-center"><button className="px-4 py-2 text-center bg-red-300" onClick={() => dispatch(removeFromCart(cartItem))}>REMOVE</button></td>
                        </tr>
                    ))
                }
                </tbody>
                <tfoot>
                    <tr className="grid grid-cols-9">
                        <td />
                        <td />
                        <td />
                        <td />
                        <th className="border border-black py-2 px-4 bg-gray-100 text-center">Σ Net-Total</th>
                        <th className="border border-black py-2 px-4 bg-gray-100 text-center">Σ Discount</th>
                        <th className="border border-black py-2 px-4 bg-gray-100 text-center">Σ VAT</th>
                        <th className="border border-black py-2 px-4 bg-gray-100 text-center">Grand Total</th>
                        <th />
                    </tr>
                    <tr className="grid grid-cols-9">
                        <td />
                        <td />
                        <td />
                        <td />
                        <td className="border border-black py-2 px-4 bg-white text-center">£{ finalTotals.netTotal.toFixed(2) }</td>
                        <td className="border border-black py-2 px-4 bg-white text-center">- £{ finalTotals.discount.toFixed(2) }</td>
                        <td className="border border-black py-2 px-4 bg-white text-center">£{ finalTotals.vat.toFixed(2) }</td>
                        <td className="border border-black py-2 px-4 bg-white text-center">£{ finalTotals.grandTotal.toFixed(2) }</td>
                        <td/>
                    </tr>
                </tfoot>
            </table>
            <button onClick={() => generatePDF(cart, finalTotals)}>Download PDF</button>
            
        </div>
    );
}