const { TO_SERVER } = require('./constants/socket')
// Setup basic express server
var express = require('express')
var app = express()
var port = process.env.PORT || 3000

class SocketController {
    constructor() {
        this.connected = false
        var server = require('http').createServer(app)
        this.io = require('socket.io')(server)

        server.listen(port, () =>
            console.info('Server listening at port %d', port)
        )

        this.io.on('connection', socket => {
            this.connected = true
            console.log('connection', socket.id)

            socket.on(TO_SERVER, data =>
                console.log('message', TO_SERVER, data)
            )

            // when the user disconnects.. perform this
            socket.on('disconnect', () => {})
        })
    }

    broadcast(event, data) {
        if (this.connected) {
            this.io.emit(event, data)
        }
    }
}
module.exports = new SocketController()
