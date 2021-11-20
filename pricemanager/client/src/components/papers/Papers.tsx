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
        length: 0
    });

    return (
        <>
            {/* IMAGE DIMENSIONS */}
            <div className="flex flex-col items-center p-5 border border-black">
                <select 
                    defaultValue="inches" 
                    className="block mb-3 border border-black" 
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setLengthUnit(e.target.value);
                            setLengthInputs({ width: 0, length: 0 });
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
            </div>
            {/* /IMAGE DIMENSIONS */}
            <select defaultValue="">
                <option disabled value="">Please select a paper</option>
                { papers.map((paper: PaperType) => (
                    <option key={paper.id} value={paper.name}>{paper.name}</option>
                )) }
            </select>
        </>
    );
}