import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { Provider } from 'react-redux';
import store from '../store';

// Component imports
import Header from './header/Header';
import Alerts from './header/Alerts';
import Routing from './routes/Routing';

// Alert options
const alertOptions = {
    timeout: 5000,
    position: 'bottom right'
}

function App() {
    return (
        <>
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Header />
                    <Alerts />
                    <Routing />

                    {/* background image */}
                    <img className='fixed top-0 left-0 w-screen h-screen object-cover opacity-50 z-0' src="../../static/img/background.jpg" alt="background image from https://wallpapercave.com/w/50PoWIh" />
               </AlertProvider>
            </Provider>
        </>
    );
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
);