import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPapers } from '../../actions/papers';
import { RootState } from '../../reducers';

// types interface for paper objects
interface PaperType {
    id: number;
    name: string;
    cost: number;
}

export default function Papers() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPapers());
    }, []);
    
    const papers = useSelector((state: RootState) => state.papers.papers);
    
    const [lengthUnit, setLengthUnit] = useState('inches');
    const [lengthInputs, setLengthInputs] = useState({
        width: 0,
        length: 0,
        qty: 1
    });

    const [selectedPaper, setSelectedPaper] = useState('');

    const [totals, setTotals] = useState({
        netTotal: 0,
        vat: 0,
        discountPercentage: 0,
        discount: 0,
        subTotal: 0,
        total: 0
    });

    const convert = require('convert-length');

    const calculateTotals = () => {
        // return null if no paper is selected
        if (selectedPaper.length === 0) return null;

        let { width, length, qty } = lengthInputs;
        // Cost of paper is the price of a 16" x 20" print
        const standardArea = 16 * 20;
        const costPerUnitArea = (selectedPaper[0].cost / 1.2 ) / standardArea; 

        let discountPercentage;
        // Discount is dependant on quantity
        if (qty >= 50) {
            discountPercentage = 0.2
        } else if (qty >= 20) {
            discountPercentage = 0.1;
        } else if (qty >= 10) {
            discountPercentage = 0.05;
        } else {
            discountPercentage = 0;
        }

        // if selected, convert cm into inches
        if (lengthUnit === 'cm') {
            width = convert(width, 'cm', 'in');
            length = convert(length, 'cm', 'in');
        }

        // Net Total = Product of the image area (width * length) and costPerUnitArea and quantity
        let netTotal = (Math.round(((width * length) * costPerUnitArea) * 100) / 100) * qty;

        
        let discount;
        if (discountPercentage !== 0) {
            discount = Math.round((netTotal * discountPercentage) * 100) / 100;
        } else {
            discount = 0;
        }
        discountPercentage = discountPercentage * 100;

        let vat = Math.round(((netTotal - discount) * 0.2) * 100) / 100;
        let subTotal = (netTotal - discount) + vat;
        let total = subTotal;

        setTotals({
            netTotal: netTotal,
            vat: vat,
            discountPercentage: discountPercentage,
            discount: discount,
            subTotal: subTotal,
            total: total
        });
    }

    useEffect(() => {
        calculateTotals();
    }, [selectedPaper, lengthInputs, lengthUnit]);

    return (
        <>
            {/* IMAGE DIMENSIONS */}
            <div className="flex flex-col items-center p-5 border border-black">
                <select 
                    defaultValue="inches" 
                    className="block mb-3 border border-black" 
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setLengthUnit(e.target.value);
                            setLengthInputs({ width: 0, length: 0,  qty: 1 });
                        }}>
                    <option value="inches">inches</option>
                    <option value="cm">cm</option>
                </select>
                <span className="block mb-3 p-3 border border-black">
                    <label>Width</label>
                    <input 
                        className="border ml-3 border-black text-right" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        max="1000" 
                        value={ lengthInputs.width }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => setLengthInputs({ ...lengthInputs, width: e.target.valueAsNumber }) }
                        onBlur={ (e: FocusEvent<HTMLInputElement>) => setLengthInputs({ ...lengthInputs, width: ((Math.round(e.target.valueAsNumber * 100)) / 100) }) }/>
                    <span className="ml-3">{ lengthUnit }</span>
                </span>
                <span className="block mb-3 p-3 border border-black">
                    <label>Length</label>
                    <input 
                        className="border ml-3 border-black text-right" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        max="1000" 
                        value={ lengthInputs.length }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => setLengthInputs({ ...lengthInputs, length: e.target.valueAsNumber }) }
                        onBlur={ (e: FocusEvent<HTMLInputElement>) => setLengthInputs({ ...lengthInputs, length: ((Math.round(e.target.valueAsNumber * 100)) / 100) }) }/>
                    <span className="ml-3">{ lengthUnit }</span>
                </span>
                <span className="block mb-3 p-3 border border-black">
                    <label>Quantity</label>
                    <input 
                        className="border ml-3 border-black text-right" 
                        type="number" 
                        step="1" 
                        min="1" 
                        max="1000" 
                        value={ lengthInputs.qty }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => setLengthInputs({ ...lengthInputs, qty: e.target.valueAsNumber }) }
                        onBlur={ (e: FocusEvent<HTMLInputElement>) => setLengthInputs({ ...lengthInputs, qty: Math.round(e.target.valueAsNumber) }) }/>
                </span>
            </div>
            {/* /IMAGE DIMENSIONS */}
            {/* PAPER SELECTOR */}
            <div className="border border-black p-3 flex flex-col items-center">
                <select defaultValue="" className="border border-black mt-2" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedPaper(papers.filter((paper: PaperType) => paper.name === e.target.value))}>
                    <option disabled value="">Please select a paper</option>
                    { papers.map((paper: PaperType) => (
                        <option key={paper.id} value={paper.name}>{paper.name}</option>
                        )) }
                </select>
            </div>
            {/* /PAPER SELECTOR */}
            {/* ORDER DETAILS */}
            <div className="border border-black p-3 flex flex-col items-center">
                <table>
                    <tbody>
                        <tr>
                            <td>Width</td>
                            <td>{ lengthInputs.width } { lengthUnit }</td>
                        </tr>
                        <tr>
                            <td>Length</td>
                            <td>{ lengthInputs.length } { lengthUnit }</td>
                        </tr>
                        <tr>
                            <td>Paper Type</td>
                            <td>{ selectedPaper.length === 0 ? 'Please select a paper' : selectedPaper[0].name }</td>
                        </tr>
                        <tr>
                            <td>Quantity</td>
                            <td>{ lengthInputs.qty }</td>
                        </tr>
                        <tr>
                            <td>Net Total</td>
                            <td>£{ totals.netTotal.toFixed(2) }</td>
                        </tr>
                        <tr>
                            <td>VAT</td>
                            <td>£{ totals.vat.toFixed(2) }</td>
                        </tr>
                        <tr>
                            <td>Discount</td>
                            <td><span className="text-red-600 mr-2">{ totals.discountPercentage }%</span>£{ totals.discount.toFixed(2) }</td>
                        </tr>
                        <tr>
                            <td>Sub Total</td>
                            <td>£{ totals.subTotal.toFixed(2) }</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>£{ totals.total.toFixed(2) }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* /ORDER DETAILS */}
        </>
    );
}