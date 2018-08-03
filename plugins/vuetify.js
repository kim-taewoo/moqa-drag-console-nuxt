import "@babel/polyfill";
import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import VueCircleSlider from "vue-circle-slider";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

Vue.use(Vuetify, {
  theme: {
    primary: "#1976D2", // a color that is not in the material colors palette
    accent: colors.grey.darken3,
    secondary: "#FFCDD2",
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
});

Vue.use(VueCircleSlider);
Vue.use(VueAwesomeSwiper);
// if (process.browser) {
//   const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
//   Vue.use(VueAwesomeSwiper)
// }
Vue.use(VueAwesomeSwiper);
Kakao.init("c8073948e03369facac56feeb022f17a");
