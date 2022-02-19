export default {
  id: "photoresistors",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3ftIMrFVsgWr85Yg04HrfptJdZMBxLXuf7lyNi9ffoWtnqgc3dJaP7RkvcRSi04IFjmwtHhFE5nYcvNIPSvmxnqcCbhnzKjXLnzIYLP5xBkzXPUkZW0TmywudWDoguf6Xl1HO0i66onDHSvE8pKg9OL=w1347-h674-no?authuser=0",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3dT3GhSZSPpObNQxYpX4H4T7iRm1MdGJyjgkIoR3v2eOUD5BhWSX7tDN9lCiBt8zFZSt2BRjM9vAQJ7VQx5usLnk-TMGpM6Se1F1l1K-o6zeb95YpPoMz2gx-9zqZ-LtaC4HFyhkm0gVYO5j3XwYFNp=w300-h150-no?authuser=0",
    tiny: "photoresistor-tiny.png",
  },
  title: "Photoresistors",
  tags: ["photoresistor", "arduino"],
  content: [
    {
      image: {
        alt: "Photoresistors",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3fBMMcvne4B_zXQbuq5U880tnBvrcIYC6fkPsiyzPq1XvJYwkAJz5T_Mq-FyDZgAJzvedzh173xxUCmJEMqGFHZWSFLv5sP6VR1Gj7SVPD5yRj_eQqfo556v2RJzFlN6niqFPLNJAx8SigRqkzkaNrZ=s953-no?authuser=0",
        avoidLazy: true,
        url_tiny: "",
        align: "left",
        caption: {
          text: "Photoresistors",
        },
      },
      text: '<<Photoresistors>> are one of the easiest sensors to play with but can be an input for many more complicated systems. Photoresistor - also known as LDR, Light Dependent Resistor - is kind of a resistor which resistance changes based on the intensity of the light it absorbs. More specifically, increasing the light intensity on the photoresistor results in absorbing more photons which causes the current flows through photoresistor to decrease. The name is the combination of _"photon"_ which is a particle of the light, and _"resistor"_ meaning it resists the electric current. This is because it consists of a semiconductor which acts like a variable resistor.',
    },
    {
      text: "Photoresistors, like regular comes in different sizes, with different values and made from different semiconductors. It's inside a mini package coated with epoxy. It is overall very solid but be careful around the pins near the head as they tend to break very easy.\n > Photoresistors are most commonly made of CdS (Cadmium Sulfide - the brownish zig-zag line on the resistor between the electrodes) which is a toxic and extremely dangerous when inhaled so please don't break the photoresistor and sniff the inner parts.",
    },
    {
      title: "Specification",
      image: {
        alt: "Relative sensitivity over wavelength",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3foK7hpLtcJ8HYQy1CC2WAVqdwYE47KSxUVzmeTQ26yEruhFWPQQvw5wSWXL2xbiiVqgZt-CEIfTqdLPXIO5eRjmbkim-kOOZqt0FFtyyI5VQoxw8K9IuJSOUEP7bPs-iIkw0bF7N9OOKzwzwSp0CRL=w490-h273-no?authuser=0",
        avoidLazy: true,
        url_tiny: "",
        align: "right",
        caption: {
          text: "Relative sensitivity over wavelength",
        },
      },
      text: "However, it's not that easy to measure the current resistance of it because it highly depends on the surroundings. In my example I will use photoresistors in the _GL 55 Series_. These have a max voltage of around **150 V**, max power around **95-100 mW**. It operates in **-30~+70 °C** environment. It has a spectral peak on **540 nm** but tends to be sensitive only in the interval of **450-650 nm**. The _GL 55 Series_ has different light and dark resistance which is shown in the following table.\n\n| _Model_ | _Light Resistance (KΩ)_ | _Dark Resistance (MΩ)_ |\n|:-:|:-:|:-:|\n| **5506** | 5-10 | 0.5 |\n| **5518** | 10-20 | 1 |\n| **5528** | 20-30 | 2 |\n| **5537** | 30-50 | 3 |\n| **5539** | 50-100 | 5 |\n| **5549** | 100-200 | 10 |\n\nTo sum up the previous data it is visible that a typical photoresistor has a minimum resistance (in bright light as **10 LUX** level) of **5-100 KΩ** and a maximal resistance _100_ times the minimal **0.5-10 MΩ**. That's more than enough to know about photoresistors by now.",
    },
    {
      title: "How to use",
      text: 'The usage is as simple as using a resistor. The pins are not polarized, so can safely switch directions. The only requirement is a pull-down resistor with a value between **1-10 KΩ**.\n> Pull-down (and pull-up) resistor is needed to provide a stable **LOW** (or **HIGH**) signal for the microcontroller when no signal is given to the input pin.\n\n Let\'s use a **1 KΩ** now and put it in series of the photoresistor. Let\'s connect to the board but make sure it has an analog pin.\n> Microcontrollers have several GPIOs which are used to read and write signals(let\'s ignore the _VCC_, _3.3V_ and _GND_ pins now)and we can group them in two way: _digital_ and_analog_ pins. Digital pins have a capital "D" before the name of the pin (like _D0_, _D1_, _D2_) and analog ones have capital "A" (like _A0_, _A1_, _A2_).',
    },
    {
      image: {
        alt: "Photoresistor and Arduino UNO",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3esmu5SFgbiAKf5fvV6GQcsZSGZoazQBB07PhKZI4WV5TB40rpcZWQdHoB-95C1gPF4wL626fUxVweXn7eNBX7VhLrZPbK2dwSiP7BaqflRj7MVXR0qnmEoVl3fIsYYhdS7J2jxsZOtXPOUXIjZidj-=w1119-h800-no?authuser=0",
        avoidLazy: true,
        align: "left",
        caption: {
          text: "Photoresistor and Arduino UNO",
        },
      },
      text: "Let's connect one of the resistors pin to the _GND_ of Arduino Uno and one of the pins of the photoresistor to _5V_. Connect the other pin of the resistor and the photoresistor with _A0_. Now we are going to read the value of the photoresistors value. \n > The current circuit now implements a [voltage divider](https://www.circuitbasics.com/what-is-a-voltage-divider/)\n\n Now we are able to read the sensor which we just put together. The following sample code provides a pretty simple way to do this. It reads the _A0_ of the Arduino and simply puts it to the [serial port](https://arduinogetstarted.com/tutorials/arduino-serial-monitor). Here we theoritically expect a number between **0-1023** which is mapped to the **0-5 V** range but this vary based on the pull-up resistor and the photoresistor used. The brighter it is the `light` will be higher.",
      code: {
        source:
          "float light;\nvoid setup() {\n  Serial.begin(9600);\n}\nvoid loop() {\n  light = analogRead(A0);\n  Serial.println(light);\n  delay(2000);\n}",
        language: "cpp",
        title: "photoresistor.ino",
      },
    },
    {
      title: "Motivation",
      text: "I also put together a very basic solar lamp. It uses photoresistor to detect whether it should light up the _LED_ or not. It is powered by a 18650 battery which is charged by the solar panel. I plan to create a more detailed walkthrough for it.",
    },
    {
      image: {
        alt: "Homemade solar lamp",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3dM6p5tovWOyDdFQh2Raeu_XMTuqrqnj0lnnljB2BLy91RfzGVHHECcf7l8mJf1_LtgBLQzoK9deBffnG9drxJVxjzgOTFRyQYCcWps8osF0S6dEjRYzab4bqr6u_rLYgr_D736aUL9lXy8N6PmsUAN=w1200-h600-no?authuser=0",
        avoidLazy: true,
        url_tiny: "",
        align: "none",
        style: {
          width: "100%",
        },
        caption: {
          text: "Homemade solar lamp",
        },
      },
    },
    {
      title: "Conclusion",
      text: "Photoresistors are used in many areas like outdoor lights, automatic window blinds, timing gates for race events and even the CD/DVD readers (if you still remember it) use it. Now you can see that such a simple component can be the basic building block of a more complex system. I hope you enjoyed it and alread thought of some cool usage for it!",
    },
  ],
  time: 1601569990000,
};
