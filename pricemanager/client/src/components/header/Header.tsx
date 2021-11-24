import React, { useState } from 'react';
import Cart from './subcomponents/Cart';

function Header() {
    const [displayCart, setDisplayCart] = useState(false);

    return (
        <>
            <header className="flex flex-row h-16 bg-blue-100">
                <div className="flex items-center">
                    <h1 className="text-2xl p-3.5 text-blue-800">PictureCraft Price Manager</h1>
                </div>
                <nav className="flex items-center">
                    <ul className="flex flex-row p-3.5">
                        <li className="ml-3.5 text-1"><a className="text-blue-800">Printing</a></li>
                        <li className="ml-3.5 text-1"><a className="text-blue-800">Canvas</a></li>
                    </ul>
                </nav>
                <button onClick={() => setDisplayCart(true)} className="bg-gray-400 px-2 py-1">CART</button>
            </header>
            <Cart displayCart={displayCart} onCloseCart={(e) => setDisplayCart(false)}/>
        </>
    )
}

export default Header;