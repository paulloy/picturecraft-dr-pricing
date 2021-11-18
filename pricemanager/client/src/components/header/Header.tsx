import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPapers } from '../../actions/papers';

function Header() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPapers());
    }, [])

    return (
        <h1 className="bg-blue-400">RISER WORLD</h1>
    )
}

export default Header;