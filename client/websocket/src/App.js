import React, { useState } from 'react';
// import RequestRide from './components/requestRide';
// import AcceptRide from './components/acceptRide';
import './App.css';
import { io } from 'socket.io-client'


const socket = io('http://localhost:8080');
socket.on('connect', () => {
  console.log('client connected with id: ', socket.id);
})

function App() {
  const [sendMessage, setSendMessage] = useState('')
  const [driverName, setDriverName] = useState('')
  const [notification, setNotification] = useState(true)
  const [firstReq, setFirstReq] = useState(null)
  const [firstDriver, setFirstDriver] = useState(null)


  socket.on('notify', (n, firstReqId) => {
    console.log('in here notify');
    setNotification(n)
    setFirstReq(firstReqId)
    console.log('first reques is here: ', firstReq);
  })

  socket.on('notifyy', (n) => {
    setNotification(n)
  })

  socket.on('driver-name', (nameOfDriver, driverId) => {
    // console.log('driver id = ', driverId);
    setFirstDriver(driverId)
    const driver = document.getElementById('driverDetails')
    driver.textContent = `"name of Driver connected with : ${nameOfDriver}`;
    driver.display = "block";
  })

  socket.on('send-message', (message, name) => {
    const mess = document.getElementById('mess')
    mess.textContent = name + ": " + message;
    mess.display = "block";

  })

  const SendRideRequest = () => {
    console.log('hi there requested ride');
    socket.emit('req-ride');
    // we emit here to drivers for notification
    // .emit('ride-req', ())
  }

  const AcceptRideRequest = (e) => {
    setNotification(!notification)
    const pop = document.getElementById('popup');
    pop.textContent = "Accepted ride, Customer and driver now connected!";
    pop.style.display = "block";
    setTimeout(() => {
      pop.style.display = "none";
    }, 7000);
    socket.emit('driver-details', driverName, firstReq)
    // this is where this current driver gets connected to the client and others are laid of the room

  }

  const Message = (e) => {
    console.log('in message fr , fd: ', firstReq, '------', firstDriver);
    if (firstReq) {
      socket.emit('send-message', sendMessage, driverName, firstReq, firstDriver)
    }
    else if (firstDriver) {
      socket.emit('send-message', sendMessage, driverName, firstReq, firstDriver)
    }
    else {
      socket.emit('send-message', sendMessage, driverName, firstReq, firstDriver)
    }
    const m = document.getElementById('inputMess')
    m.value = ""
  }

  const handleMessageChange = (e) => {
    setSendMessage(e.target.value)
  }
  const handleChange = (e) => {
    setDriverName(e.target.value)
  }

  // End ride not working properly
  // to-do : onEndRide, customer and driver will leave the room and 
  // - chat in general
  const EndRide = (cb) => {
    setFirstReq(null)
    setFirstDriver(null)
    socket.emit('end-ride', ((cb) => {
      alert(cb)
    }))
  }

  return (
    <div className='container'>
      <div>
        <h1>Testing Hello</h1>
        <input type="text" onChange={handleChange} placeholder='Enter driver name' /><br />
        <button onClick={SendRideRequest} style={{ cursor: 'pointer' }}>Request ride</button>
        <button onClick={AcceptRideRequest} disabled={notification} style={{ cursor: 'pointer' }} className={`${notification ? 'null' : 'rippleButton'}`}>Accept ride</button><br />
        <div>
          <div className='messageDiv' id='mess'></div>
          <input type="text" placeholder='send message' id='inputMess' onChange={handleMessageChange} />
          <button onClick={Message}>send message</button>
        </div>
        <p id='popup' style={{ color: "black", fontWeight: "bold" }}></p>
        <p id='driverDetails' style={{ fontWeight: "bold", color: "red" }}></p>
        <button onClick={EndRide}>End ride</button>
      </div>
    </div >
  );
}

export default App;

// when they get connected, they get put in a room