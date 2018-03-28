const { Button, Led, Board, Sensor } = require('johnny-five')
let onButton, offButton, led, potentiometer

let state = {
    isLEDOn: false,
    potentiometerValue: null
}

const setState = object => {
    state.assign(object)
}

const board = new Board()

board.on('ready', () => {
    led = new Led(9)

    potentiometer = new Sensor({
        pin: 'A0',
        freq: 250
    })

    onButton = new Button({
        pin: 2,
        isPullup: true
    })
    offButton = new Button({
        pin: 3,
        isPullup: true
    })

    onButton.on('down', () => {
        const { potentiometerValue } = state
        led.on()
        led.strobe(potentiometerValue)
        setState({ isLEDOn: true })
    })
    offButton.on('down', () => {
        led.stop().off()
        setState({ isLEDOn: false })
    })

    board.repl.inject({
        pot: potentiometer
    })

    potentiometer.on('data', function() {
        if (state.potentiometerValue !== this.analog) {
            if (state.isLEDOn) {
                led.strobe(this.analog + 1)
            }
            setState({
                potentiometerValue: this.analog
            })
        }
    })
})
