export default {
  id: "arduino-ide",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3fxBOOBl8neCl-9ddcTEynuQS0d0sjYVIo9wNV4y3DPDaHdI3mzgBfqDMZepgR7XfoyrPp0ufcLpvzUlizINvM1sAqtWN9F-Mm3znUf_QZWnmHxz3XeHLgmpzuKsMEODlgrr-qxzYK5Xyki_JQ8UZCu=w1000-h500-no?authuser=0",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3fpvrBtzI1MyOqDmrahbxo4XO9HkYaLkba_Fx3OrRUrowNnVCngi6zZ1O0K1TCmYpsd3UKuRr7G2tpPbXiImMGQ-oqdCk5_I77JGlKo2QMklmJ3xJ0NF6XSMtJD1FndWkBQcRNqhdQmUA6tw3Io3RUs=w300-h150-no?authuser=0",
    tiny: "nodemcu-cover-tiny.jpg",
  },
  title: "NodeMCU and Arduino IDE",
  tags: ["nodemcu", "arduinoide"],
  content: [
    {
      image: {
        alt: "NoceMCU Board with ESP8266 Chip",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3doWllAGs4GJbIp_XRRY2G1j49U6bZEQ3SQKtWf-fUw08bddM5DrXccEqm7C0Z2bmaEmlkad_B460JiK93OSm_1ErQb09zmQuoAZSbVyw3BCVD6XUX971TAaCGMiui5BdCTG7DN5zBqD1Vlg5jNjC_V=s953-no?authuser=0",
        avoidLazy: true,
        align: "left",
        caption: {
          text: "NoceMCU Board with ESP8266 Chip",
        },
      },
      text: "Arduino IDE is currently the most popular software which allows to burn programs to your favourite boards. By default it supports most of the Arduino-based boards, but there are lots of community made libraries which can extend the core functionalities. The main programming language used here is **C/C++** but don't worry if you miss the knowledge of it because some general programming knowledge would be fine to execute basic tasks. The community not just made board manager libraries but utility libraries and extensions to easily configure the communication between the board and almost any available interface. I always found a library for all of my sensors and stuff.",
    },
    {
      title: "Arduino IDE Settings",
      text: 'NodeMCU is an __ESP8266__ based board. To prepare the __Arduino IDE__ to compile and upload code to the board some additional settings are required. The very first thing is to add additional board manager. This can be done by opening **"File -> Preferences"** in the _Arduino IDE_. Find **"Additional Boards Manager URLs"** and paste the following path there:',
      code: {
        source:
          "https://arduino.esp8266.com/stable/package_esp8266com_index.json",
      },
    },
    {
      text: 'This will then tell the Arduino IDE where should it look up for packages in addition to the standard packages. To install ESP8266 adapter go to **"Tools -> Board -> Board manager"** and search for **"esp8266"** (by the ESP8266 Community). Click on **install**. After few seconds you will now be able to program any ESP8266 based boards via the IDE.',
    },
    {
      title: "Board configuration",
      text: 'Well, theoretically we are now able to burn any program, but some adjustment still needed in the uploading configuration. Let\'s head over to the **"Tools"** menu. Choose NodeMCU from the **"Board"** list \n> If you cannot see it, make sure you installed the additional board manager before.\n\n Here is an example settings for the NodeMCU board V1.0. Any other version of the board or any other board might require different settings. The important parts are the upload **Speed**/**Frequency**, **Port** and the **Programmer** \n\n | Settings | Value |\n|:-:|:-:|\n| Builtin Led | 2 |\n| Upload Speed | 115200 |\n| CPU Freq. | 80 MHz |\n| Flash Size | -any- |\n| Debug port | Disabled |\n| Debug Level | None |\n| lwIP Variant | v2 Lower Memory |\n| VPTables | Flash |\n| Exceptions | Legacy |\n| Erase Flash | Only Sketch |\n| SSL Support | All SSL ciphers |\n| Port | USB* |\n| Programmer | AVRISP mkII |\n > *Port is only visible in case of a device is plugged in. Choose corresponding port which is used by the device you want to program.',
    },
    {
      title: "Upload your first code",
      code: {
        source:
          'void setup() {\n  Serial.begin(115200);              // set up serial communication\n}\nvoid loop() {                        // run continuously\n  Serial.println("Hello!");          // prints to serial\n  delay(2000);                       // wait 2 seconds\n  Serial.println("How are you?");    // prints to serial\n  delay(2000);                       // wait 2 seconds\n  Serial.println("I\'m under the program.");  // prints to serial\n  delay(10000);                      // wait 10 seconds\n}',
        language: "cpp",
      },
    },
    {
      text: 'Copy the following code snippet and paste it to your _Arduoino IDE_. Hit **"File -> Save"**(**CTRL+S**) and **"Sketch -> Upload"**(**CTRL+U**). It could take up to 30 seconds. If everything went smooth, the board will now restart and boots with the freshly burned program. In our case it will just prints to the serial output.',
    },
    {
      video: {
        alt: "Uploading program to NodeMCU Board via Arduino IDE",
        url: "https://cdn.wattaurus.com/15eeadccd9a9a7ee928c1400ef38963a.mp4",
        align: "none",
        caption: {
          text: "Uploading program to NodeMCU Board via Arduino IDE",
        },
        style: {
          width: "100%",
        },
      },
      text: "The so called serial output is a serial communication method between two devices via serial port. So in our example it's kind of a communication channel between the board and the PC where they can speak to each other. Arduino IDE gives us the possibility to join this channel by opening the **\"Tools -> Serial Monitor\"**(**CTRL+SHIFT+M**). There is one setting which needs to be set and that's the baudrate. Each time we initialze the serial comminucation (`Serial.begin(115200)`) it will keep communicate with the given baudrate(115200). To be able to decode the messages the **Serial Monitor** needs to have the same baudrate. At the bottom right of the window set it to **115200**. Now you should see that our little board is continuously spamming the previously given sentences.",
    },
    {
      title: "Next steps",
      text: "Congrats! Now you are able to program literally any ESP based boards out there. ESP8266 is a very common and strong board compared to its size. It has a built-in BLE and Wifi module, lot's of digital and analog pins, also able to save on power consumption by [enabling deep sleep](/posts/nodemcu-deep-sleep). From now the only limit is your imagination.",
    },
  ],
  time: 1604072933000,
};
