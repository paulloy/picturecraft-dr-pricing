import React, { ChangeEvent, FocusEvent, MouseEvent } from 'react';
import { roundValue } from '../../../services/roundValue';
import { LengthInputs } from '../types/types';

export default function ImageDimensions({ 
    lengthInputs, 
    lengthUnit, 
    onLengthChange = (f: LengthInputs) => f,
    onUnitChange = (f: string) => f 
}: {
    lengthInputs: LengthInputs;
    lengthUnit: string;
    onLengthChange: any;
    onUnitChange: any;
}) {

    let { width, length, qty } = lengthInputs;

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onLengthChange({
            ...lengthInputs,
            [e.target.name]: e.target.valueAsNumber
        });
    }

    const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {   
        // qty is rounded to nearest integer
        if (e.target.name === 'qty') {              
            onLengthChange({
                ...lengthInputs,
                [e.target.name]: Math.round(e.target.valueAsNumber)
            });
        // other inputs are rounded to nearest 2 decimal places
        } else {
            onLengthChange({
                ...lengthInputs,
                [e.target.name]: roundValue(e.target.valueAsNumber)
            });
        }     
    }

    return (
        <div className="flex flex-col border-gray-500 border-2 items-center p-5 bg-blue-100 rounded-lg">
            <h2 className='font-sansSerif text-2xl w-full font-medium h-12 text-center py-2'>Image Dimensions</h2>
            <hr className='border-t-2 border-gray-500 w-full mb-5' />
            <select 
                className="block focus:ring-4 border-2 cursor-pointer border-blue rounded-lg text-lg w-full p-3 text-center" 
                defaultValue="inches" 
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        onUnitChange(e.target.value);
                        onLengthChange({ width: 0, length: 0,  qty: 1 });
                    }}>
                <option value="inches">inches</option>
                <option value="cm">cm</option>
            </select>
            <hr className='border-t-2 border-gray-500 w-full my-5' />
            <span className="block mb-1 p-3 flex flex-row justify-center w-full">
                <label className="justify-end flex items-center pr-3 text-lg font-semibold">Width</label>
                <input 
                    className="border-2 focus:ring-4 border-blue rounded-lg text-right w-48 py-1.5 text-lg" 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    max="1000" 
                    name='width'
                    value={ width }
                    onChange={ e => onInputChange(e) }
                    onBlur={ e => onInputBlur(e) }/>
                <span className="text-left flex items-center justify-start pl-3 text-lg">{ lengthUnit }</span>
            </span>
            <span className="block mb-3 p-3 flex flex-row justify-center w-full">
                <label className="justify-end flex items-center pr-3 text-lg font-semibold">Length</label>
                <input 
                    className="border-2 focus:ring-4 border-blue rounded-lg text-right w-48 py-1.5 text-lg" 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    max="1000" 
                    name='length'
                    value={ length }
                    onChange={ e => onInputChange(e) }
                    onBlur={ e => onInputBlur(e) }/>
                <span className="text-left flex items-center justify-start pl-3 text-lg">{ lengthUnit }</span>
            </span>
            <hr className='border-t-2 border-gray-500 w-full my-5' />
            <span className="block mb-3 p-3 w-full grid grid-cols-2">
                <label className="justify-center flex items-center pr-3 font-semibold text-lg">Quantity</label>
                <span className='flex flex-row'>
                    <button 
                        className='bg-gray-500 focus:ring-4 p-3 text-white h-12 w-12 rounded-l-lg'
                        onClick={(e: MouseEvent<HTMLButtonElement>) => lengthInputs.qty >= 2 ? onLengthChange({ ...lengthInputs, qty: lengthInputs.qty - 1 }) : onLengthChange({ ...lengthInputs, qty: 1 })}><i className="fas fa-chevron-left"></i></button>
                    <input 
                        className="py-1.5 focus:ring-4 h-12 text-center border-2 border-blue text-lg" 
                        type="number" 
                        step="1" 
                        min="1" 
                        max="1000" 
                        name='qty'
                        value={ qty }
                        onChange={ e => onInputChange(e) }
                        onBlur={ e => onInputBlur(e) }/>        
                    <button 
                        className='bg-gray-500 focus:ring-4 p-3 text-white h-12 w-12 rounded-r-lg'
                        onClick={(e: MouseEvent<HTMLButtonElement>) => lengthInputs.qty <= 999 ? onLengthChange({ ...lengthInputs, qty: lengthInputs.qty + 1 }) : onLengthChange({ ...lengthInputs, qty: 1000 })}><i className="fas fa-chevron-right"></i></button>            
                </span>
            </span>
        </div>
    );
}