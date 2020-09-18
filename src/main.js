import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

// import fontawesome dependencies and setup library
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faFastBackward,
  faFastForward,
  faMap,
  faUsers,
  faInfoCircle,
  faEnvelope,
  faArrowUp,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faPlay,
  faPause,
  faFastForward,
  faFastBackward,
  faMap,
  faUsers,
  faInfoCircle,
  faEnvelope,
  faArrowUp,
  faCog
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
