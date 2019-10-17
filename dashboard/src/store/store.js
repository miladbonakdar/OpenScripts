import Vue from "vue";
import Vuex from "vuex";
import statics from "./modules/statics";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    statics
  }
});
