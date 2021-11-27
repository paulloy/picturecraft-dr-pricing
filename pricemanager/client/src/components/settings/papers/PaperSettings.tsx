import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePaper } from '../../../actions/papers';
import { RootState } from '../../../reducers';
import { PaperType } from '../../papers/types/types';

export default function PaperSettings() {
    const dispatch = useDispatch();

    const papers = useSelector((state: RootState) => state.papers.papers);

    return (
        <table className='border border-black w-screen'>
            <thead>
                <tr className='grid grid-cols-4'>
                    <th>Name</th>
                    <th>Cost of a 20" x 16" print (£ GBP)</th>
                    <th />
                    <th />
                </tr>
            </thead>
            <tbody>
                <tr className="grid grid-cols-4">
                    { papers.map((paper: PaperType) => (
                        <>
                            <td className='text-center'>{ paper.name }</td>
                            <td className='text-center'>{ paper.cost }</td>
                            <td className='text-center'><button className='py-1 px-2 bg-blue-300'>UPDATE</button></td>
                            <td className='text-center'><button onClick={() => dispatch(deletePaper(paper.id))} className='py-1 px-2 bg-red-300'>DELETE</button></td>
                        </>
                    )) }
                </tr>
            </tbody>
        </table>
    );
}