import "@babel/polyfill";
import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import VueCircleSlider from "vue-circle-slider";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";

Vue.use(Vuetify, {
  theme: {
    primary: "#1976D2", // a color that is not in the material colors palette
    secondary: colors.grey.darken1,
    info: "#2196F3",
    accent: "#82B1FF",
    warning: "#FFC107",
    error: "#FF5252",
    success: "#4CAF50"
  }
});

Vue.use(VueCircleSlider);
// if (process.browser) {
//   const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
//   Vue.use(VueAwesomeSwiper)
// }

Vue.component("quillEditor", quillEditor);

Kakao.init("c8073948e03369facac56feeb022f17a");
