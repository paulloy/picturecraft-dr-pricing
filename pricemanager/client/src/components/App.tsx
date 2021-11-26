import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store';

// Component imports
import Header from './header/Header';
import Papers from './papers/Papers';
import Cart from './cart/Cart';

function App() {
    return (
        <Provider store={store}>
            <Header />
            <Routes>
                <Route path='/' element={<Papers />} />
                <Route path='/cart' element={<Cart />} />
            </Routes>
        </Provider>
    )
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
);