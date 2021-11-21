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
        <div className="grid grid-cols-3 gap-4 p-3 bg-blue-100">
            {/* IMAGE DIMENSIONS */}
            <div className="flex flex-col items-center p-5 border border-black rounded-lg">
                <select 
                    className="block mb-3 border border-black w-full p-3 text-center" 
                    defaultValue="inches" 
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setLengthUnit(e.target.value);
                            setLengthInputs({ width: 0, length: 0,  qty: 1 });
                        }}>
                    <option value="inches">inches</option>
                    <option value="cm">cm</option>
                </select>
                <span className="block mb-3 p-3 grid grid-cols-3 w-full">
                    <label className="justify-end flex items-center pr-3">Width</label>
                    <input 
                        className="border border-black text-right py-1.5" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        max="1000" 
                        value={ lengthInputs.width }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => setLengthInputs({ ...lengthInputs, width: e.target.valueAsNumber }) }
                        onBlur={ (e: FocusEvent<HTMLInputElement>) => setLengthInputs({ ...lengthInputs, width: ((Math.round(e.target.valueAsNumber * 100)) / 100) }) }/>
                    <span className="text-left flex items-center justify-start pl-3">{ lengthUnit }</span>
                </span>
                <span className="block mb-3 p-3 grid grid-cols-3 w-full">
                    <label className="justify-end flex items-center pr-3">Length</label>
                    <input 
                        className="border border-black text-right py-1.5" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        max="1000" 
                        value={ lengthInputs.length }
                        onChange={ (e: ChangeEvent<HTMLInputElement>) => setLengthInputs({ ...lengthInputs, length: e.target.valueAsNumber }) }
                        onBlur={ (e: FocusEvent<HTMLInputElement>) => setLengthInputs({ ...lengthInputs, length: ((Math.round(e.target.valueAsNumber * 100)) / 100) }) }/>
                    <span className="text-left flex items-center justify-start pl-3">{ lengthUnit }</span>
                </span>
                <span className="block mb-3 p-3 w-full grid grid-cols-2">
                    <label className="justify-center flex items-center pr-3">Quantity</label>
                    <input 
                        className="border border-black text-right py-1.5" 
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
            <div className="border border-black p-3 flex rounded-lg flex-col items-center">
                <select defaultValue="" className="block border border-black w-full p-3 text-center" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedPaper(papers.filter((paper: PaperType) => paper.name === e.target.value))}>
                    <option disabled value="">Please select a paper</option>
                    { papers.map((paper: PaperType) => (
                        <option key={paper.id} value={paper.name}>{paper.name}</option>
                        )) }
                </select>
            </div>
            {/* /PAPER SELECTOR */}
            {/* ORDER DETAILS */}
            <div className="border border-black rounded-lg p-3 flex flex-col items-center">
                <table>
                    <tbody>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Width</td>
                            <td className="text-left">{ lengthInputs.width } { lengthUnit }</td>
                        </tr>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Length</td>
                            <td className="text-left">{ lengthInputs.length } { lengthUnit }</td>
                        </tr>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Paper Type</td>
                            <td className="text-left">{ selectedPaper.length === 0 ? 'Please select a paper' : selectedPaper[0].name }</td>
                        </tr>
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Quantity</td>
                            <td className="text-left">{ lengthInputs.qty }</td>
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
                        <tr className="grid grid-cols-2 gap-4">
                            <td className="text-right">Total</td>
                            <td className="text-left">£{ totals.total.toFixed(2) }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* /ORDER DETAILS */}
        </div>
    );
}