const io = require('socket.io')(8080, {
    cors: {
        origin: ['http://localhost:3000'], // client lives at 3000
    }
})
let freq = null
let fdrv = null

io.on('connection', socket => {

    console.log(socket.id);
    socket.on('req-ride', () => {
        console.log('in req-ride: ', socket.id);
        freq = socket.id
        socket.broadcast.emit('notify', false, socket.id)
    })

    socket.on('driver-details', (driverName, firstReq) => {
        if (firstReq !== null) {
            fdrv = socket.id
            console.log('first Request id: ', firstReq);
            socket.to(firstReq).emit('driver-name', driverName, socket.id)
        }
        else {
            console.log('Request again, An error occured');
        }
        socket.broadcast.emit('notifyy', true)
    })

    socket.on('send-message', (message, name, firstReq, firstDriver) => {
        console.log('freq is: ', freq);
        console.log('fdrv is: ', fdrv);
        console.log('fr , fd : ', firstReq, "---", firstDriver);
        console.log('socketid: ', socket.id);
        if (socket.id == freq) { // if cust -> driver
            console.log('cust to driver');
            socket.to(fdrv).emit('send-message', message, name)
        }
        else if (socket.id == fdrv) { // if driver -> cust
            console.log('cust to driver opposite');
            socket.to(freq).emit('send-message', message, name)
        }
        else {
            socket.broadcast.emit('send-message', message, name)
            console.log('empty here +++++');
        }
    })

    socket.on('end-ride', (cb) => {
        freq, fdrv = null, null
        cb("Ride ended")
    })
})

