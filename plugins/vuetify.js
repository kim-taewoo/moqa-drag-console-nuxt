import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import VueCircleSlider from "vue-circle-slider";

Vue.use(Vuetify, {
  theme: {
    primary: "#1976D2", // a color that is not in the material colors palette
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
});

Vue.use(VueCircleSlider);
Kakao.init("c8073948e03369facac56feeb022f17a");
