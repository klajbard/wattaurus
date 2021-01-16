export default {
  id: "smart_switch",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3dp2WFn5IWMoVT0_s2uO4RQqyTwM0P_iu6qRxvnixdv1voIRivLtLNrFm3wDF3W8TZwhfPi5Bqrrs02tCypiZH6wy0i0PeAiJUyV5UnUnV1hYTQYxfy40l9qgOUzN3F35QOfxRrB8iRg8D9z55T0nlc=w1000-h750-no",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3dJ3r6AIfq2ZIzo93xAWTdyeIqRWol9lkTX7tEiYlNcAHKxsTKP0kfq6sQD-wPcHjZMT4Lp8dqMYzFJL5q5lHmyhjKUERPrrqetCCVcKgP69jQor-SFNBi8RG_hgQVCtxu9dUblhlZtR8XcsPorGekX=w300-h150-no",
    tiny: "powr2-tiny.jpg",
  },
  title: "Smart power strip",
  tags: ["tasmota", "sonoff", "powerstrip"],
  content: [
    {
      image: {
        alt: "Sonoff POW R2",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3cNjIQf55TW1S8eFpSvcUiLwQwBZTS92vg5wZX3OvkD1_bfKlKjLPv575qqZK3tap9T9IiaLUhmr20Q0ZqvhZyQITERqF35a_3xc3Q6qUviF03-j_6RlbaFEDCiBmoSNC-cVgYpFqQUizCri47NRCQT=w600-h450-no",
        avoidLazy: true,
        align: "right",
        caption: {
          text: "Sonoff POW R2",
        },
      },
      text:
        "<<Sonoff POW R2>> is a versatile smart switch with the possibility to monitor current power. It also does calculations such as current voltage, apparent power and reactive power and also stores data for energy consumed today, yesterday and even total consumption. It supports communication via `802.11.n/b/g` 2.4GHz Wifi. All these many preference are due to the **ESP8266** chip. The microchip is so widely preferred in the IoT world and has a really big community behind that flashing a new firmware to it just really easy and simple.In the following guide I will show you with some illustrations on how to create a smart power strip using a **Sonoff POW R2** and how to upload a firmware.",
    },
    {
      title: "Hardware requirements",
      text:
        "Before starting the actual programming some preparation is required. Prepare the following tools:\n - Sonoff POW R2\n - Unused power strip\n - USB to TTL (*I prefer CP2102*)\n - 4 jumper cable (*F - M*, or *F - F* + 4pin header)\n - Wire cutter\n - Screwdriver\n\nPlease note that in my guide I use Linux system and might require some additional or different steps on different environment.",
    },
    {
      image: {
        alt: "Sonoff POW R2 opened",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3e0oXCv1vl3xMhcTYrenM-z_9e_Qr_HFqMeWF0wUejIh15w1xOfroZTp_33or_HCW93cYAfv3iasA_vodYBrYoi8bRU5YZkDYoX6JPEMG_H-nAMt2qntou2PKlY10D9U5iqkCRp37TD2nYZNr-h6ziL=w800-h600-no",
        avoidLazy: true,
        align: "left",
        caption: {
          text: "Sonoff POW R2 opened",
        },
      },
      text:
        "The very first step is to disassemble the Sonoff switch. Simply unscrew the only screw you see and gently remove the cover from it. Now you are able to see what's under the hood. The important parts for now are the 2 LEDS (red - status, blue - wifi signal), the reset button(the very long button next to the LEDS) and the available pins on the side. Bring the **UBS to TTL** device and connect it with the Sonoff switch using the jumper cables based on the following schema: \n\n*VCC -> 3.3V, GND -> GND, RX -> TX, TX -> RX*",
    },
    {
      title: "Programming",
      text:
        "Once the connection is stable you should see the LEDs lighting and/or blinking. This means it got power and the board is booted. Before we would start actual programming it is good to know that ESP8266 needs to be put into flash mode to be able to program it. This can be gone by pulling the GPIO0 to GND while booting. Thankfully the reset button does exactly the same which is on the Sonoff switch board. So this mean before plugging the USB to TTL to the computer, make sure to hold the button for 3-5 seconds. This will allows the ESP8266 to enter flash mode.",
    },
    {
      text:
        "There is several ways to upload the firmware using different softwares. My favorite is *esptool.py*. The source code can be downloaded from their [GitHub page](https://github.com/espressif/esptool/releases). Once downloaded enter the folder and enter the Sonoff switch into flash mode then run the following command to save the current firmware as a backup:",
      code: {
        source:
          "esptool.py -p /dev/ttyUSB0 read_flash 0x00000 0x100000 sonoffbackup.bin",
      },
    },
    {
      text:
        "If all went well without any error message we are new ready to purge the current firmware and upload the new one. Pay attention to unplug and plug the USB back while pushing the reset button after each operation is done to re-enter the programming mode. The following command will erase the current firmware from the ESP8266. Should take like 3-5 seconds.",
      code: {
        source: "esptool.py -p /dev/ttyUSB0 erase_flash",
      },
    },
    {
      text:
        "Now the ESP8266 is emtpy, but the device is not in flash mode anymore, so repeat the boot to flash process. Let's grab the latest tasmota firmware from the [GitHub Tasmota Releases](https://github.com/arendst/Tasmota/releases). Choose one you prefer, like one with a custom language, light version or whatever. I'd suggest to go with the simple `tasmota.bin` on the first time as it contains most of the drivers. Once the binary is downloaded run the following command to upload the tasmota firmware. It can take up to 1 or 2 minutes depending on the system.",
      code: {
        source:
          "esptool.py -p /dev/ttyUSB0 write_flash -fs 1MB -fm dout 0x0 tasmota.bin",
      },
    },
    {
      title: "Configure Tasmota GUI",
      image: {
        alt: "Tasmota GUI",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3ctnYF0B3Q65STYo1fKP27j3i8SS8CpubfA2OxOkH026I6RGsHLMJKi-nEFnmy2llkDKTlxKDSYqRkBCk9fJygYRquSuGQTsI6HKuABflH7qOYQnjVtev7iZ7Cula8cDmja1tPLiWPB2mUi6oD-bLuR=w810-h720-no",
        avoidLazy: true,
        align: "right",
        caption: {
          text: "Tasmota GUI",
        },
      },
      text:
        "Right after the new firmware is flashed the device will restart and boot in AP mode. This means any device can access the Sonoff switch. Scan your WIFI network and search for a connection named `tasmota-xxxxx`. Join the network (no password is required). It will then ask to sign in to the network and brings to the Tasmota GUI. Here you can provide wifi credentials to the device. Only give it access to 2.4GHz network as it doesn't support 5GHz. You can also provide a secondary network credential if it fails to join the first one. After saving the settings it will reboot. You are free to leave this network and join back to the local network where the device joined.",
    },
    {
      text:
        "Before accessing the Tasmota GUI on the local network we first need to know it's IP address. There are plenty of ways to do this, but might be the easiest to just type the router IP address (usually `192.168.1.1`) to the browser and check for active connections on the admin panel. Another wasy way - which I prefer - on ubuntu is to run `arp -a` command. It shows all active connections' hostname, IP address, MAC address. Just what I've needed. Once the IP address is identified enter it to the browser. Head to *Configuration* -> *Configure Module* and set *Module Type* to `Sonoff Pow R2`. The device will now restart.",
    },
    {
      image: {
        alt: "Tasmota GUI - Power",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3coDFXthHtmsy-gwu0PpGWGy2Q6zlTJNAHKioT7zX102X0zXgTQ_bsGkHgc975Ig2lCXVo7YazlvQ4-A0ilTWyE8puvrPsg0Sary0LQW1x7r7u-jNrElDk-OSYsFw41wbTlG5FZjn3GHhkgV52OQIDH=w309-h455-no",
        avoidLazy: true,
        align: "left",
        style: {
          maxWidth: "25rem",
        },
        caption: {
          text: "Tasmota GUI - Power",
        },
      },
      text:
        "The ESP8266 now knows which module uses it and what kind of data should be processed. It now displays the current voltage, current, power, apparent power, reactive power, power factor and energy information for today, yesterday and lifetime. Some suggests to have a calibration on the device but I've got already 2 and they are pretty well calibrated by default compared to other power meters. If you think yours not showing the numbers properly please read the following guide carefully: [Power Monitoring Calibration](https://tasmota.github.io/docs/Power-Monitoring-Calibration/)",
    },
    {
      title: "Connecting the power strip",
      image: {
        alt: "Power strip",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3d-F_7MoX7sEb13V-Rtar-685VvqbUQhK9lc321_au65Zp5Yxn_msvhNYzxug_ApVRtklG6XiegR_YRZu8yudjakFd3Qxksc8JH2A1PRj7cQliQ48nyL0VZ9yFOQsv5yb5mepO2EKLTcMsXwpk0cszY=w800-h600-no",
        avoidLazy: true,
        align: "right",
        caption: {
          text: "Power strip",
        },
      },
      text:
        "The Sonoff switch now works as expected we now only have to use it. I already have one smart power strip and I really like it. I can switch on/off multiple devices from WIFI, make an automation on it and also measure the consumption. This is why I chose to create another one. I like to monitor and control devices. So the very first step is to cut the wires of the power strip. Find a place where you wish to place the switch and cut the wires. Remove the outer insulation jacket for about 3-4 centimeters and 5 milimeters from the inner cables.",
    },
    {
      image: {
        alt: "Sonoff wiring",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3eHrJEzL4UFegwYXRfQlqpfFxuuTEWdpv4JGj2Zz0zX1NMbhhoUi3S3ytrVdCHTM16Qh0b2JYqRwakGGv5Bnp3A4xNiXRLpArfowNJMcwGQk3KPODMpkdFjY5gSW8NMcAZbJtKflJYtuj-vrLkfrsX6=w378-h504-no",
        avoidLazy: true,
        align: "left",
        caption: {
          text: "Sonoff wiring",
        },
      },
      text:
        "The wiring is pretty straightforward once you know which cable does what. So the very first and the most important is the **Ground**. It is the one colored green with yellow stripe. Make sure it will perfectly connect to the terminal block. If something bad happens this should be the very last wire which break out. The other two cables are Neutral which is blue colored and Line which is brown colored.\n\nThe Sonoff has the following inputs in order: **Line Output**, **Ground**, **Ground**, **Line Input**, **Neutral**, **Neutral**. Let's call the power strip part which goes to the outlet **Outlet** and call the other part where you connect devices **Device**. Connect the cables in order: **Device-Brown**, **Device-Ground**, **Outlet-Ground**, **Outlet-Brown**, **Device-Blue**, **Outlet-Blue**. Adjust the outer insulation jacket to allow properly fit for the closing part and put back the cover.",
    },
    {
      text:
        "**Congrats!** You are now ready to use your brand new smart power strip!",
    },
  ],
  time: 1600280214000,
};
