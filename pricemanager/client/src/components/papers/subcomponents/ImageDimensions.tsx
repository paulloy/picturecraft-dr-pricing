import React, { ChangeEvent, FocusEvent } from 'react';
import { roundValue } from '../Papers';

export default function ImageDimensions({ lengthInputs, lengthUnit, onLengthChange = f => f, onUnitChange = f => f }) {
    let { width, length, qty } = lengthInputs;

    return (
        <div className="flex flex-col items-center p-5 border border-black rounded-lg">
            <select 
                className="block mb-3 border border-black w-full p-3 text-center" 
                defaultValue="inches" 
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        onUnitChange(e.target.value);
                        onLengthChange({ width: 0, length: 0,  qty: 1 });
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
                    value={ width }
                    onChange={ (e: ChangeEvent<HTMLInputElement>) => onLengthChange({ ...lengthInputs, width: e.target.valueAsNumber }) }
                    onBlur={ (e: FocusEvent<HTMLInputElement>) => onLengthChange({ ...lengthInputs, width: roundValue(e.target.valueAsNumber) }) }/>
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
                    value={ length }
                    onChange={ (e: ChangeEvent<HTMLInputElement>) => onLengthChange({ ...lengthInputs, length: e.target.valueAsNumber }) }
                    onBlur={ (e: FocusEvent<HTMLInputElement>) => onLengthChange({ ...lengthInputs, length: roundValue(e.target.valueAsNumber) }) }/>
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
                    value={ qty }
                    onChange={ (e: ChangeEvent<HTMLInputElement>) => onLengthChange({ ...lengthInputs, qty: e.target.valueAsNumber }) }
                    onBlur={ (e: FocusEvent<HTMLInputElement>) => onLengthChange({ ...lengthInputs, qty: Math.round(e.target.valueAsNumber) }) }/>
            </span>
        </div>
    );
}