export default {
  id: "led_circle",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3fX5u-oHP9x6fuGAnKx5G6BK5OPxRJvqk5zAImnfV0hHhdCTSjKwuBezGT567aD-AyURtr8ucIj-TuQ6qdNfDF_GPrWIg-HzrpwUTZYP-ljDdHd3fcwl_IDtHbm4BMKGTyit8AO0FGCMSTv_7GOjuCw=w1080-h540-no?authuser=0",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3fPrVY90X7QGsGttLiGq6U9mDqX26-8dhG87hHTjGeEAA4MFA9LXk2upu1g9dd3BejTMt-A_3zmLCqCz03jXmBYAzH3Khetaj4utJe4VyxCa-bth0NjIobW4o_z810Kb9oIILW9vDMatFBoZqmN9Vw6=w300-h150-no?authuser=0",
    tiny: "neopixel-tiny.png",
  },
  title: "Addressable LED circle",
  tags: ["arduino", "led"],
  content: [
    {
      image: {
        alt: "NeoPixel Ring connected to Arduino UNO",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3fX5u-oHP9x6fuGAnKx5G6BK5OPxRJvqk5zAImnfV0hHhdCTSjKwuBezGT567aD-AyURtr8ucIj-TuQ6qdNfDF_GPrWIg-HzrpwUTZYP-ljDdHd3fcwl_IDtHbm4BMKGTyit8AO0FGCMSTv_7GOjuCw=w1080-h540-no?authuser=0",
        url_tiny: "neopixel-tiny.png",
        align: "none",
        caption: {
          text: "NeoPixel Ring connected to Arduino UNO",
        },
        style: {
          width: "100%",
        },
      },
      text: "Some time ago I've created the guide about how to use [WS2812 LED strip](/posts/led_strip) with Arduino UNO. In this brief overview I will show some additional example code for the exact same **WS2812** LED but this time I will use a ring-shaped module with 12 LEDs. The setup and usage is very similar to the strip but now we are going to use another library which implements the communication with the module.<br/><br/>To use the board simply connect VCC to 5V, GND to GND, and DAT to GPIO 7. It is required to download and install the [Adafruit_NeoPixel](https://github.com/adafruit/Adafruit_NeoPixel) library which is available in the Arduino IDE's built-in library manager.",
    },
    {
      title: "Usage of NeoPixel",
      text: "The usage of the _Adafruit_Neopixel_ is pretty straightforward. We start with initializing the module with the necessary configuration as number of LEDS (_as 16 bit uint_), GPIO for Data pin (_as 8 bit uint_) and LED type (_as 8 bit uint_). LED type describes the bitstream frequency and the RGB/GRB order. In most cases this value should be marked as the predifined constants `NEO_GRB+NEO_KHZ800`. After calling `pixels.begin()` in the `setup(){...}` function we can play with the `pixels.setPixelColor(number, pixels.Color(R,G,B))` method to set individual pixels and `pixels.show()` to persist it.",
      code: {
        source:
          "#include <Adafruit_NeoPixel.h>\n\nAdafruit_NeoPixel pixels = Adafruit_NeoPixel(12, 7, NEO_GRB + NEO_KHZ800);\n\nvoid setup()\n{\n  pixels.begin();\n}\n\nvoid loop()\n{\n  // Sets the 1st LEDs color to RED, indexing starts from 0\n  pixels.setPixelColor(0, pixels.Color(255, 0, 0));\n  pixels.show();\n\n  // Sets the 3rd LEDs color to GREEN\n  pixels.setPixelColor(2, pixels.Color(0, 255, 0));\n  pixels.show();\n}",
        language: "cpp",
        title: "Bare minimum",
      },
    },
    {
      title: "Example functions",
      text: "The next function receives 3 parameters as red, green and blue levels of a color. It first lights up the first pixel and go through the full circle creating a tail behind. In the tail each next color has the color levels halved.",
      video: {
        alt: "Pixel running in circle",
        url: "https://cdn.wattaurus.com/3960da3e9977bfb7747908bc4b30a6df.mp4",
        align: "none",
        caption: {
          by: "wattaurus1",
          via: "Instagram",
          url: "https://instagram.com/wattaurus1",
        },
      },
    },
    {
      code: {
        source:
          "// Pixel run in circle with tail\nvoid circle(int red, int green, int blue)\n{\n  for (int i = 0; i < NUM_LEDS; i++)\n  {\n    pixels.setPixelColor(i, pixels.Color(red, green, blue));\n    pixels.show();\n    for (int j = 0; j <= 8; j++)\n    {\n      int index = (NUM_LEDS + i - j) % NUM_LEDS;\n      pixels.setPixelColor(index, pixels.Color(red >> j, green >> j, blue >> j));\n      pixels.show();\n    }\n    delay(50);\n  }\n}",
        language: "cpp",
        title: "Circle run",
      },
    },
    {
      text: "The following snippet stores 12 colors of the rainbow and iterates through it. The function maintains the order of the colors and rotate one pixel in each iteration.",
      video: {
        alt: "Pixel running in circle",
        url: "https://cdn.wattaurus.com/d78eff7156ae4ec5338d3d96b35cffe7.mp4",
        align: "none",
        caption: {
          by: "wattaurus1",
          via: "Instagram",
          url: "https://instagram.com/wattaurus1",
        },
      },
    },
    {
      code: {
        source:
          "// Rainbow colors\nint colors[][3] = {\n    {255, 0, 0},\n    {255, 128, 0},\n    {255, 255, 0},\n    {128, 255, 0},\n    {0, 255, 0},\n    {0, 255, 128},\n    {0, 255, 255},\n    {0, 128, 255},\n    {0, 0, 255},\n    {128, 0, 255},\n    {255, 0, 255},\n    {255, 0, 128},\n};\n\n// ...\nfor (int i = 0; i < NUM_LEDS; i++)\n{\n  for (int j = 0; j < NUM_LEDS; j++)\n  {\n    int index = (NUM_LEDS + j + i) % NUM_LEDS;\n    pixels.setPixelColor(index, pixels.Color(colors[j][0], colors[j][1], colors[j][2]));\n    pixels.show();\n  }\n  delay(50);\n}",
        language: "cpp",
        title: "Rainbow rotate",
      },
    },
    {
      title: "Full code",
      code: {
        source:
          "#include <Adafruit_NeoPixel.h>\n\n#define PIN 2\n#define NUM_LEDS 12\n\nAdafruit_NeoPixel pixels = Adafruit_NeoPixel(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);\n\n// Pixel run in circle with tail\nvoid circle(int red, int green, int blue)\n{\n  for (int i = 0; i < NUM_LEDS; i++)\n  {\n    pixels.setPixelColor(i, pixels.Color(red, green, blue));\n    pixels.show();\n    for (int j = 0; j <= 8; j++)\n    {\n      int index = (NUM_LEDS + i - j) % NUM_LEDS;\n      pixels.setPixelColor(index, pixels.Color(red >> j, green >> j, blue >> j));\n      pixels.show();\n    }\n    delay(50);\n  }\n}\n\n// Rainbow colors\nint colors[][3] = {\n    {255, 0, 0},\n    {255, 128, 0},\n    {255, 255, 0},\n    {128, 255, 0},\n    {0, 255, 0},\n    {0, 255, 128},\n    {0, 255, 255},\n    {0, 128, 255},\n    {0, 0, 255},\n    {128, 0, 255},\n    {255, 0, 255},\n    {255, 0, 128},\n};\n\nvoid setup()\n{\n  pixels.begin();\n}\n\nvoid loop()\n{\n  int times = 10;\n  circle(255, 0, 255);\n  circle(255, 0, 0);\n  circle(0, 255, 0);\n  circle(0, 0, 255);\n  while (times)\n  {\n    for (int i = 0; i < NUM_LEDS; i++)\n    {\n      for (int j = 0; j < NUM_LEDS; j++)\n      {\n        int index = (NUM_LEDS + j + i) % NUM_LEDS;\n        pixels.setPixelColor(index, pixels.Color(colors[j][0], colors[j][1], colors[j][2]));\n        pixels.show();\n      }\n      delay(50);\n    }\n    times--;\n  }\n}",
        language: "cpp",
        title: "led_circle.ino",
      },
    },
  ],
  time: 1610202132825,
};
