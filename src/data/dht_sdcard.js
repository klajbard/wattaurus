export default {
  id: "dht_sdcard",
  cover: {
    normal: "https://lh3.googleusercontent.com/pw/ACtC-3fkQVCuyQ4IK-4iqGQmsSqodiKiqwr5R-WPgB1GXJZzBiIuuiLkMiUJSmnSS2uHC6gMCXFt4rVGKR_1WbVxZwtL2QgC3GP0YWTN9uxejzN5Aq15jguClPmiJ69y0UHOe6nWLdeHtM5GTkdUwlcEGZe_=w1080-h543-no?authuser=0",
    thumb: "https://lh3.googleusercontent.com/pw/ACtC-3dvg2Tyb4RBoQYj0KTYsdWT2LO_CZk7IPVkt6gU0ioTDZNi13QQgRMFU6wLtLIWHdxlmvWITilRMP3HxaHpmjGzlHLarmypRxUsVcyP8uUnnsdWaH54QvIRyaCMvx3l2eDBhmYHu7t9vCx8qOehR11D=w300-h151-no?authuser=0",
    tiny: "sdcard-tiny.jpg",
  },
  title: "DHT22 Data to SD Card",
  tags: ["dht22", "sdcard"],
  content: [
    {
      image: {
        alt: "Saving DHT22 Sensor data to SD Card",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3fkQVCuyQ4IK-4iqGQmsSqodiKiqwr5R-WPgB1GXJZzBiIuuiLkMiUJSmnSS2uHC6gMCXFt4rVGKR_1WbVxZwtL2QgC3GP0YWTN9uxejzN5Aq15jguClPmiJ69y0UHOe6nWLdeHtM5GTkdUwlcEGZe_=w1080-h543-no?authuser=0",
        url_tiny: "sdcard-tiny.jpg",
        align: "none",
        caption: {
          text: "Saving DHT22 Sensor data to SD Card",
        },
        style: {
          width: "100%"
        }
      },
      text: "There could be several cases when the sensor data no needs to be accessed directly via Bluetooth or Internet, or simply the board doesn't provide the possibility for wireless communication but still we want to persist sensor data. There's plenty of ways to do this but now we are going to store the data on micro SD Card. In the following examples I will demonstrate the usage of the SD Card module to log temperature and humidity coming from the _DHT22_.",
    },
    {
      title: "Required Components",
      text: "- Arduino UNO\n- Micro SD Card Module\n- DHT22 temperature and humidity sensor\n- Jumper wires"
    },
    {
      title: "Micro SD Card Module",
      text: "Micro SD Card Module allows the arduino to communicate with the inserted SD Card into the module using SPI protocol.\n> SPI stands for Serial Peripheral Interface which is a bus system for serial communication. \n\n This interface uses 4 pins for communication: MOSI, MISO, CLK/SCLK, CS/SS. Arduino UNO and Arduino Mega support SPI and has dedicated PINs for this. Connect the Micro SD Card Module (or any other module which communicates by SPI) based on the following:\n\n | SD Card Module | Arduino UNO | Arduino Mega |\n| :-- | :-: | :-: |\n| VCC | 5V | 5V |\n| GND | GND | GND |\n| MOSI | GPIO 11 | GPIO 51 |\n| MISO | GPIO 12 | GPIO 50 |\n| CLK/SCLK | GPIO 13 | GPIO 53 |\n| CS/SS | GPIO 10 | GPIO 53 |\n\nThe next step is to upload a software. We are going to use the `SD` library which should be preinstalled in the **Arduino IDE**. There are some default examples under the `File → Examples → SD → CardInfo` to test the module.\n\n❗Make sure to format the SD Card to FAT32 (or FAT16) befure using it❗"
    },
    {
      title: "DHT22 Sensor",
      text: "To create a more realistic example we will use the _DHT22_ to send the data to the SD Card. _DHT22_ is a sensor which uses a capacitive humidity sensor and a thermistor to measure the surrounding humidity and temperature and sends digital output on the data pin (**OUT**/**DAT**). To use it with the Arduino simply connect **VCC** to **5V**, **GND** to **GND** and **OUT/DAT** to **GPIO 2**. With the following minimal example you can test the module.",
      code: {
        source: "#include <DHT.h>;\n\nDHT dht(2, DHT22);\n\nvoid setup()\n{\n  Serial.begin(115200);\n  dht.begin();\n}\n\nvoid loop()\n{\n  Serial.println(\"Reading sensor...\")\n  float hum = dht.readHumidity();\n  float temp = dht.readTemperature();\n  Serial.printf(\"temp: %2.1f °C, hum: %2.1f %\", temp, hum);\n  delay(5 * 1000); // 5 seconds\n}\n",
        language: "cpp"
      }
    },
    {
      title: "Sensor Reading to SD Card",
      text: "Once we got a working example for reading DHT22 sensor we can extend the code to save data to SD Card. We will now read the DHT22 in each iteration, open a file, write the sensor data to it, and close it. First let's include the SD library and initialize it on the **GPIO 10** pin which we connect the SD Card module to on the Arduino board. Simply extend the previous example with",
      code: {
        source: "#include <SD.h>;\n// ...\nvoid setup()\n{\n  // ...\n  SD.begin(10);// Initialize SD Card Module on GPIO 10\n}",
        language: "cpp"
      }
    },
    {
      text: "Next step is to instantiate the `File` class as `logFile` which will be used to open and write a file with the SD Card module. The `SD` library comes with useful methods for file management on the SD Card.\n- `SD.exists(\"filename\")` - returns `true` if 'fileName' exists, `false` otherwise.\n- `SD.mkdir(\"dirName\")` - Creates a folder called 'dirName'. Returns `true` upon succes or `false` otherwise.\n- `SD.rmdir(\"dirName\")` - Removes the folder called 'dirName'. Returns `true` upon succes or `false` otherwise.\n- `SD.open(\"fileName\",mode)` - Opens a file called 'fileName'. The mode can be either `FILE_READ`(default) or `FILE_WRITE`. Reading starts from the beginning of the file and writing start from the end of the file. Automatically creates a file if the mode was set to writing and the file doesn't exists. Returns `true` upon succes or `false` otherwise. Closing should be called on the instance.",
      code: {
        source: "// Library imports... \n\nFile logFile;\n\nvoid loop()\n{\n  // Sensor readings...\n  logFile = SD.open(\"data.log\", FILE_WRITE);\n  if (logFile)\n  {\n    // Do something in the file\n  }\n}",
        language: "cpp"
      }
    },
    {
      text: "The last step is to actually write inside that file. The `logFile` (which is again an instance of `File` class) has several useful methods for file operations.\n- `file.print(\"data\")`/`file.println(\"data\")` - Both methods are used to pring data to the file, but `println` also terminates with a carriage return(**\\r**) and newline(**\\n**) character.\n- `file.read()` - Returns with the next _byte_ if available\n- `file.close()` - Closes the file and persists the data on SD Card.\n\n > `logTime` is the time elapsed since the run booted in milliseconds.",
      code: {
        source: "void loop()\n{\n  // ...\n  if (logFile)\n  {\n    Serial.println(\"Printing to file...\");\n    logFile.print(logTime);\n    logFile.print(\" - \");\n    logFile.print(temp);\n    logFile.print(\" °C, \");\n    logFile.print(hum);\n    logFile.println(\" %.\");\n    logFile.close();\n  }\n}",
        language: "cpp"
      }
    },
    {
      title: "Wrap it up",
      text: "The following code should now be able to read DHT22 sensor data and save the output to an SD Card.",
      image: {
        alt: "Wiring diagram",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3fnRp5qOb578e7DfSOLY-oSQa8Hhn9IqMzSi39NzVjk-n6Mr0HUSXuEXsJbZt88RPzcvHQkoByd1C4VN5NWq-AsNd9Pk_JoL6H2-nSc_2WWCEmRxgRljcdTmgOWu476FDGfDggK1mi09EKnzff8N8OF=w1500-h750-no?authuser=0",
        url_tiny: "dhtsdcard-wiring.png",
        align: "none",
        caption: {
          text: "Wiring diagram",
        },
        style: {
          width: "100%"
        }
      },
      code: {
        source: "#include <SD.h>;\n#include <DHT.h>;\n\nDHT dht(2, DHT22);\nFile logFile;\n\nvoid setup()\n{\n  Serial.begin(115200);\n  dht.begin();\n  SD.begin(10);\n}\n\nvoid loop()\n{\n  float hum = dht.readHumidity();\n  float temp = dht.readTemperature();\n  unsigned long logTime = millis();\n  logFile = SD.open(\"data.log\", FILE_WRITE);\n  if (logFile)\n  {\n    Serial.println(\"Printing to file...\");\n    logFile.print(logTime);\n    logFile.print(\" - \");\n    logFile.print(temp);\n    logFile.print(\" °C, \");\n    logFile.print(hum);\n    logFile.println(\" %.\");\n    logFile.close();\n  }\n  else\n  {\n    Serial.println(\"Something wrong happened.\");\n  }\n  delay(30 * 1000);\n}\n",
        language: "cpp",
        title: "dht_sdcard.ino"
      }
    }
  ],
  time: 1610997794785,
};
