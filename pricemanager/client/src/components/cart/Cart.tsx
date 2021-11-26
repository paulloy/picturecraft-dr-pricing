import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, removeFromCart } from "../../actions/cart";
import { RootState } from '../../reducers/index';


export default function Cart() {
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.cart.cart);

    const [finalTotals, setFinalTotals] = useState({
        netTotal: 0,
        discount: 0,
        vat: 0,
        grandTotal: 0
    });

    useEffect(() => {
        const netTotalsSum = cart.map(obj => obj.netTotal).reduce((prev, next) => prev + next, 0);
        const discountSum = cart.map(obj => obj.discount).reduce((prev, next) => prev + next, 0);
        const vatSum = cart.map(obj => obj.vat).reduce((prev, next) => prev + next, 0);
        const grandTotalSum = cart.map(obj => obj.subTotal).reduce((prev, next) => prev + next, 0);
        setFinalTotals({
            netTotal: netTotalsSum,
            discount: discountSum,
            vat: vatSum,
            grandTotal: grandTotalSum
        });
    }, [cart]);

    return (
        <div className='z-10 p-5 top-0 border border-black right-0 bg-gray-100 w-screen h-screen'>
            <h2 className="text-2xl my-4 text-center">Cart</h2>
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
                    : cart.map((cartItem: CartItem, index: number) => (
                        <tr key={index} className="grid grid-cols-9">
                            <td className="border border-black py-1 px-2 text-center">{ cartItem.paper }</td>
                            <td className="border border-black py-1 px-2 text-center">{ cartItem.width } { cartItem.unit }</td>
                            <td className="border border-black py-1 px-2 text-center">{ cartItem.length } { cartItem.unit }</td>
                            <td className="border border-black py-1 px-2 text-center">{ cartItem.qty }</td>
                            <td className="border border-black py-1 px-2 text-center">£{ cartItem.netTotal.toFixed(2) }</td>
                            <td className="text-red-400 border border-black py-1 px-2 text-center">£{ cartItem.discount.toFixed(2) }</td>
                            <td className="border border-black py-1 px-2 text-center">£{ cartItem.vat.toFixed(2) }</td>
                            <td className="border border-black py-1 px-2 text-center">£{ cartItem.subTotal.toFixed(2) }</td>
                            <td className="border border-black py-1 px-2 text-center"><button className="px-2 py-1 text-center bg-red-300 rounded-full" onClick={() => dispatch(removeFromCart(cartItem))}>REMOVE</button></td>
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
                        <th className="border border-black py-1 px-2 text-center">Σ Net-Total</th>
                        <th className="border border-black py-1 px-2 text-center">Σ Discount</th>
                        <th className="border border-black py-1 px-2 text-center">Σ VAT</th>
                        <th className="border border-black py-1 px-2 text-center">Grand Total</th>
                        <th />
                    </tr>
                    <tr className="grid grid-cols-9">
                        <td />
                        <td />
                        <td />
                        <td />
                        <td className="border border-black py-1 px-2 text-center">£{ finalTotals.netTotal.toFixed(2) }</td>
                        <td className="border border-black py-1 px-2 text-center">- £{ finalTotals.discount.toFixed(2) }</td>
                        <td className="border border-black py-1 px-2 text-center">£{ finalTotals.vat.toFixed(2) }</td>
                        <td className="border border-black py-1 px-2 text-center">£{ finalTotals.grandTotal.toFixed(2) }</td>
                        <td/>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}