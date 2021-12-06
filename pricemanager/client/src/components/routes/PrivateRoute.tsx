import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../reducers';

export default function PrivateRoute() {
    const auth = useSelector((state: RootState) => state.auth.token);

    return auth ? <Outlet /> : <Navigate to='/accounts/login' />;
}