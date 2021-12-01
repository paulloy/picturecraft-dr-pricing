import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPaper, deletePaper, updatePaper } from '../../../actions/papers';
import { RootState } from '../../../reducers';
import { PaperType } from '../../papers/types/types';

export default function PaperSettings() {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
        cost: 0
    });

    const [updateForm, setUpdateForm] = useState({
        id: 0,
        name: '',
        cost: 0
    });

    const papers = useSelector((state: RootState) => state.papers.papers);

    const onFormSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(addPaper(form));
        setForm({
            name: '',
            cost: 0
        });
    }

    const onUpdateFormSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(updatePaper(updateForm));
        setUpdateForm({
            id: 0,
            name: '',
            cost: 0
        });
    }

    return (
        <div className='z-10 bg-white relative'>
            {/* ADD PAPER FORM */}
            <form className='flex flex-col w-96 mx-auto p-2 border border-black'>
                <h2 className='text-center 2xl'>ADD PAPER</h2>
                <span className='grid grid-cols-2 my-2'>
                    <label>Paper Name</label>
                    <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className='border border-black' type='text' required/>
                </span>
                <span className='grid grid-cols-2 my-2'>
                    <label>Cost of 20' x 16' print</label>
                    <input value={form.cost} onChange={(e) => setForm({...form, cost: e.target.valueAsNumber})} className='border border-black' type='number' step='0.01' min='0' max='100' required/>
                </span>
                <button onClick={(e) => onFormSubmit(e)} className='bg-blue-300 px-2 py-1 my-2'>Add Paper</button>
            </form>

            {/* UPDATE PAPER FORM */}
            <form className='flex flex-col w-96 mx-auto p-2 border border-black'>
                <h2 className='text-center 2xl'>UPDATE PAPER</h2>
                <span className='grid grid-cols-2 my-2'>
                    <label>ID</label>
                    <input disabled value={updateForm.id} type='number' required/>
                </span>
                <span className='grid grid-cols-2 my-2'>
                    <label>Paper Name</label>
                    <input value={updateForm.name} onChange={(e) => setUpdateForm({...updateForm, name: e.target.value})} className='border border-black' type='text' required/>
                </span>
                <span className='grid grid-cols-2 my-2'>
                    <label>Cost of 20' x 16' print</label>
                    <input value={updateForm.cost} onChange={(e) => setUpdateForm({...updateForm, cost: e.target.valueAsNumber})} className='border border-black' type='number' step='0.01' min='0' max='100' required/>
                </span>
                <button onClick={(e) => onUpdateFormSubmit(e)} className='bg-blue-300 px-2 py-1 my-2'>Update Paper</button>
            </form>

            <table className='border border-black w-screen'>
                <thead>
                    <tr className='grid grid-cols-4'>
                        <th>Name</th>
                        <th>Cost of a 20' x 16' print (£ GBP)</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    { papers.map((paper: PaperType) => (
                        <tr className='grid grid-cols-4'>
                            <td className='text-center'>{ paper.name }</td>
                            <td className='text-center'>{ paper.cost }</td>
                            <td className='text-center'><button onClick={() => setUpdateForm(paper)} className='py-1 px-2 bg-blue-300'>UPDATE</button></td>
                            <td className='text-center'><button onClick={() => dispatch(deletePaper(paper.id))} className='py-1 px-2 bg-red-300'>DELETE</button></td>                            
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
}