import React from 'react';

function Header() {
    return (
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
        </header>
    )
}

export default Header;