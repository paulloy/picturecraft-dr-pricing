import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { loginUser } from '../../actions/auth';
import { RootState } from '../../reducers';

export default function Login() {
    const auth = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onFormSubmission = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(loginUser(username, password));
    }

    if (auth.isAuthenticated) return <Navigate to='/' />;

    return (
        <>
            <form className='relative z-10 p-3 bg-green-100 w-96 mx-auto mt-5' onSubmit={(e) => onFormSubmission(e)}>
                <h2 className='text-xl text-center mb-3'>Login</h2>
                <div className='grid grid-cols-2 gap-5'>
                    <label className='text-lg text-right'>Username</label>
                    <input name='username' value={form.username} onChange={(e) => change(e)} type="text" />
                </div>
                <div className='grid grid-cols-2 gap-5 mt-2'>
                    <label className='text-lg text-right'>Password</label>
                    <input name='password' value={form.password} onChange={(e) => change(e)} type="password" />
                </div>
                <div>
                    <button className='w-full mt-3 py-3 px-2 text-lg text-center bg-blue-200'>Login</button>
                </div>
                <div>
                    <button className='w-full mt-10 bg-gray-100 p-1'>Login as Guest</button>
                </div>
            </form>
        </>
    );
}