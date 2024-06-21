import React, { useState, useEffect } from 'react';
import { useSocket } from './SocketProvider';

const AcceptRide = () => {
    const socket = useSocket();
    const [notification, setNotification] = useState(true);
    const [driverName, setDriverName] = useState('');
    const [firstReq, setFirstReq] = useState(null);

    useEffect(() => {
        if (!socket) return; // Ensure socket is defined

        socket.on('notify', (n, firstReqId) => {
            console.log('in here notify');
            setNotification(n);
            setFirstReq(firstReqId);
        });

        socket.on('driver-name', (nameOfDriver) => {
            const driver = document.getElementById('driverDetails');
            if (driver) {
                driver.textContent = `Name of Driver connected with: ${nameOfDriver}`;
                driver.style.display = "block";
            }
        });

        return () => {
            socket.off('notify');
            socket.off('driver-name');
        };
    }, [socket]); // Ensure useEffect runs when socket changes

    const AcceptRideRequest = () => {
        if (!socket) return; // Ensure socket is defined

        setNotification(!notification);
        const pop = document.getElementById('popup');
        pop.textContent = "Accepted ride, Customer and driver now connected!";
        pop.style.display = "block";
        setTimeout(() => {
            pop.style.display = "none";
        }, 7000);
        socket.emit('driver-details', driverName, firstReq);
    };

    const handleChange = (e) => {
        setDriverName(e.target.value);
    };

    return (
        <div>
            <input type="text" onChange={handleChange} placeholder='Enter driver name' /><br />
            <button onClick={AcceptRideRequest} disabled={notification} style={{ cursor: 'pointer' }} className={`${notification ? 'null' : 'rippleButton'}`}>Accept ride</button>
        </div>
    );
};

export default AcceptRide;
