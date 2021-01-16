export default {
  id: "rpi_lego",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3chjTjlB9Dcv4e_HozTvpcCscbIBhifP-9XtpQ8NkyS7AKuRCvvUwQmOq1wEQalWic5JTmS0axbKSob7C9_1ingvXNdrVAoQLeYUYXfo30Vxg_tlh7qqTn8sh5tF_dKhkDX9wngVh5u4-BIrKM_z3mh=w1216-h912-no",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3d6Kumzx184qZ7nzeP6XgmGZnONRrUSfpl8S57XI2k9J72VKGzGWsTjO_Vf96z_pL6--lENc1n0MFGdspYrcAYiAvN4-TGUzdnoCPNag-oZI2ZxLF0UrEMbGFvRoxQMpYduycLKPCBio3iKX6Zy0sM6=w300-h150-no",
    tiny: "rpi-lego-tiny.jpg",
  },
  title: "LEGO Raspberry case",
  tags: ["rpi", "lego"],
  content: [
    {
      video: {
        alt: "Welcome",
        url: "https://cdn.wattaurus.com/a87635a52bdda6de6d5580f610cc0f6f.mp4",
        align: "left",
        caption: {
          by: "wattaurus1",
          via: "Instagram",
          url: "https://instagram.com/wattaurus1",
        },
      },
      text:
        "<<Ever though>> you want to have a unique Raspberry Pi case? Do you like playing LEGO? My answers were yes to the previous questions. So you know what? I've decided to build my own RPI case using LEGO blocks. I've gathered my LEGO collection and spent some time on investigating the shape and the color of the case. After grouping the building blocks I've chosen the color red and black as they look pretty neat in pair. The next step was to choose the size of the base area. The [Raspberry Pi 3B+](https://www.raspberrypi.org/documentation/hardware/raspberrypi/mechanical/rpi_MECH_3bplus.pdf) occupies the same size as a 12x7 Lego Unit. This means a size of 14x9 would be perfectly fine for the base.",
    },
    {
      title: "Layer 0",
      text:
        "So I've chose to create 2 layers of plain Lego bricks because of the proper bonding as 14x9 is not a size which can be covered easily with standard sized pieces. After the base is stable enough I've put some support pieces to stabilize the Pi.",
    },
    {
      title: "Layer 1",
      text:
        "Next step was to start building the borders. The first layer is the most tricky. It is necessary to keep in mind, that the Pi has strange [mechanical footprint](https://static.raspberrypi.org/files/product-briefs/Raspberry-Pi-Model-Bplus-Product-Brief.pdf). An SD Card slot under, 3 connectors on the side (2 with the size of 2 unit and 1 with 1 unit) and finally the USB ports on the back. On the back I simply put some supporter bricks. On the side I've put plain bricks where the ports are and simple bricks to fill the gaps between. On the front for the SD Card slot it is the best to put something which can be opened or moved (like a car door). The forth side can be built as is.",
    },
    {
      title: "Layer 2, 3",
      text:
        "The second layer should follow the schema of the first one (gaps for the side ports and for the USB at the back). The third layer is the most simple. From now on the Raspbery Pi won't obstruct to create a continuous wall around it. A minor thing needs to considered, which is the heat the board dissipates. To allow a proper air circulation I used some bricks with holes in it. Although I know there was enough gap near the USB and other connectors and PI already should have some heat sink, it just shouldn't hurt.",
    },
    {
      title: "Layer 4+",
      text:
        "Starting from the 4th layer it is fully customizable. It's up to you if you want to close the box with some fancy stuff, or keep it open. I personally wanted something which allows me to access the pins as I wanted to attach some sensors to it. So I've chosen to have some rooftop elements on the side and have an openable grid looking door on the top.",
    },
  ],
  time: 1599855922000,
};
