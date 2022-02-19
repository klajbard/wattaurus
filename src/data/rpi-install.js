export default {
  id: "rpi-install",
  pinned: true,
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3f87tQz4o0o1KlFODk5IDEo5szzf9YGkAy9Bd4wRS0V0ruTn8yHe1IFoT4n23mfgSTbNzElSuwdPW24eH9RS4qNEhCkA-T7y5q3XtfSNF-RmskJNvYAGX4X3hjs-s5gBwVGWqh0ZHppOUxY78KSktVJ=w999-h500-no",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3dH04ABHeL4UMtjb5D6ew9fn6IM4F1ml3vVl18zU3xivDCHZKUqIp4gLjR0HsGcHGaEwW4XIlUAdk1b1Hx4PkLhEREZESRtqXjNco1MnRkUpL8kgBVjwGohMb0FTjpUy2SNfuvUToq9G6PSFmdUD5iX=w300-h150-no",
    tiny: "rpi-install-tiny.jpg",
  },
  title: "Raspberry Pi install",
  tags: ["rpi", "tutorial"],
  content: [
    {
      image: {
        alt: "Raspberry Pi Generations",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3f87tQz4o0o1KlFODk5IDEo5szzf9YGkAy9Bd4wRS0V0ruTn8yHe1IFoT4n23mfgSTbNzElSuwdPW24eH9RS4qNEhCkA-T7y5q3XtfSNF-RmskJNvYAGX4X3hjs-s5gBwVGWqh0ZHppOUxY78KSktVJ=w999-h500-no",
        url_tiny: "rpi-install-tiny.jpg",
        avoidLazy: true,
        align: "none",
        style: {
          width: "100%",
        },
        caption: {
          text: "Raspberry Pi Generations",
        },
      },
      text: "<<Raspberry Pi>> is a single-board computer which was created for teaching computer science in schools. The board became very popular in no time and they use it widely from science to even using as a personal computer. It has HDMI, Jack and USB ports and some boards even has ethernet and wireless capabilities such as WiFi and Bluetooth. It supports all the common peripherals like keyboard, mouse, headset or display. There are lots of advantages to use it, let me just highlight few of them. **Size** is what comes very first. It has a dimension of _85 mm x 56 mm_ which is almost as big as a plastic card. It has a fair **low cost** in range of _$5-80_ depending on the specification. From _$50-60_ you could even have a fairly decent PC for browsing the internet. Another huge advantage is the ability to **prototyping**. It has 26/40 general purpose input-output_(GPIO)_ and most of them can be programmed. Some board also have Display Serial Interface and Camera Serial Interface. I could go on listing all the awesome specification which the board has... So let's dig a bit deeper on how we can actually install an Operating System on it.",
    },
    {
      title: "Get Pi OS Imager",
      text: "The Raspberry Pi by default boots from an SD Card. It is recommended to have at least a **32GB SD Card**, but for a simple installation a 16GB will do. We are going to install the officially supported **Raspberry Pi OS** - formerly _Raspbian_. They recently made an awesome tool called [Raspberry Pi Imager](https://www.raspberrypi.org/downloads/) a software which creates a bootable SD Card with a preferable OS.",
    },
    {
      text: "Let's grab the [installer](https://www.raspberrypi.org/downloads/) which is available for Linux, MacOS and Windows. The installation shouldn't take more than few seconds. As usual I took the Linux option and downloaded the _deb_ package. To install it simple run dpkg",
      code: {
        source: "sudo dpkg -i imager_1.4_amd64.deb\nsudo apt update",
      },
    },
    {
      title: "Flash OS to SD Card",
      video: {
        alt: "Burning RPi OS to SD Card",
        url: "https://cdn.wattaurus.com/9d66725ba2105f1833731ade5b7f334e.mp4",
        align: "right",
        caption: {
          text: "Burning RPi OS to SD Card",
        },
      },
      text: "Now let's open the Raspberry Pi Imager. On the first window it is possible to choose the OS to burn into the SD card, now we are going to set **Raspberry Pi OS**. Click **Next**. Here you should select the SD Card from the list. It doesn't needed to be formatted previously because the software will do it for you. Click **Accept** data loss on sd card and click **Install**. Can take up to 5-10 minutes depending on the OS and the speed of the SD Card.",
    },
    {
      title: "Configure WiFi (Optional)",
      text: "By default the Raspberry will not join any network unless we plug Ethernet cable into it or specify the network settings. If we have the possibility to plug an Ethernet cable into it - we have an easy job - just plug it in. If the surroundings doesn't allow us to do or we just want to, we still have an other possibility to preconfigure wireless settings. Create a file called `wpa_supplicant.conf` and fill with the following data. Obviously change your `country`, `ssid` and `psk` accordingly. They represent the 2 letter ISO country code of your region (must set properly else it won't join the network), and the WiFi SSID and password.\n > Keep in mind that only the following boards support 5GHz WiFi RPi 3 Model A+, RPi 3 Model B+ and RPi 4 Model B.",
    },
    {
      code: {
        source:
          'country=HU\nctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev\nupdate_config=1\n\nnetwork={\n    ssid="NETWORK-NAME"\n    psk="NETWORK-PASSWORD"\n}',
        title: "wpa_supplicant.conf",
      },
    },
    {
      title: "Configure SSH (Optional)",
      text: "SSH is a protocol which allows to manage secure connection between computers. To be able to connect to Raspberry via SSH after initial boot just create an empty file called `ssh` under the _/boot/_ partition of the SD Card. This will tell the Raspberry on initial boot to enable SSH. This way, right after the first boot we are able to SSH to it via the port 22 using the username **pi** and the password **raspberry**.",
    },
    {
      title: "First boot",
      text: "Put the SD Crd into the Pi and let's boot it  by plugging into an outlet. If all goes well the red light will light and the board will boot in no more than 20 seconds. You should now see it in your network and be able to SSH into it. When you SSH the first time it will ask you to change the password immediately. To do so enter the `passwd` command as suggested and create a new password which should be used next time when logging in into the Pi.",
    },
    {
      image: {
        alt: "SSH after boot",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3cpFJLdGjJsIQBHrzwOVXJtm4mqTjPlLVqavGIq92u1YqgdHR_oJ9KtZbknYceDgc69EhKKZcMjockHWlarMaCr7KJq9OTcTDKhQBrQeIkCrLEG-rz42jHKYFDr0-6QOIwpKGWf3ooIIC7Quk1hJ-f2=w747-h476-no",
        avoidLazy: true,
        align: "none",
        caption: {
          text: "SSH after boot",
        },
        style: {
          width: "100%",
        },
      },
    },
    {
      title: "Enable VNC",
      text: "By most of the time SSH is more than enough to access the Raspberry but there are situations when GUI is required. Of course you can already have the desktop if you connect a display to the Pi, but most of the times you won't. VNC allows remote control of a computer which is available on the Pi. To allow incoming connection we should first **enable VNC Server** it in the `raspi-config` settings.",
    },
    {
      video: {
        alt: "Burning RPi OS to SD Card",
        url: "https://cdn.wattaurus.com/690205b9571a8956ff815b6a78191aaf.mp4",
        align: "right",
        style: {
          width: "100%",
        },
        caption: {
          text: "Burning RPi OS to SD Card",
        },
      },
      text: "The Raspberry Pi GUI is now accessible, only a client should be installed on your desktop where you want to initiate the connection from. I prefer to use [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/). It is fairly easy to use the software. Simply enter the IP address of the PI and enter the username **pi** and the password you previously set.",
    },
    {
      text: "**That's it! You now have a fully featured pocket PC installed and ready to use!**",
    },
    {
      title: "Next steps",
      text: "Check out the guide on [How to Boot Raspberry Pi from USB](/posts/rpi-boot-usb)!",
    },
  ],
  time: 1601053321000,
};
