import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';

// Component imports
import Cart from '../cart/Cart';
import PaperSettings from '../settings/papers/PaperSettings';
import Login from '../accounts/Login';
import PrivateRoute from './PrivateRoute';
import Papers from '../papers/Papers';
import { loadUser } from '../../actions/auth';

export default function Routing() {
    const auth = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    return (
        <Routes>
            <Route path='/settings/papers' element={<PaperSettings />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/accounts/login' element={<Login />} />
            <Route
                path='/'
                element={
                    <PrivateRoute>
                        <Papers />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}