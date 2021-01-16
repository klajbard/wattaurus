export default {
  id: "nodemcu-deep-sleep",
  pinned: true,
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3egsvXHuv-L7iTAtghr908kCFoITtI5jLdNwJc9-o3ddu9vNJUEbZ8c-PKl5iTIkWSZpIeTyCZ_ZAv3xGp_Iy1MEAv3WH1Qk1Fh8cp7Fb1no-FJHN6MHJb0oY5r0TrkoZafPMF62vhuZcWmKMWJgxhM=w720-h360-no",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3dycf8oc29yWDu63nMFzvcKjpnvQgYDnNu1mFh0BfEOO7qD4cFvA0i0XyU5NmXNiGfNeciPuSwHTJaDI7BEugtps4b1_bYl_3qqsjpnEWADDTqJpSLytStO2QVSrO3yb6dgzPNYUxHl5e3oB7V0xS1j=w300-h150-no",
    tiny: "dog-sleep-tiny.jpg",
  },
  title: "NodeMCU Deep Sleep",
  tags: ["nodemcu", "deepsleep"],
  content: [
    {
      text:
        "<<ESP8266 microcontroller>> can enter three different sleep modes in order to save power. These sleep modes are fully configurable and can be used according to the project needs. The more deeper the board sleeps, the less functions are available which is obvious.\n\n|  | Modem Sleep | Light Sleep | Deep Sleep |\n|:-|:-:|:-:|:-:|\n| Wifi | OFF | OFF | OFF |\n| System clock | ON | OFF | OFF |\n| RTC | ON | ON | ON |\n| CPU | ON | Pending | OFF |\n| Substrate current | 15 mA | 0.4 mA | ~20 µA |\n\n > Source: [ESP8266 manual](https://www.espressif.com/sites/default/files/9b-esp8266-low_power_solutions_en_0.pdf).",
    },
    {
      text:
        "However these numbers are only valid for the ESP8266 chip but the NodeMCU board has some onboard elements which drain power on a higher rate. Each time the NodeMCU enters deep sleep mode I still measure around _2 mA_. This is because the AMS1117 voltage regulator and the CH340 USB-to-serial converter drains the power even on deep sleep. After I managed to cut off the AMS1117, the current drops to _60 µA_ which is perfect for me.",
    },
    {
      video: {
        alt: "Removing AMS1117",
        url: "https://cdn.wattaurus.com/55cffbecfccee7bb3d65241b3a1ecf86.mp4",
        align: "none",
        caption: {
          text: "Removing AMS1117",
        },
      },
    },
    {
      title: "Consumption",
      text:
        "The NodeMCU board takes an input voltage of _3.3V_ and has about _60 mA_ current consumption on idle state. This means it has a yearly consumption around **2kWh**. That's not that much. Isn't it?\n> W = U * I = 0.231W\n\n> E = W * t = 0.231 W * 24 * 365 = 2.024 kWh \n\n In my country we pay around _0.2$/kWh_ so the total cost for a year is as much as **0.4$**.",
    },
    {
      text:
        "Considering the previous calculation you might ask me the _\"Why the heck you want to reduce if it costs less than a buck a year?\"_ question. Yes, that probably doesn't count that much if you have a board next to a power outlet. If that's not possible you might want to think about batteries which might be able to power the battery for few days. Taken a _3000 mAh_ battery which is considered high capacity for a single 18650 battery. It has a nominal voltage of 3.7V meaning it can directly supply power to the ESP8266 without any harm. \n> t = 3000 mAh / 70 mA ≈ 43 hrs\n\n It can supply power approximately 43 hours which is barely 2 days. Considering the low power usage that's not much. Here we can use our power reduction knowledge and calculate it once more with the alternative usages. Calculating with standby current is not so lifelike. Let's assume we are using an operation which consume around _70 mA_ and takes 30 seconds to complete and consume _20 µA_ for the rest of the one hour cycle.(We will check later on why we choose 1 hour for the sleeping time) \n > 30 s * 70 mA ≈ 0.58 mAh \n\n> 3570s * 20 µA ≈ 0.02 mAh \n\n> 0.58 mAh + 0.02 mAh = 0.6 mAh\n\n For an hour cycle the total consumption is around _0.6 mAh_. A _3000 mAh_ battery could provide 5000 cycles, which is 208 days. So by rough calculation we are now able to power our board for over 200 days using a simple feature of the board. That's 100x times more than using in normal operation. And as you might figured out another huge advantage of this which comes in hand with power saving is the mobility. It requires so much less provision as changing or charging the batteries.",
    },
    {
      title: "Deep sleep",
      image: {
        alt: "NodeMCU deep sleep",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3eP6Kq-kBmcSlflImRhQmG8pEyGAAyPiriIkqSOjCeDzgzaRHkSza5Av-k0uD2sMkL_TQglDRo-mK-GGBO_twdxLh8LdgjcAYnWXFLpyrxh57nULGXGCv6abRTkgPuP8eoeJOpyyGPcHsiIWRt5HDpZ=w689-h430-no",
        avoidLazy: true,
        align: "right",
        caption: {
          text: "NodeMCU deep sleep",
        },
      },
      text:
        "So how do we actually manage to put our board into this so called Deep sleep mode? It's quite easy. Literally just tell it to sleep. The only part what you have to do is to somehow wake up the board, which can be done automatically or manually. The NodeMCU board has a pin called `RST`, which is `HIGH` while running, but when it receives `LOW` signal it restarts the board. So one way to connect a physical button to the `RST` and send `LOW` signal when pressed. The programatical way is to provide a time interval to the sleep function, which means the board will send a `LOW` signal to the GPIO 16 (`WAKEUP` pin, labelled as `D0` on board) if the given time passes so it will restart the board. In this case we only need to directly wire `RST` and `D0`.",
      code: {
        source:
          'void setup() {\n  Serial.begin(115200);\n}\nvoid loop() {\n  Serial.println("Deep sleep in 5 seconds...");\n  ESP.deepSleep(5e6); // 5e6 is 5 seconds\n}',
        language: "cpp",
        title: "deepsleep.ino",
      },
    },
    {
      text:
        "The previous code snipped does only two thing. Prints to the serial and go to Deep sleep mode. the `ESP.deepSleep(uint32 time)` takes a parameter of a 32bit sized int.\n > 2^32 µs = 4.294.967.295 µs ≈ 71.58 mins\n\n This is why it's wise to use the max sleep time around 1 hour to not to [overflow](http://www.cplusplus.com/articles/DE18T05o/).",
    },
    {
      title: "Conclusion",
      text:
        "As you saw it's not that hard to reduce power consumption at all. Further steps might be to attach the board to an external battery or even connect it to a solar panel to have infinite power. One thing you might want to keep in mind is the input voltage of the board. Always check external batteries maximal and minimal voltage as it changes over charging/discharging.",
    },
  ],
  time: 1600789485000,
};
