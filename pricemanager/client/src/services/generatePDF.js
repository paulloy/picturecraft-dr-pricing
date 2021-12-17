import jsPDF from "jspdf";
import React from 'react';
import { renderToString } from "react-dom/server";
import html2canvas from "html2canvas";

export default function generatePDF(cart, finalTotals) {
    const template = (
        <table id="displayAsPdf" className="mx-auto mb-5">
                <thead>
                    <tr className="grid grid-cols-9 bg-gray-100">
                        <th className="border border-black py-2 px-4">Paper Type</th>
                        <th className="border border-black py-2 px-4">Width</th>
                        <th className="border border-black py-2 px-4">Length</th>
                        <th className="border border-black py-2 px-4">Quantity</th>
                        <th className="border border-black py-2 px-4">Net-Total</th>
                        <th className="border border-black py-2 px-4">Discount</th>
                        <th className="border border-black py-2 px-4">VAT</th>
                        <th className="border border-black py-2 px-4">Sub Total</th>
                        <th className="border border-black py-2 px-4 bg-black" />
                    </tr>
                </thead>
                <tbody>
                {
                    cart.length === 0
                    ? null
                    : cart.map((cartItem, index) => (
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
    );

    const el = document.createElement('div');
    el.id = 'displayAsPdf';

    let options = {
        orientation: 'landscape',
        format: 'a4'
    }

    const displayAsPdf = document.getElementById('displayAsPdf');

    html2canvas(displayAsPdf)
        .then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF(options);
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('download.pdf');
        });   
}