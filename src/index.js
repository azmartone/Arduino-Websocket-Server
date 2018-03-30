const { HARDWARE_STATE_CHANGE } = require('./constants/socket')
const SocketController = require('./SocketController')
const Arduino = require('./arduino')

Arduino({
    onStateChange: state => {
        SocketController.broadcast(HARDWARE_STATE_CHANGE, state)
    }
})

/*

 1. Get communication from Arduino to socket server
    a. onArduinoStateChange()
 2. Get communication from socket server to unity
    a. socket server sends Unity



*/
