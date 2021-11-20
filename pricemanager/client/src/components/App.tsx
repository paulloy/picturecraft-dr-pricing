import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../store';

// Component imports
import Header from './header/Header';

function App() {
    return (
        <Provider store={store}>
            <Header />
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));