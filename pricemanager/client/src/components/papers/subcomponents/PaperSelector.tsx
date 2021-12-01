import React, { ChangeEvent } from 'react';
import { PaperType } from '../types/types';

export default function PaperSelector({ papers, onPaperSelect = f => f }) {
    return (
        <div className="flex flex-col border-gray-500 border-2 items-center p-5 bg-green-50 rounded-lg">
            <h2 className='font-serif text-2xl w-full h-12 text-center py-2'>Step 2 - Your Paper</h2>
            <hr className='border-t-2 border-gray-500 w-full mb-5' />
            <select defaultValue="" className="block border border-black w-full text-lg p-3 text-center" onChange={(e: ChangeEvent<HTMLSelectElement>) => onPaperSelect(papers.filter((paper: PaperType) => paper.name === e.target.value))}>
                <option disabled value="">Please select a paper</option>
                { papers.map((paper: PaperType) => (
                    <option key={paper.id} value={paper.name}>{paper.name}</option>
                    )) }
            </select>
        </div>
    );
}