import React from 'react';
import './App.css';

import { SocketProvider } from './components/SocketProvider';
import RequestRide from './components/RequestRide';
// import AcceptRide from './components/AcceptRide';
import AcceptRide from './components/AcceptRide';
import Notification from './components/Notification';
import DriverDetails from './components/DriverDetails';

function App() {
    return (
        <SocketProvider>
            <div className='container'>
                <h1>Testing Hello</h1>
                <RequestRide />
                <AcceptRide />
                <Notification />
                <DriverDetails />
            </div>
        </SocketProvider>
    );
}

export default App;
