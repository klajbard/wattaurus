export default {
  id: "zigbee",
  pinned: true,
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3dxA74yBGwrXDJZHi3lVLMqSbycKfTBSLQIQkZPJJPRV0CF3xnlCLgzcH4Fu2GdgshIFUpucVn5Mu_XOl54kd50fOigQ4yT5OWJF3V5pK8jHe-Qo3LX8h4Nb4ggE_GOn4p9qU-WomVDZopzexkLeUyr=s954-no?authuser=0",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3dBfV1dbDq0fsC94KHBO8LgEMpJfuhfCKGreHm_PXduue3jhgs3JShlfDY3MXsrUDE7lMYHND38jADqpoQXC-F8FdN55quLysZ3QqAXXchfAPwlc3-ulFk6tLAO8nh4q3WPjwNRc7bZt3_8rG7P-0DP=w300-h150-no?authuser=0",
    tiny: "zigbeedevices-tiny.jpg",
  },
  title: "Zigbee",
  tags: ["sensors", "zigbee"],
  content: [
    {
      image: {
        alt: "Typical Zigbee devices",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3dxA74yBGwrXDJZHi3lVLMqSbycKfTBSLQIQkZPJJPRV0CF3xnlCLgzcH4Fu2GdgshIFUpucVn5Mu_XOl54kd50fOigQ4yT5OWJF3V5pK8jHe-Qo3LX8h4Nb4ggE_GOn4p9qU-WomVDZopzexkLeUyr=s954-no?authuser=0",
        avoidLazy: true,
        align: "right",
        caption: {
          text: "Typical Zigbee devices",
        },
      },
      text: "<<Home automation>> - in terms of IoT - describes the behavior of a smart home network (or set of networks). The smart home can be represented as a graph which consists of small building blocks as nodes like sensors, controllers, feedback devices etc. The edges between these nodes are the communication channels over various protocols both wired and wireless. It is possible to use more protocols next to eachother but requires proper device which can receive and process the packets. This is usually called a _hub_ and supports communication over multiple protocols and can translate between them.",
    },
    {
      title: "WiFi",
      text: "The most known protocol to connect devices over a **Wireless Local Area Network(WLAN)** is **WiFi**. Wifi has a star topology meaning all the connected devices highly depend on a central hub. Assuming the device can support only _2.4 GHz_ frequency still has a pretty good data rate as up to nearly **300 Mbit/s**. Approximate range is up to **70-100 metres** indoors which is pretty good and can be slightly extended with repeaters to cover a bigger area. The big disadvantage of Wifi is the power consumption. It drains battery hard. Some device optimize battery life by turning off WiFi while in idle state. Other downside is that many smart home devices which comes with WiFi only support relies on the cloud. In few cases it can be bypassed and use it only Local Area Network wide by blocking communication from outside. For example Alexa from Amazon cannot operate without being connected to the cloud",
    },
    {
      title: "Zigbee",
      text: "Zigbee is a protocol specification of personal area network for low-power wireless devices. The specification is simple and secure as it only communicates on local network. Because of the low consumption it has only about **10-20 metres** of range but the mesh topology makes it _infinite_. The mesh network means it is not centralized and allows communication between any nodes.\n >Let's assume we have a 80 metres long house with walls. We have a Zigbee light bulb in each rooms. Whenever we want to switch of the farthest bulb we send a package to the network and they try to find the addresse in a self-organizing way to execute the event. This means we do not connect and send package to the central hub but send package to the nearest node which can receive and handle data. It will then know whom to forward it.",
    },
    {
      text: 'They usually have extremely low consumption allowing a sensor to run for **over a year(!)** with a sigle coin cell battery. The only tradeoff is the previously mentioned range and also it has much smaller bandwidth compared to WiFi. It has a defined rate of **250 kbps** speed. These advantages and disadvantages made **Zigbee** widely used in low data rate applications for example home automation. It perfectly fulfills the technique of _"assemble and forget"_ thanks to it\'s low power consumption.',
    },
    {
      image: {
        alt: "Zigbee network with 1 Coordinator, 3 Routers and 14 connected devices",
        url: "/zigbeenetwork.svg",
        avoidLazy: true,
        align: "none",
        style: {
          width: "100%",
        },
        caption: {
          text: "Zigbee network with 1 Coordinator, 3 Routers and 14 connected devices",
        },
      },
      text: "In a Zigbee network there are 3 roles a device can play: coordinator, router and end device. The key difference between them are the responsibilities.\n\n**End devices** are simple devices joined to the network and are able to comminucate with routers. End device is a device which sends data and is idle in most of the time. Whenever sending a data it will send a message to the router and go to sleep afterwards. End device is responsible to notify the network upon joining or changing parent router.\n\n**Routers** are managing traffic between nodes. They do not sleep, they needs to be awake to receive and store messages from any children at any time. They can allow joining new nodes to the network.\n\n**Coordinator** is a special kind of router. It handles traffic routing and is responsible to shape the network. It authenticates new nodes and assigns network keys to newjoiners. There is always **one and only coordinator** in a Zigbee network.",
    },
    {
      title: "Summary",
      text: "| | Zigbee | WiFi |\n|:-|:-:|:-:|\n| Data rate | 250 Kbps | Up to 1200 Mbps (802.11ax) |\n| Distance | 10-20 meters | 70 meters(802.11n) |\n| Topology | Mesh<br/>(anyone can be router) | Star<br/>(centralized access point) |\n| Operating frequency | 2.4 Ghz | 2.4 Ghz/5 Ghz |\n| Consumption | Extremely low | Higher |\n| Theoretical size of network | 65,000+ | 2007 |",
    },
  ],
  time: 1602266813000,
};
