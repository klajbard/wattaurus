export default {
  id: "hcsr04",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3eXBHEpNn4GCvgnABnTV24fnBh6j7QmK-LwcIl1mTbht61iSbHi_KceAxnmFwXhU8oPrMYXi05SKhbjlcunr3jqHF_AWieq2obiiIsQ--qUzl2SmjS3wnvixnQCheuLpwOmZHwIbV8fU-8pZDsyMCKc=w1080-h540-no?authuser=0",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3eKLgNYVlPMtJ1FKhf4JPlgv-r8WtaqeK9YpLaQOluIrHVX3bY-GXV4xkiB0hOJ7jDwAmDnPcaGgzXH0-uVtv0TGUE8lxzO-rb65dzY3au6h_gOn1ZrACYkjeeCkjK_FgmaNhU7GjSRLhlehSS5uiYx=w300-h150-no?authuser=0",
    tiny: "hcsr04_tiny.png",
  },
  title: "Ultrasonic distance sensor",
  tags: ["arduino", "hcsr04"],
  content: [
    {
      image: {
        alt: "Arduino with HC-SR04 sensor",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3eXBHEpNn4GCvgnABnTV24fnBh6j7QmK-LwcIl1mTbht61iSbHi_KceAxnmFwXhU8oPrMYXi05SKhbjlcunr3jqHF_AWieq2obiiIsQ--qUzl2SmjS3wnvixnQCheuLpwOmZHwIbV8fU-8pZDsyMCKc=w1080-h540-no?authuser=0",
        url_tiny: "hcsr04_tiny.png",
        align: "none",
        caption: {
          text: "Arduino with HC-SR04 sensor",
        },
        style: {
          width: "100%",
        },
      },
      text:
        "The HC-SR04 ultrasonic distance sensor is a very commonly used and cheap solution to measure distance. It has quite low consumption, a relatively small size, and _5 V_ operating voltage which allows us to directly connect to any _5 V_ logic microcontrollers (Arduino, NodeMCU). It has 2 pieces of [ultrasonic transducers](https://www.elprocus.com/ultrasonic-transducer-working-and-its-applications/) mounted on the board. One is a transmitter and the other one is the receiver. Sending electrical signal to the transmitter results in transmitting _40 kHz_ ultrasonic sound pulses. The receiver listens for these and produces an electric pulse if detected one.\n\n- Operating Voltage: **5 V**\n- Operating Current: **15 mA**\n- Operating Frequency: **40 kHz**\n- Distance range: **~2-400cm**\n- Accuracy: **±3 mm**\n- Measuring angle: **15°**",
    },
    {
      title: "Board overview",
      text:
        "The board has 4 pins VCC, GND, Trig and Echo. The VCC and GND pins are for power supply. Trig pin is an input of the board. It is used for triggering the transmitter to start sending pulses. Once it receives a pulse for at least 10 µs the transmitter will send 8 pulses at _40 kHz_. Echo pin is an output of the board which is in _LOW_ state by default. Once the transmitter starts sending the pulses it switch to _HIGH_ until the signal reaches the receiver. If this happens within ~_25 ms_ it will produce a pulse which can be used for calculating the distance. But it it doesn't receive in the timeframe it will timeout.",
    },
    {
      title: "Calculating distance",
      text:
        "The board will have an output pulse. The transmission of the signal forms the beginning and the detection forms the end of it. From this pulse we can clearly determine the time passed. We know the common equitation of the distance(`s`)-speed(`v`)-time(`t`) trio which is `s = v × t`. From the ultrasonic module we now know the time, so we somehow have to determine the speed. It emits sound waves which has the speed of around _343.21 m/s_ which is _0.034 cm/µs_ assuming the temperature of _20 °C_. The speed of sound depends on the temperature and can be calculated from the following:",
      code: {
        source: "c = (331.3 + 0.606 × T) m/s",
      },
    },
    {
      text:
        "We now know the speed and the time so can calculate the distance. The only thing we need ot pay attention is that simply multiplying the time with the speed we get the distance back and forth. To get the distance between the object and the module we need to divide it by 2.",
    },
    {
      text:
        "Let's take an example. We measured a **11 ms** length pulse from the _ECHO_ pin. We take the following calculation",
      code: {
        source: "d = 343.21 m/s * 0.011 s / 2 = 1.888 m",
      },
    },
    {
      text:
        "If we want to have a more accurate distance we can even include the surrounding temperature into the equitation. Let's consider having a temperature of **23 °C**. \n> Please always pay attention to the unit of measurement!",
      code: {
        source: "d = (331.3 + 0.606 × 23) m/s * 0,011 s / 2 = 1.899 m",
      },
    },
    {
      title: "Let's code",
      text:
        "We now had a closer look on how the ultrasonic sensor works. Let's have some actual coding! All we have to do now is to have a written form of all the previous theoretical knowledge. The beauty of it is that no third party library is needed.",
      code: {
        source:
          'const int echoPin = 5;\nconst int trigPin = 6;\n\nlong duration, distance;\n\nvoid sendPulse() {\n  digitalWrite(trigPin, LOW);\n  delayMicroseconds(10);\n  digitalWrite(trigPin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigPin, LOW);\n}\n\nvoid setup(){\n  Serial.begin (115200);\n  pinMode(trigPin, OUTPUT);\n  pinMode(echoPin, INPUT);\n}\n\nvoid loop() {\n  sendPulse();\n  pinMode(echoPin, INPUT);\n  duration = pulseIn(echoPin, HIGH);\n  // 343.21 m/s = 0.034321 cm/s\n  distance = 0.034321 * (duration/2);\n  Serial.print(distance);\n  Serial.print("cm");\n  Serial.println();\n  delay(500);\n}',
        language: "cpp",
      },
    },
    {
      title: "Conclusion",
      text:
        "The use of HC-SR04 sensor also makes it possible to gather some additional knowledge about sound waves and some basic physics. These sensor are able to detect the distance between two objects so it's perfect for basic self automated cars, robots and automation triggers.",
    },
  ],
  time: 1609245866316,
};
