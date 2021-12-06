import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, Routes } from 'react-router-dom';
import { RootState } from '../../reducers';

export default function PrivateRoute({ children }) {
    const auth = useSelector((state: RootState) => state.auth.isAuthenticated);

    return auth ? children : <Navigate to='/accounts/login' />;
}