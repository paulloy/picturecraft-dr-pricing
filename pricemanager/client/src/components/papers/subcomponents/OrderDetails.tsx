import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../actions/cart';
import { createMessage } from '../../../actions/messages';
import { RootState } from '../../../reducers';
import { LengthInputs, PaperType, Totals } from '../types/types';

interface Props {
    lengthInputs: LengthInputs;
    lengthUnit: string;
    selectedPaper: PaperType[];
    totals: Totals;
}

export default function OrderDetails({ lengthInputs, lengthUnit, selectedPaper, totals }: Props) {
    let { width, length, qty } = lengthInputs;

    const dispatch = useDispatch();

    const order = {
        width: width,
        length: length,
        qty: qty,
        unit: lengthUnit,
        paper: selectedPaper.length === 0 ? 'Please select a paper' : selectedPaper[0].name,
        netTotal: totals.netTotal,
        discount: totals.discount,
        vat: totals.vat,
        subTotal: totals.subTotal
    }

    const handleAddToCart = () => {
        if (totals.subTotal == 0) {
            // handle errors here
            dispatch(createMessage({ error: 'Please enter a valid Order' }));
            return;
        }
        dispatch(addToCart(order));
    }
    
    return (
        <div className="flex flex-col relative border-gray-500 border-2 items-center p-5 bg-blue-100 rounded-lg">
            <h2 className='font-sansSerif font-medium text-2xl w-full h-12 text-center py-2'>Order Details</h2>
            <hr className='border-t-2 border-gray-500 w-full mb-5' />
            <table className='text-lg'>
                <tbody>
                    <tr className="grid grid-cols-2 gap-4">
                        <td className="text-right font-semibold">Width</td>
                        <td className="text-left">{ width } { lengthUnit }</td>
                    </tr>
                    <tr className="grid grid-cols-2 gap-4">
                        <td className="text-right font-semibold">Length</td>
                        <td className="text-left">{ length } { lengthUnit }</td>
                    </tr>
                    <tr className="grid grid-cols-2 gap-4">
                        <td className="text-right font-semibold">Paper Type</td>
                        <td className="text-left">{ selectedPaper.length === 0 ? <span className='text-red-600'>'Please select a paper'</span> : selectedPaper[0].name }</td>
                    </tr>
                    <tr className="grid grid-cols-2 gap-4 pb-5">
                        <td className="text-right font-semibold">Quantity</td>
                        <td className="text-left">{ qty }</td>
                    </tr>
                    <tr className="border-2 border-gray-500"/>
                    <tr className="grid grid-cols-2 gap-4 pt-5">
                        <td className="text-right font-semibold">Net Total</td>
                        <td className="text-left">£{ totals.netTotal.toFixed(2) }</td>
                    </tr>
                    <tr className="grid grid-cols-2 gap-4">
                        <td className="text-right font-semibold">Discount</td>
                        <td className="text-left"><span className="mr-2">{ totals.discountPercentage }%</span>- £{ totals.discount.toFixed(2) }</td>
                    </tr>
                    <tr className="grid grid-cols-2 gap-4">
                        <td className="text-right font-semibold">VAT</td>
                        <td className="text-left">£{ totals.vat.toFixed(2) }</td>
                    </tr>
                    <tr className="grid grid-cols-2 gap-4">
                        <td className="text-right font-semibold">Sub Total</td>
                        <td className="text-left">£{ totals.subTotal.toFixed(2) }</td>
                    </tr>
                </tbody>
            </table>
            <hr className='border-t-2 border-gray-500 w-full my-5' />
            <button className="bg-blue-300 hover:bg-blue-400 rounded-lg p-2 absolute bottom-5 w-64 text-lg" onClick={() => handleAddToCart()}>Add To Cart</button>
        </div>
    );
}