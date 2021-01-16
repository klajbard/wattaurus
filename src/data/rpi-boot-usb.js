export default {
  id: "rpi-boot-usb",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3f1RCV4LDHa_F4_7Udq8RvxmqH_AvZvN5eP-MlTBTmyvinxQDnPMYqdoE8IL6dvkd24nJHRGSxjIRX1dmGKNgQHLMalOv4BFQwDzetYxXLSXXeHl-q4Bc0ZjcsC-z_zJehS93VGXqQgFn4lz8LmASd9=w1000-h500-no",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3coguiwqDL7Tjz7iIa13lZcSQ9nGJ3BlfJJcuE4TPiFfQs6OKMjbQfxzZzOXxc2wtrxLGGbqSUvrXYZwvwRWnomfVCW9TvP9y8CkYnLuZ0eWDdTCLvJTJQsAMSY82EwviLg8Gpioc0kHhnxpOrQ_4kB=w300-h150-no",
    tiny: "rpi-boot-tiny.jpg",
  },
  title: "Raspberry Pi USB Boot",
  tags: ["rpi", "tutorial"],
  content: [
    {
      title: "Boot Raspberry from USB",
      image: {
        alt: "Raspberry Pi 4 Boot from SSD",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3f1RCV4LDHa_F4_7Udq8RvxmqH_AvZvN5eP-MlTBTmyvinxQDnPMYqdoE8IL6dvkd24nJHRGSxjIRX1dmGKNgQHLMalOv4BFQwDzetYxXLSXXeHl-q4Bc0ZjcsC-z_zJehS93VGXqQgFn4lz8LmASd9=w1000-h500-no",
        avoidLazy: true,
        align: "none",
        caption: {
          text: "Raspberry Pi 4 Boot from SSD",
        },
        style: {
          width: "100%",
        },
      },
      text:
        "<<Firmware update>> released on **20.08.2020** let us use any USB device to boot _Raspberry Pi_ from. This means to be able to use this feature in a painless and officially supported way _Raspberry OS_ should be updated to the previously mentioned version.",
    },
    {
      text:
        "By default _Raspberry_ boots from _microSD card_. A _microSD card_ of course has it's advantages like it's size, fairly good capacity and fairly good read/write speed. It's knows that a memory card tends to be easily corrupted if not unmounted properly so not very suitable for running operation systems. An _SSD_ compared to a _microSD card_ has at least **10x higher** read/write speed and is more reliable in overall.\n > I've used memory card for my first _Raspberry Pi_ installation and it died after 2 months. I've lost all my Home Assistant configurations, custom scripts and settings. I know I should've create a backup more often but I just simply didn't expect it to happen. That was the time when I had a small research on how to prevent this and I've came on a conclusion to use _M.2 SSD_ for booting the Raspberries. ",
    },
    {
      title: "Change Boot Order",
      text:
        "As mentioned earlier, a prerequisite is to have an OS already installed which is released after **20.08.2020**. If you don't have it yet, check out [how to install an OS on Raspberry](/posts/rpi-install). So if you alread have it installed, boot the Pi and open a command prompt if using GUI. Enter `raspi-config` for general settings and follow the next steps.",
    },
    {
      text:
        '1. Select **"Boot Options"**\n 2. Select **"Boot ROM Version"**\n 3. Select **"Latest"**\n 4. Reset Boot ROM to defaults? - **"NO"**\n 5. Select **"Boot Options"** again\n 6. Select **"Boot Order"**\n 7. Select **"USB Boot"**\n 8. Exit from the `raspi-config` and if prompted "Would you like to reboot?" choose **"NO"**',
    },
    {
      video: {
        alt: "Configure Boot Order",
        url: "https://cdn.wattaurus.com/9d66725ba2105f1833731ade5b7f334e.mp4",
        align: "right",
        style: {
          width: "100%",
        },
        caption: {
          text: "Configure Boot Order",
        },
      },
    },
    {
      title: "Copy SD Card over SSD",
      text:
        "❗The following steps require graphical interface.❗\n\n The Raspberry will now boot SSD if SD Card boot fails, all we have to do is to create a bootable USB device. This can be done by using the same approach as mentioned in [Flash OS to SD Card](/posts/rpi-install#FlashOStoSDCard) but this time choose USB device. However, I would suggest to use the following method in order to save all previous settings and data on the Pi.",
    },
    {
      image: {
        alt: "SD Card Copier",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3fRVum2kYGHkilOPD7c5XXU2OZvtayIwArKRDDGO9pBaQ_0dHntRzP3fyPvWFEvWgXaPhMCoOUkps_HMPKu-NMw2WwzEBYq0A9LJzS5rjA9c6K9S2agQRg3CiAeQoBxsqJFoqo03u23AKTs-niWLQfL=w507-h394-no",
        avoidLazy: true,
        align: "right",
        caption: {
          text: "SD Card Copier",
        },
      },
      text:
        'More comfortable way is to simply copy data from SD Card to SSD using Raspberry. It will copy all data and create a bootable SSD. It is now time to plug in the USB device which you want to boot from. If the board allows make sure to plug it into an USB 3 port. Go to "Start Menu" search for "Accessories" and open "SD Card Copier" software. The **SD Card Copier** can backup existing Rasperry OS installation. In addition it, is also a great tool to directly run the Pi from a backup card or USB device if the original somehow got corrupted. In this case simply reverse the process. Just bear in mind that on the destination card or USB device everything will be overwritten.',
    },
    {
      image: {
        alt: "Copy from SD Card to SSD",
        url:
          "https://lh3.googleusercontent.com/pw/ACtC-3enyzeA9nM6bmUwemTYadeqT7sc9f6sjRfLBSzi-oLbLdahjdudMICor_Px52sjUfjzFDx3LM8Zd0m1xFCOllnkX2iS8ih1JjfrObPnJ_nz_CvQnTVS6nk-RhGQsv2fG8pLQ_DiIXbIsv4oH1XE7ox2=w322-h142-no",
        avoidLazy: true,
        align: "left",
        caption: {
          text: "Copy from SD Card to SSD",
        },
      },
      text:
        'To copy over files pick SD Card from the "Copy From Device" dropdown and choose the SSD from the "Copy To Device". Click on "Start" and choose "Yes" to overwrite existing data when prompted. It usually takes 3-5 minutes to copy. Once it\'s done shutdown the Pi, remove the SD Card from it and boot it.',
    },
    {
      title: "Conclusion",
      text:
        "You should feel the speed already. It should boot much faster than before. Remember to regularly do a backup of your system (or at least the useful part) because switching from SD Card to SSD doesn't eliminate the possibility for potential data loss.",
    },
  ],
  time: 1601282110000,
};
