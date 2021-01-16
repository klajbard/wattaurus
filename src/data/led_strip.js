export default {
  id: "led_strip",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3c8dLHLQ6XpmFAyJuvC_Pjtpla4hKtCCavKb9fwoPpnOkXdq_kGVFv0sUP6YCSZ7N0zCBySBab5AZw07450l2bppMM9dArENdbYAlOGAtKEOodssmVp5GqhqNvwqX7CVQGfwUcJ5hbCzbYWRtL092wq=w912-h913-no",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3f1Js7GWs-J8SF6T_ZoI4zP-PDxmphqZQXOwLh2XorcsJidu0EFCVFNlXjDmNWwRsXPd2yVST8hXDJq2BMJ2CBYT6N7wEBSoL14npeV3EHoIbgebghkfd518LktE2Kol3SqvRE88msq4YcvbquHX1EU=w300-h150-no",
    tiny: "led-tiny.jpg",
  },
  title: "Addressable LED",
  tags: ["arduino", "led"],
  content: [
    {
      text:
        "<<Addressable LED>> is a really great tool to allow a closer look on the [Android IDE](https://www.arduino.cc/en/main/software) and to practice the [C/C++](https://www.programiz.com/cpp-programming) language. As it's name says this kind of LED strip has the ability to control and program each separate LED on the strip. The one used in the example is a [WS2812](https://makeradvisor.com/tools/ws2812b-addressable-rgb-led-strip/) which has RGB LEDs with an input voltage of 5V DC. It could be powered via an Arduino itself, but it's recommended to have an external power source because the I/O pins can only supply only 40mA.",
    },
    {
      title: "Preparations",
      text:
        "The environment is the first which needs to be set. The required package to easily program the LED strip is from the [FastLED repository](https://github.com/FastLED/FastLED). Simply download and add it to the Arduino IDE. Next step is to count the LEDs on the strip, which is needed for initializing. I've had one with 60 LEDs.",
    },
    {
      image: {
        alt: "Welcome",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3cmQ0abZJBOOhA8IsDaCJdOt1AmLpe24vd78i2Y1H-soyWz_Ig88A6pUGEYrCaIy3kX6HD1ivi6AzU92zWawZaEmerqxNjEcEFALgEawIlqPBwFkw35kY_fteH8jFPlcrt4lbNgWKA6ogEkJs44a2Lu=w687-h441-no",
        avoidLazy: true,
        align: "none",
        caption: {
          text: "Schematic diagram about wiring",
        },
      },
      text:
        "The WS2812 has 3 pins VCC, GND and DAT. Connect VCC and GND to external power source and DAT to D7 pin. By this time we are able to initialize the LED as CRGB by the following code snippet.",
    },
    {
      code: {
        source:
          '#include "FastLED.h"\n#define LED_PIN     7\n#define NUM_LEDS    60\n\nCRGB leds[NUM_LEDS];\nvoid setup() {\n  FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);\n}\n',
        language: "cpp",
      },
    },
    {
      title: "Running light",
      text:
        "Now we are able to program a simple permanent light for the strip. But we just don't stop here. Extended the code with the circle function. It takes the base colors red, green and blue as parameters. Inside the function it iterates through each LEDs and light up the actual light. Right after, it creates the tail(shading effect) of the light by iterating through the previous 8 LEDs and set its color with half intensity. Using the bit shifting operator makes the color value divided by 2. 8 LED length is used as 2<sup>8</sup> is exactly 256, which is the maximal value for each base colors. Once the iteration is done it's required to call the `FastLED.show()` method to take effect. Set a proper delay to set the speed of the running light after all the calculation is done.",
    },
    {
      title: "Complete code",
      code: {
        source:
          '#include "FastLED.h"\n#define LED_PIN     7\n#define NUM_LEDS    60\n\nCRGB leds[NUM_LEDS];\nvoid setup() {\n  FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);\n}\n\nvoid circle(int red, int green, int blue) {\n  for (int i = 0;i < NUM_LEDS;i++) {\n    leds[i] = CRGB(red, green, blue);\n    for (int j = 0; j <= 8; j++){\n      int index = (NUM_LEDS + i - j)%NUM_LEDS;\n      leds[] = CRGB(red >> j, green >> j, blue >> j);\n    }\n    FastLED.show();\n    delay(50);\n  }\n}\n\nvoid loop() {\n  circle(255,0,255);\n}',
        language: "cpp",
        title: "addressable_led.ino",
      },
    },
  ],
  time: 1600022658000,
};
