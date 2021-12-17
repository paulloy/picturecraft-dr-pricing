import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPapers } from '../../actions/papers';
import { RootState } from '../../reducers';
import { Link } from 'react-router-dom';

import './papers.css';

// Sub-components
import OrderDetails from './subcomponents/OrderDetails';
import PaperSelector from './subcomponents/PaperSelector';
import ImageDimensions from './subcomponents/ImageDimensions';

// services
import { calculateTotals } from '../../services/calculateTotal';


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


    useEffect(() => {
        const calculatedTotals = calculateTotals(selectedPaper, lengthInputs, lengthUnit);
        setTotals(calculatedTotals);
    }, [selectedPaper, lengthInputs, lengthUnit]);

    return (
        <div className='z-10 relative'>
            <div className='mt-5 flex flex-row justify-end'>
                <span className='bg-gray-100 py-2 px-4 mr-5 cursor-pointer text-lg border-2 border-gray-500 rounded-lg'>
                    <Link to='settings/papers'>Open Settings</Link>
                </span>
            </div>
            <div className="grid grid-cols-3 gap-5 p-5">
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
        </div>
    );
}