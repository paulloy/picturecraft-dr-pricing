import React, { ChangeEvent } from 'react';
import { PaperType } from '../types/types';

export default function PaperSelector({ papers, onPaperSelect = (f: PaperType[]) => f }) {
    return (
        <div className="border border-black p-3 flex rounded-lg flex-col items-center">
            <select defaultValue="" className="block border border-black w-full p-3 text-center" onChange={(e: ChangeEvent<HTMLSelectElement>) => onPaperSelect(papers.filter((paper: PaperType) => paper.name === e.target.value))}>
                <option disabled value="">Please select a paper</option>
                { papers.map((paper: PaperType) => (
                    <option key={paper.id} value={paper.name}>{paper.name}</option>
                    )) }
            </select>
        </div>
    );
}