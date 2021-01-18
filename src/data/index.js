import sevensegment from "./sevensegment";
import arduinoIde from "./arduino-ide";
import d1mini_ir from "./d1mini_ir";
import first from "./first";
import hcsr04 from "./hcsr04";
import led_circle from "./led_circle";
import led_strip from "./led_strip";
import nodemcuDeepSleep from "./nodemcu-deep-sleep";
import photoresistor from "./photoresistor";
import policelight from "./policelight";
import rpiLego from "./rpi_lego";
import rpiBootUsb from "./rpi-boot-usb";
import rpiInstall from "./rpi-install";
import dht_sdcard from "./dht_sdcard";
import smartSwitch from "./smart_switch";
import smartSwitch2 from "./smart_switch2";
import zigbee from "./zigbee";

const posts = [
  sevensegment,
  arduinoIde,
  d1mini_ir,
  dht_sdcard,
  first,
  hcsr04,
  led_circle,
  led_strip,
  nodemcuDeepSleep,
  photoresistor,
  policelight,
  rpiLego,
  rpiBootUsb,
  rpiInstall,
  smartSwitch,
  smartSwitch2,
  zigbee,
];

const sortPosts = posts.sort((elem, nextElem) => {
  return nextElem.time - elem.time;
});

export function getRecents() {
  return [sortPosts[0], sortPosts[1], sortPosts[2]];
}

export function getHighlights() {
  const highlighted = sortPosts.filter((elem) => elem.pinned);
  return [highlighted[0], highlighted[1], highlighted[2]];
}

export function getPosts() {
  return sortPosts;
}

export function getPost(id) {
  return posts.find((elem) => elem.id === id);
}
