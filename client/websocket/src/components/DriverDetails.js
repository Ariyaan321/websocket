import React, { useEffect } from 'react';
import { useSocket } from './SocketProvider';

const DriverDetails = () => {
    const socket = useSocket();

    useEffect(() => {
        socket.on('driver-name', (nameOfDriver) => {
            const driver = document.getElementById('driverDetails');
            driver.textContent = `Name of Driver connected with: ${nameOfDriver}`;
            driver.style.display = "block";
        });
    }, [socket]);

    return (
        <p id='driverDetails' style={{ fontWeight: "bold", color: "red" }}></p>
    );
};

export default DriverDetails;
