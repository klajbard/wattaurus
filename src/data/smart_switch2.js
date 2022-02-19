export default {
  id: "smart_switch2",
  cover: {
    normal:
      "https://lh3.googleusercontent.com/pw/ACtC-3dPKpMCtj_9R8PgF3N6DRXlZzw96IkVxmttaUMNsoazgaV0rLCzRdRwKKA-sCGl0TKtmrK6E2Ibd8PFeAqfC7q-kSgmiKo83OiGr8_m3NrypeJt19H7MpKH1JS_ubL3Rg-vXCTbv-DErshuUaLer_vK=w726-h290-no",
    thumb:
      "https://lh3.googleusercontent.com/pw/ACtC-3ew0_16pBxZixnTPAJWtq-H8dglNak1SrW5l8IeHuvILMJHbsC1HtMyU9h9UiFRz7rH-h8Shd4K1WRwMhC7_JgxjtsTyU34JbCYq0ax2V1ytX2bMaBdmPD-7zE8X_psrY_f6mYyPiYFOKFZUrSbO7fl=w300-h150-no",
    tiny: "hassdash-tiny.png",
    dark: true,
  },
  title: "Smart power strip pt.2",
  tags: ["homeassistant", "tasmota", "mqtt"],
  content: [
    {
      image: {
        alt: "Homeassistant",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3eFWPBjGkoEFROPJQToyF9V2KAaNtyfO14qXkC9VJXAtSA9QAvcXyDRnlgp4gSYC4oozMe33huPNIVxHY_GJrRHgjWHTfHJnJX36traGgWJAmm5bfGctA3kTq1noL6f5TxWKZpr-6RmDpAGmMEMzS-L=w720-h360-no",
        avoidLazy: true,
        align: "none",
        style: {
          width: "100%",
        },
        caption: {
          text: "Home Assistant Dashboard detail",
        },
      },
      text: "<<While writing>> [How to create a smart power strip](/#/posts/smart_switch) I've decided to split it into two parts. In this part I will guide you through the integration process with [Home Assistant](https://www.home-assistant.io/). \n > Home Assistant is an open source software which brings the future one step closer to us. It can be installed on a Raspberry PI as an OS or used in a Docker Container. It is mostly focuses on local environment and local network helping to strengthen the privacy. Come with a highly customizable dashboard, configurable automations with over 1600+ [integrations](https://www.home-assistant.io/integrations/) available thanks to the huge and rapidly growing [open source community](https://github.com/home-assistant/core).",
    },
    {
      image: {
        alt: "Tasmota MQTT settings",
        url: "https://lh3.googleusercontent.com/pw/ACtC-3fCTPwWQA26cpCu7BRSvRU6bxnh6z9sFTmiqRlIh7t3d5wr_Rz7ph5h_GverRZzBKdwrgbxQ9xjW4j4gQ8P2afKqNtMFKfz7Lpt-AVayY6fB8cm2AO0vgngQyDsJCyWYjUK0PSN4ofQjSZQ1uNODaNf=w633-h731-no",
        avoidLazy: true,
        align: "right",
        caption: {
          text: "Tasmota MQTT settings",
        },
      },
      text: "Let's jump into it! I assume you already got a working Tasmota installed on the device. Head to the Tasmota dashboard by entering the IP address of the device to the browser's URL bar. Click on *Configuration* then *Configure Others* and make sure the **MQTT enable** checkbox is *selected*. Now head back to *Configuration* and click on *Configure MQTT*. This is the place where we can configure the MQTT settings for the device. First, set the **Host** and the **Port** of your MQTT broker. There are several ways to run an MQTT broker, but might be the easiest is to just run on the same device as the Home Assistant installed. Leave the **Client** as is, because in most cases we don't need unique identifier unless using MQTT service provider which requires it. Enter the **User** and **Password** to be able to authenticate the device. Setting **Topic** is also recommended to avoid name duplication if multiple device is used. The default setting for **Full Topic** is fine. Click on *Save* and the device will restart soon.",
    },
    {
      text: "Once the Tasmota is ready to submit MQTT messages, head to your mqtt broker and check out if it actually sends the messages to the right place. Subscribe to the topic `tele/powr2/SENSOR` and wait for the message to appear. It should appear latest in *5 minutes*, as the default sending period is *300 seconds* on the Tasmota. ",
    },
    {
      title: "Configuring Home Assistant",
      text: "Once the device with Tasmota sends messages to the MQTT broker we now just need to integrate it with the Home Assistant. There is basically two parts to be added. One is the switch button itself to turn the switch ON/OFF and then the initialize the sensors which reads the consumption value from the MQTT broker.",
    },
    {
      text: 'First let\'s add the switch. It\'s a simple MQTT switch we are going to implement. This will allows us to control the switch. Set the **platform** to `mqtt` and give the switch a **name**. The Tasmota switch should have a **state_topic** already where the state changes are published. It has the default naming pattern of `"stat/{name}/POWER"` which is `"stat/powr2/POWER"` in our case. The **command_topic** is the topic where we actually post the updates when we will change the switch\'s state on the Dashboard. Set this to `"cmnd/powr2/POWER"`. **payload_on** and **payload_off** are the payload which represents the state of the switch. This value is used as the payload to be piblished when switching the state and also for comparing the value in the **state_topic**. Set these value to `"ON"` and `"OFF"`. There is another topic we want to subscrib called **availability_topic**. It is the topic to receive availability updates from the device. Set it to `"tele/powr2/LWT"`. I like to make sure that the message is arrived, so I set the **qos** to `1`.\n > Theres is 3 levels in QoS. QoS Level 0 means the message is sent to the MQTT broker but forgets if right after without any confirmation. QoS Level 1 means to send the message at least once until the broker sends back a receipt of the message. QoS Level 2 is the highest level ensuring the message is only sent and received once which consists of at-least 4 messages in a tree-shake model.',
      code: {
        source:
          'switch:\n  - platform: mqtt\n    name: "powr2"\n    icon: "mdi:power-socket-de"\n    state_topic: "stat/powr2/POWER"\n    command_topic: "cmnd/powr2/POWER"\n    payload_on: "ON"\n    payload_off: "OFF"\n    availability_topic: "tele/powr2/LWT"\n    payload_available: "Online"\n    payload_not_available: "Offline"\n    qos: 1\n',
        language: "yaml",
        title: "configuration.yaml",
      },
    },
    {
      text: 'Adding the sensors which reads the values are more simple. Simply add 2 MQTT sensors, give them a name and add a **state_topic** where the device sends the sensor data: `"tele/powr2/SENSOR"`. The messages in the topic contains JSON objects with several values but we only need the part of it. Add **value_template** to allow parsing the incoming payload coming from the device. `"{{ value_json.ENERGY.Power }}"` retrieves the current Power and `"{{ value_json.ENERGY.Today }}"` gives the sum power consumption for the current day.',
      code: {
        source:
          'sensor:\n  - platform: mqtt\n    name: POWR2 Current\n    state_topic: "tele/powr2/SENSOR"\n    value_template: \'{{ value_json.ENERGY.Power }}\'\n    unit_of_measurement: "W"\n    icon: "mdi:flash"\n  - platform: mqtt\n    name: POWR2 Today\n    state_topic: "tele/powr2/SENSOR"\n    value_template: \'{{ value_json.ENERGY.Today }}\'\n    unit_of_measurement: "kWh"\n    icon: "mdi:flash"',
        language: "yaml",
        title: "configuration.yaml",
      },
    },
    {
      text: "After a quick restart in Home Assistant we are now able to add the switch(`switch.powr2`) to the dashboard and start switching on/off and also add state sensors as `sensor.powr2_current` and `sensor.powr2_today`.",
    },
  ],
  time: 1600527323000,
};
