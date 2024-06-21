import React from 'react';
import { useSocket } from './SocketProvider';

const RequestRide = () => {
    const socket = useSocket();

    const SendRideRequest = () => {
        console.log('hi there requested ride');
        socket.emit('req-ride');
    };

    return (
        <div>
            <button onClick={SendRideRequest} style={{ cursor: 'pointer' }}>Request ride</button>
        </div>
    );
};

export default RequestRide;
