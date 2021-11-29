import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPapers } from '../../actions/papers';
import { RootState } from '../../reducers';
import { Link } from 'react-router-dom';

// Sub-components
import OrderDetails from './subcomponents/OrderDetails';
import PaperSelector from './subcomponents/PaperSelector';
import ImageDimensions from './subcomponents/ImageDimensions';


// round prices to 2 decimal places
export const roundValue = (value: number) => Math.round(value * 100) / 100;

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

    const [selectedPaper, setSelectedPaper] = useState([]);

    const [totals, setTotals] = useState({
        netTotal: 0,
        vat: 0,
        discountPercentage: 0,
        discount: 0,
        subTotal: 0
    });


    const convert = require('convert-length');

    const calculateTotals = (): void => {
        // return null if no paper is selected
        if (selectedPaper.length === 0) return;

        let { width, length, qty } = lengthInputs;
        // Cost of paper is the price of a 16" x 20" print (includes VAT)
        const standardArea = 16 * 20;
        // cost of selected paper (remove VAT by dividing by 1.2) divided by the standard area
        const costPerUnitArea = (selectedPaper[0].cost / 1.2 ) / standardArea; 

        // if selected, convert cm into inches
        if (lengthUnit === 'cm') {
            width = convert(width, 'cm', 'in');
            length = convert(length, 'cm', 'in');
        }

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

        // Net Total = Product of the image area (width * length) and costPerUnitArea and quantity
        let netTotal = roundValue((width * length) * costPerUnitArea) * qty;
        
        // discount is the product of netTotal & discountPercentage, unless the latter variable is 0
        let discount;
        if (discountPercentage !== 0) {
            discount = roundValue(netTotal * discountPercentage);
        } else {
            discount = 0;
        }
        // USE CHANGE: discountPercentage is multiplied by 100 so it can be displayed on the UI. e.g. 0.2 becomes 20%
        discountPercentage = discountPercentage * 100;

        let vat = roundValue((netTotal - discount) * 0.2);
        let subTotal = (netTotal - discount) + vat;

        setTotals({
            netTotal: netTotal,
            vat: vat,
            discountPercentage: discountPercentage,
            discount: discount,
            subTotal: subTotal
        });
    }

    useEffect(() => {
        calculateTotals();
    }, [selectedPaper, lengthInputs, lengthUnit]);

    return (
        <>
            <div>
                <Link to='settings/papers'>Open Settings</Link>
            </div>
            <div className="grid grid-cols-3 gap-4 p-3 bg-blue-100">
                {/* IMAGE DIMENSIONS */}
                <ImageDimensions 
                    lengthInputs={lengthInputs}
                    lengthUnit={lengthUnit}
                    onLengthChange={(newLengths) => setLengthInputs(newLengths)}
                    onUnitChange={(newUnit) => setLengthUnit(newUnit)}/>
                {/* /IMAGE DIMENSIONS */}
                <PaperSelector 
                    papers={papers}
                    onPaperSelect={(selectedPaper) => setSelectedPaper(selectedPaper)}/>
                <OrderDetails 
                    lengthInputs={lengthInputs} 
                    lengthUnit={lengthUnit} 
                    selectedPaper={selectedPaper} 
                    totals={totals}/>
            </div>
        </>
    );
}