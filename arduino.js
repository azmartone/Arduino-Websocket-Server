const { Button, Led, Board, Sensor } = require("johnny-five");
let onButton,
  offButton,
  led,
  ledState = 0,
  potentiometer,
  prevPotAnalog;

board = new Board();

board.on("ready", () => {
  led = new Led(9);

  potentiometer = new Sensor({
    pin: "A0",
    freq: 250
  });

  onButton = new Button({
    pin: 2,
    isPullup: true
  });
  offButton = new Button({
    pin: 3,
    isPullup: true
  });

  onButton.on("down", () => {
    led.on();
    led.strobe(prevPotAnalog);
    ledState = 1;
  });
  offButton.on("down", () => {
    led.stop().off();
    ledState = 0;
  });

  board.repl.inject({
    pot: potentiometer
  });

  potentiometer.on("data", function() {
    if (prevPotAnalog !== this.analog) {
      if (ledState === 1) {
        console.log(this.analog);
        led.strobe(this.analog + 1);
      }
      prevPotAnalog = this.analog;
    }
  });
});
