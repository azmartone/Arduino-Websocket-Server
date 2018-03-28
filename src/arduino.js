const { isEqual } = require('lodash')
const { Button, Led, Board, Sensor } = require('johnny-five')
//Test
const Arduino = ({ onStateChange } = {}) => {
    let onButton, offButton, led, potentiometer

    let _state = {
        isLEDOn: false,
        potentiometerValue: null
    }

    const setState = object => {
        const nextState = Object.assign({}, _state, object)
        if (!isEqual(nextState, _state)) {
            _state = nextState
            handleStateChange(_state)
        }
    }

    const board = new Board()

    board.on('ready', () => {
        //Define Buttons
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
            const { potentiometerValue } = _state
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
            if (_state.potentiometerValue !== this.analog) {
                if (_state.isLEDOn) {
                    led.strobe(this.analog + 1)
                    setState({
                        potentiometerValue: this.analog
                    })
                }
            }
        })
    })

    const handleStateChange = state => {
        if (typeof onStateChange === 'function') onStateChange(state)
    }
}

module.exports = Arduino
