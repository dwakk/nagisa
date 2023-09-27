import "./assets/global.css"

import App from "./App.vue";



import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faHome,
  faArrowRightToBracket,
  faTimes,
  faCircleChevronDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { createApp } from "vue";
import router from "./router";


library.add(
  faBars,
  faHome,
  faArrowRightToBracket,
  faTimes,
  faCircleChevronDown,
  faListAlt,
  faDiscord
);


createApp(App)
.use(router)
.component('font-awaseome-icon', FontAwesomeIcon)
.mount("#app");
