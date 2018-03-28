// import { on } from 'cluster'

// const socketServer = () => {}
const Arduino = require('./arduino')

// socketServer()
console.log('what')

Arduino({
    onStateChange: state => {
        console.log(state)
    }
})

/*

 1. Get communication from Arduino to socket server
    a. onArduinoStateChange()
 2. Get communication from socket server to unity
    a. socket server sends Unity



*/
