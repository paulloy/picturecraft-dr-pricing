import React from 'react';

export default function OrderDetails({ lengthInputs, lengthUnit, selectedPaper, totals }) {
    let { width, length, qty } = lengthInputs;
    
    return (
        <div className="border border-black rounded-lg p-3 flex flex-col items-center">
                <table>
                    <tbody>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Width</td>
                            <td className="text-left">{ width } { lengthUnit }</td>
                        </tr>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Length</td>
                            <td className="text-left">{ length } { lengthUnit }</td>
                        </tr>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Paper Type</td>
                            <td className="text-left">{ selectedPaper.length === 0 ? 'Please select a paper' : selectedPaper[0].name }</td>
                        </tr>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Quantity</td>
                            <td className="text-left">{ qty }</td>
                        </tr>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Net Total</td>
                            <td className="text-left">£{ totals.netTotal.toFixed(2) }</td>
                        </tr>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Discount</td>
                            <td className="text-left text-red-600"><span className="mr-2">{ totals.discountPercentage }%</span>- £{ totals.discount.toFixed(2) }</td>
                        </tr>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">VAT</td>
                            <td className="text-left">£{ totals.vat.toFixed(2) }</td>
                        </tr>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Sub Total</td>
                            <td className="text-left">£{ totals.subTotal.toFixed(2) }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    );
}