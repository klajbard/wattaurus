export default {
  id: "7segment",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3cE-rsbxth3Z7gPiT_ee_d5zQZx21V_cpD7DEePwMdDvSM4bZiSxizmnTnGhHFopJ7-ibBeAyoz1Uy7upCndsJ0FvQBSWpIgRwoYqjnr7B75kbYWnW1jzXp8Gthfu7X5jK4D3oqSuK5N-aJe13obvN6=w1400-h700-no?authuser=0",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3dmkNNjCF86K2CxKd-zjGRIlRvCzzlYtULdSgl8S0f9vj4Y7rdW0h7iIurxq5oYhEOgNIef6jHGVdHWY9QaiT_2tcCBX8s15_qx7wXI119FhL6-p1BW1_Ex_Hvd_glGFZRET0N3OaDi3Et071g0OuGW=w300-h150-no?authuser=0",
    tiny: "tm1637_tiny.png",
  },
  title: "7-Segment Display",
  tags: ["display", "arduino"],
  content: [
    {
      image: {
        alt: "Segments of a 7-Segment Display",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3e8P4tA4d2v_sBQAFeVuhnmwHgRhr65S6bv_GSBuFMaEWVJ44lVq7FioSkxN4BpcoNZavQUAUX1CPH1DLMlIqev8_BTgq5H0F2R2scD1OQNg9TtwgKNsxtWtlDJIiRfAtU9gSMX1IRt_IP8nbHFz7Sy=w285-h380-no?authuser=0",
        avoidLazy: true,
        align: "left",
        caption: {
          text: "Segments of a 7-Segment Display",
        },
        style: {
          maxWidth: "200px",
        },
      },
      text:
        "The 7-segment display is one of the simplest and easiest display to program. It usually consists of 7 separately controllable LEDs and sometimes an additional LED for decimal point. A single digit has 2<sup>7</sup> _(128)_ different states. These made it to be widely used to display numbers such as clocks, meters, calculators etc. In the following example I've used a **4 digit 7-segment** display module with **TM1637** chip on board. This chip is communicating via **I2C protocol** and has a pull-up resistor already on the board. The easiest way to program is to include the [TM1637 library](https://github.com/avishorp/TM1637). It should be available in the Arduino IDE library manager already so installing it should be easy and straightforward. If somehow it is missing, head to the [TM1637 Github page](https://github.com/avishorp/TM1637), download code as ZIP and import it to Arduino IDE library manager.",
    },
    {
      title: "7-Segment Basics",
      text:
        "Each segment can be controlled separate on the 7-segment display. Each segment has a unique _\"address\"_ and usually marked as letters from '**A**' to '**G**'. The two states for each segment is _HIGH_ and _LOW_ which set the corresponding LED _on_ and _off_. In programatic way we just give the board a **8bit binary** number and each bit controls each LED. The counting for the segments goes from right to left, which means '11111111' corresponds to 'XGFEDCBA' where 'X' is the pointer dot (also knows as 'DP'). For example sending the '01001001' binary will be translated that it should light up the A, D and the G LEDS. The following snippet contains the binary codes for the numbers _0-9_ and letters _A-F_.",
      code: {
        source:
          "const uint8_t* chars[] = {\n  0b00111111, // 0\n  0b00000110, // 1\n  0b01011011, // 2\n  0b01001111, // 3\n  0b01100110, // 4\n  0b01101101, // 5\n  0b01111101, // 6\n  0b00000111, // 7\n  0b01111111, // 8\n  0b01101111, // 9\n  0b01110111, // A\n  0b01111100, // b\n  0b00111001, // C\n  0b01011110, // d\n  0b01111001, // E\n  0b01110001, // F\n}",
        language: "cpp",
        title: "Binary values",
      },
    },
    {
      text:
        "To make the code more shorter and readable we can even use hexadecimal numbers. Use '0x00' instead of '00000000' or '0x2f' instead of '00101111'.",
      code: {
        source:
          "const uint8_t* chars[] = {\n  0x3F, 0x06, 0x5B, 0x4F, // 0, 1, 2, 3\n  0x66, 0x6D, 0x7D, 0x07, // 4, 5, 6, 7\n  0x7F, 0x6F, 0x77, 0x7C, // 8, 9, A, b\n  0x39, 0x5E, 0x79, 0x71, // C, d, E, F\n}",
        language: "cpp",
        title: "Hexadecimal values",
      },
    },
    {
      title: "Circle animation",
      image: {
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3cE-rsbxth3Z7gPiT_ee_d5zQZx21V_cpD7DEePwMdDvSM4bZiSxizmnTnGhHFopJ7-ibBeAyoz1Uy7upCndsJ0FvQBSWpIgRwoYqjnr7B75kbYWnW1jzXp8Gthfu7X5jK4D3oqSuK5N-aJe13obvN6=w1400-h700-no?authuser=0",
        url_tiny: "tm1637_tiny.png",
        alt: "Wiring TM1637 to Arduino Uno",
        align: "none",
        caption: {
          text: "Wiring TM1637 to Arduino Uno",
        },
        style: {
          width: "100%",
        },
      },
      text:
        "As said before in this example I will demonstrate the usage of the 7-segment display with a 4 digit board. The I2C protocol allows us to use minimalized amount of wires. Connect the display board to the Arduino based on the following.\n\n| _Adrduino Uno_ | _7-Segment Display_ |\n|:-:|:-:|\n| 5V | VCC |\n| GND | GND |\n| GPIO 8 | DIO |\n| GPIO 9 | CLK |",
    },
    {
      text:
        "The following snippet will simply create an infinite circle animation.",
      code: {
        source:
          "#include <TM1637Display.h>\n\n// Instantiate display\nTM1637Display display(9/*CLK*/, 8/*Data I/O*/);\n\nvoid setup()\n{\n  display.setBrightness(0x00);\n}\n\nconst uint8_t data[][4] = {\n  { 0x01, 0x01, 0x00, 0x00 },\n  { 0x00, 0x01, 0x01, 0x00 },\n  { 0x00, 0x00, 0x01, 0x01 },\n  { 0x00, 0x00, 0x00, 0x03 },\n  { 0x00, 0x00, 0x00, 0x06 },\n  { 0x00, 0x00, 0x00, 0x0c },\n  { 0x00, 0x00, 0x08, 0x08 },\n  { 0x00, 0x08, 0x08, 0x00 },\n  { 0x08, 0x08, 0x00, 0x00 },\n  { 0x18, 0x00, 0x00, 0x00 },\n  { 0x30, 0x00, 0x00, 0x00 },\n  { 0x21, 0x00, 0x00, 0x00 },\n};\n\nvoid loop()\n{\n  int dataLength = *(&data + 1) - data;\n  while(1) {\n    for(int i = 0; i < dataLength; i++) {\n      display.setSegments(data[i]);\n      delay(40);\n      display.clear();\n    }\n  }\n}",
        language: "cpp",
      },
    },
    {
      text:
        "After successfully uploading the code to the Arduino UNO, it should produce the following.",
    },
    {
      video: {
        alt: "Circle animation",
        url: "https://cdn.wattaurus.com/ca3a401e3c461b26f7ab750b31d38fbc.mp4",
        align: "none",
        caption: {
          by: "wattaurus1",
          via: "Instagram",
          url: "https://instagram.com/wattaurus1",
        },
        style: {
          width: "100%",
        },
      },
    },
    {
      title: "Sum up",
      text:
        "7-Segment displays are really easy to set up and use yet very useful in various projects. Measure temperature or humidity, display current voltage or current, create a timer or a clock. The most challenging part could be that to calculate the binary value for the segments.",
    },
  ],
  time: 1608651131458,
};
