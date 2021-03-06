import React, { useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';
import { RootState } from '../../reducers';

function Header() {

    const auth = useSelector((state: RootState) => state.auth.isAuthenticated);

    const dispatch = useDispatch();

    const authLinks = (
        <>
            <li className="ml-3.5 text-1">
                <Link to='/'>Printing</Link>
            </li>
            <li className="ml-3.5 text-1">
                <Link to='/cart'><i className="fas fa-shopping-cart"></i></Link>
            </li>
            <li className="ml-3.5 text-1">
                <button onClick={(e) => logout(e)}>Logout</button>
            </li>
        </>
    );

    const publicLinks = (
        <>
            <li className="ml-3.5 text-1">
                <Link to='/accounts/login'>Login</Link>
            </li>
        </>
    )

    const logout = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        dispatch(logoutUser());
    }

    return (
        <>
            <header className="flex flex-row h-16 z-10 relative bg-blue-100">
                <div className="flex items-center">
                    <h1 className="text-2xl p-3.5">PictureCraft Price Manager</h1>
                </div>
                <nav className="flex items-center">
                    <ul className="flex flex-row text-lg p-3.5">
                        { auth ? authLinks : publicLinks }
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;