export default {
  id: "policelight",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3eVvKhZUTM1tgQjibVBTN2VzGpBUFzB2owtih0ioyJnziYJ4ax1m9zaiwLEvs4bXNbMLGTIBnp620xJdOtj0Oz-ERqOZeTHxYZu5yziD-ddSlWmtAXUP9bLdReE53Y92TZ00Tg0782ZTSGBX1fuBARH=w1073-h537-no?authuser=0",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3d6DPmKrAG8084yIj5hE5ePDH_huXjpnPE7E_6Ykc4IMiNzc9ZSmHnwT79WkossQ229NulJbr85kMme4nMRzzSpvdlV7VfzVEBITg3K_GjwQhW2LjH-BZ5yL-HrBD_DvuLjvlZG-eacOROpdjBWhMZQ=w300-h150-no?authuser=0",
    tiny: "ne555policelight-tiny.png",
  },
  title: "NE555 Based Police Light",
  tags: ["ne555", "LEDs"],
  content: [
    {
      image: {
        alt: "NE555 based LED sequence blinker",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3eVvKhZUTM1tgQjibVBTN2VzGpBUFzB2owtih0ioyJnziYJ4ax1m9zaiwLEvs4bXNbMLGTIBnp620xJdOtj0Oz-ERqOZeTHxYZu5yziD-ddSlWmtAXUP9bLdReE53Y92TZ00Tg0782ZTSGBX1fuBARH=w1073-h537-no?authuser=0",
        url_tiny: "ne555policelight-tiny.png",
        align: "none",
        caption: {
          text: "NE555 based LED sequence blinker",
        },
        style: {
          width: "100%",
        },
      },
      text: "The NE555 timer IC is one of my favorite component. All it does (which comes from it's name) is to allow us the timing for different actions based on inputs/outputs of the board. In this example I will show you have to create a simple police light by soldering some basic electronic parts together.",
    },
    {
      title: "Required parts",
      text: "- **NE555 Timer IC**\n- **3 x 1 kΩ**, **1 x 470 kΩ** resistor\n- **2 LEDs** (preferably red and blue)\n- **1 μF** and **100 μF** capacitors\n- Battery (preferably 5 - 9 V) \n- Enough wire to cut into ~15 pieces\n\n",
    },
    {
      title: "Solder together",
      text: "Seriosuly, based on the following small video, it should be straighforward. The only thing you should watch out for is the pin order of the NE 555 chip. In the example the NE 555 chip is rotated 90° counterclockwise like it is shown in the image above (_NE 555 pinout_). Please follow the steps one by one and in the end you will have a blinking police light. Feel free to pause the video at any time.",
      image: {
        alt: "NE555 pinout",
        url: "/ne555.png",
        avoidLazy: true,
        align: "none",
        caption: {
          text: "NE555 pinout",
        },
      },
    },
    {
      video: {
        alt: "Soldering steps for police light on NE555",
        url: "https://cdn.wattaurus.com/bbdfa0592660576b0718013808eb2dd8.mp4",
        align: "none",
        caption: {
          text: "Soldering steps for police light on NE555",
        },
        style: {
          width: "100%",
        },
      },
    },
    {
      title: "Result",
      video: {
        alt: "Police light on a LEGO vehicle",
        url: "https://cdn.wattaurus.com/b26ce683584b8aeebc091a4ccaf2eb50.mp4",
        align: "none",
        caption: {
          text: "Police light on a LEGO vehicle",
        },
      },
    },
  ],
  time: 1610632320845,
};
