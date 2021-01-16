export default {
  id: "d1mini_ir",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3fPqV1XzJ85C9HbqKdM4dubg83FE-HdOU2svoayNHBRKMRHwM5xs1tg_IV1FoA5jwalbQpXW2bCa07IrScKdozf5CY2REvDZKF_yakaVr5PzPSoptvxYZKh0FAMzrBkApHjqu0lvq7CsdMQ7uAgLLNM=w1255-h628-no?authuser=0",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3deH3IEQVLN4r6ZAN5Zin0nb0VulmgpRj13OO2wfbAPy5ZWCisgxuRSas2aZDKEGHWyzrB3cIqI44vZx_caMfBNGQlSFgzQjNazsD4IuE8XTGvRvK-jMnv5fqz1NjNwsx4XT6ejUOapu8rU5LxhX1_B=w300-h150-no?authuser=0",
    tiny: "irreceiver_deepsleep_tiny.png",
  },
  title: "IR Receiver + D1 Mini",
  tags: ["d1mini", "ir_receiver"],
  content: [
    {
      image: {
        alt: "Wiring D1 mini and IR receiver enabling deep sleep",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3dawsKSOLZILDxrGGwaJAZSzXL1fGnOpz0-k1bMKkH3eKW8_oBUwjXBCFTepkpOADv2IUhTzFvtR1XOpTOIMb2N3Dw6WVqPo8FOhXuEP8zmmzyhJ8kQ9A2FuQffFERv-ktN2Y5pp6zy021OSxa1yS6X=w1080-h540-no?authuser=0",
        avoidLazy: true,
        align: "none",
        style: {
          width: "100%",
        },
        caption: {
          text: "Wiring D1 mini and IR receiver enabling deep sleep",
        },
      },
      text:
        "One of the biggest challenge in home automation is to handle the communication between various protocols and devices. Each of them has the advantages and disadvantages, so you will probably use or maybe already used some of them. I mostly devices over [Wifi](/posts/zigbee#WiFi) and [Zigbee](/posts/zigbee#Zigbee) network but I like to experiment other solutions too. In this guide I will have a closer look on communication over infrared. I'm going to program the D1 mini to stay in [deep sleep](/posts/nodemcu-deep-sleep) by default and connect an infrared receiver which wakes up the board on receiving any infrared signal and if the signal matches a certain value it will turn on a smart switch in the [Home Assistant](https://www.home-assistant.io/). It sounds a bit complicated but trust me it's way more easier to achieve this.",
    },
    {
      text:
        "Infrared transmission allows us to control any device via wireless. The most common example is the TV remote controller. The transmission consists of two devices for a successful communication, a transmitter and a receiver. The transmitter is a special kind of an [LED](https://en.wikipedia.org/wiki/Light-emitting_diode) which emits light in the range of infrared frequency which is not visible to the human eye. The receiver is a device which reacts when it receives the IR radiation modulated at a specific frequency.",
    },
    {
      title: "Wiring up",
      image: {
        alt: "Wiring D1 mini and IR receiver",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3egC0yy3507K7C9f17tOmjP1Zmld6LaiKXPG6qWD6E2l36WP4X2xBrSxu63YMsdzbuwnbwbDaudpFk_LJ-juFKL6nPp_0hcyW_Qvch_d2glAnkgKDWE1WZg89-zvbyn68Ah7AXjWVfsYoJXE_ssz63x=s421-no?authuser=0",
        avoidLazy: true,
        align: "none",
        caption: {
          text: "Wiring D1 mini and IR receiver",
        },
      },
      text:
        "Wiring the D1 mini and the IR receiver is very straightforward. Simply connect the IR receivers VCC to 5V of D1 mini, connect GND with GND. The third pinout on the IR receiver is the data out (_Dout_ or _Data_). Wire the data out to D2 of the D1 mini board.",
    },
    {
      title: "Dependencies",
      text:
        "There are several dependencies and some of them require additional installation\n- Arduino (Core package contains it)\n- IRremoteESP8266 ([GitHub](https://github.com/crankyoldgit/IRremoteESP8266))\n- IRrecv ([GitHub](https://github.com/z3t0/Arduino-IRremote))\n- IRutils ([GitHub](https://github.com/crankyoldgit/IRremoteESP8266))\n- ESP8266WiFi (ESP8266 board manager contains it)\n- ESP8266HTTPClient (ESP8266 board manager contains it)\n\nIf all of the dependencies are installed, let's create a new project in the Arduino IDE and include each of them in the top of our file. This will tell Arduino to use these libraries.",
      code: {
        source:
          "#include <Arduino.h>\n#include <IRremoteESP8266.h>\n#include <IRrecv.h>\n#include <IRutils.h>\n#include <ESP8266WiFi.h> \n#include <ESP8266HTTPClient.h>",
        language: "cpp",
      },
    },
    {
      title: "Configuration",
      text:
        "The next step is to define some environment specific global configuration like network settings, home assistant authorization and infrared receiver settings.",
    },
    {
      text: "1. Let's add the Wifi hostname and password.",
      code: {
        source:
          'const char* ssid = "WIFI_SSID"; \nconst char* password = "WIFI_PWD";',
        language: "cpp",
      },
    },
    {
      text:
        '2. Add Home Assistant hostname as `host` and the `port` which is `8123` by default and set the `path` which should be the endpoint for the REST API to turn on a switch. In addition change the `auth` value to your generated `Long-Lived Access Tokens`. This can be obtained after logging in from the Home Assistant by navigating to your profile\'s page and search for the **"Long-Lived Access Tokens"** and click on **"CREATE TOKEN"**.',
      code: {
        source:
          'const char* host = "http://192.168.1.27";\nString port = ":8123"; \nString path = "/api/services/switch/turn_on";\nString auth = "HASSIO_AUTH_TOKEN";',
        language: "cpp",
      },
    },
    {
      text:
        "3. Finally add the configuration for the infrared receiver. It is required to specify a GPIO pin of the D1 Mini which will collect the data coming from the IR receiver. Using this PIN number instantiate the `IRrecv` class and `results` too.",
      code: {
        source:
          "const int RECV_PIN = 4; \nIRrecv irrecv(RECV_PIN); \ndecode_results results;",
        language: "cpp",
      },
    },
    {
      title: "Setup function",
      text:
        "As you might got used to it a `setup()` function is essential in each Arduino code. Here we define it as well. It initializes the Serial comminucation, and the IR receiver as well as connecting to the Wifi.",
      code: {
        source:
          "void setup() {\n  Serial.begin(115200);\n  Serial.setTimeout(1000);\n  while (!Serial) {}\n  irrecv.enableIRIn();\n  connect_wifi();\n}",
        language: "cpp",
      },
    },
    {
      text:
        "The `connect_wifi()` function is a simple function which returns nothing, but tries to connect to the Wifi using the given credentials (`ssid`, `password`) and prints the current status to the Serial.",
      code: {
        source:
          'void connect_wifi() {\n  WiFi.mode(WIFI_STA);\n  WiFi.begin(ssid, password);\n  while (WiFi.status() != WL_CONNECTED)\n  {\n    delay(500);\n    Serial.print(".");\n  }\n  Serial.println("");\n  Serial.println("WiFi connected");\n  Serial.println("IP address: ");\n  Serial.println(WiFi.localIP());\n}',
        language: "cpp",
      },
    },
    {
      title: "Main function",
      text:
        "Similar to the `setup()` function, a `loop()` function is needed to be defined. This is a function which is being executed continuously forever while running. The very first step here is to decode the signal which is received by the IR receiver device by calling the `irrecv.decode(&results)`. This will fill the `results` class with data like `bits`, `decode_type`, `rawbuf`, `rawlen` and `value` ([More details](https://www.pjrc.com/teensy/td_libs_IRremote.html)). This method also returns a boolean which returns `true` if successfully decuded an RF signal otherwise `false`. Next line is to print out the current decoded signal. `serialPrintUint64()` is a function which allows us to print `Uint64` to the serial as it's name says. The following step is to define an array of pattern which will be then matched against the incoming signal's value. ALl these signals are _hexademical_ values. If the value is in the array of patterns it will then `post_data()` function (will be explained in the next section) with a _string_ containing a parsed _JSON_ of the `entity_id` of the switch which is going to be switched on. Thereafter we tell the IR receiver to keep listening for signals by calling `irrecv.resume()`.",
      code: {
        source:
          'void loop() {\n  if (irrecv.decode(&results)) {\n    serialPrintUint64(results.value, HEX);\n    char codes[] = {0xE0E06798, 0x96693CCD, 0x79BDAFF6};\n    if (std::find(std::begin(codes), std::end(codes), results.value) != std::end(codes)) {\n      // Create JSON\n      char json[] = "{\\"entity_id\\":\\"switch.smart_plug\\"}";\n      post_data(json); // Post data to Home Assistant\n    }\n    delay(100);\n    Serial.println("");\n    irrecv.resume();\n  }\n}',
        language: "cpp",
      },
    },
    {
      title: "Posting data to Home Assistant",
      text:
        "The `post_data()` function is responsible to initiate a _POST_ request to Home Assistant API with given payload in the arguments. First set up a TCP connection between the board and the Home Assistant API calling the `connect()` method on the instantiated `WiFiClient` class. Next step is to set up the actual `HTTP` request which will be sent. Set corresponding headers, which tells that the request will contain _JSON_ data and set the authorization to the Home Assistant. The `http.POST()` sends the payload and returns an [HTTP Status Code](https://httpstatuses.com/). If all went well, it should print the status code **200** and corresponding changes. Finally we close the connection by calling `http.end()`.",
      code: {
        source:
          'void post_data(char* buffer) {\n  WiFiClient client;\n  if (!client.connect(host, 8123)) {\n    Serial.println("Failed to connect host");\n  }\n  String address = host + port + path;\n  HTTPClient http;\n  http.begin(address);\n  http.addHeader("Content-Type", "application/json");\n  http.addHeader("Authorization", "Bearer " + auth);\n  int httpCode = http.POST(buffer);\n  Serial.println(httpCode);\n  String payload = http.getString();\n  Serial.println(payload)\n  http.end();\n}',
        language: "cpp",
      },
    },
    {
      title: "Deep sleep (Optional)",
      text:
        "Previously we set up the board to process the incoming RF singals but it's also possible to send the board to deep sleep and wake up when receiving a signal. This should reduce a lot of power.\n",
    },
    {
      text:
        "1. First add some globals in the global scope which will helps us to create a cooldown counter. We want to make sure that after the board woke up all the signals are received and processed before going to deep sleep again. I've choose this to `5000 ms` which should be enough for this.",
      code: {
        source:
          "unsigned long interval = 5000;\nunsigned long previousMillis = millis();",
        language: "cpp",
      },
      image: {
        alt: "Serial output while operating",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3eZ6ddDdiPEmI8inN2Y_8i-fuX5_rBzsv1sjAZJtTw2Fd6z7_65GQDo46ryGQt-5OaCW0cNuInFRmVzxjy6pcAlHaY6lEwfoiIwOFyW9xQcPX-eoexTHVRMMJ08kAQJrX-cWAERsIzLg5pEynGmwCCL=w825-h384-no?authuser=0",
        avoidLazy: true,
        align: "none",
        style: {
          width: "100%",
        },
        caption: {
          text: "Serial output while operating",
        },
      },
    },
    {
      text: "2. Insert the following to the top of the `loop()` function.",
      code: {
        source:
          'unsigned long currentMillis = millis();\nif (currentMillis - previousMillis > interval) {\n  Serial.println("Going to sleep");\n  delay(100);\n  ESP.deepSleep(0);\n}',
        language: "cpp",
      },
    },
    {
      text:
        "3. Adjust the wiring by the following. The wiring is not that simple, containing in addition to the D1 mini and the IR receiver itself resistors as 1 kΩ. Used 1N4007 diode, BC547 transistor, 47uF capacitor in addition to the D1 mini and the IR receiver.",
    },
    {
      image: {
        alt: "Wiring D1 mini and IR receiver enabling deep sleep",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3fPqV1XzJ85C9HbqKdM4dubg83FE-HdOU2svoayNHBRKMRHwM5xs1tg_IV1FoA5jwalbQpXW2bCa07IrScKdozf5CY2REvDZKF_yakaVr5PzPSoptvxYZKh0FAMzrBkApHjqu0lvq7CsdMQ7uAgLLNM=w1255-h628-no?authuser=0",
        avoidLazy: true,
        align: "none",
        style: {
          width: "100%",
        },
        caption: {
          text: "Wiring D1 mini and IR receiver enabling deep sleep",
        },
      },
    },
    {
      title: "Conclusion",
      text:
        "This was one of my most exciting project recently. This helped me to get a closer look on how transistors and capacitors work. They really opened a whole new world. Also this small project will be surely the part of my home automation system.",
    },
  ],
  time: 1604780370000,
};
