import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { createStore } from "vuex-extensions";
import _ from "lodash";

import { axiosPlugin } from "@/plugins/axios";
import activeCode from "./active-code/activeCode.js";
import auth from "./app/auth.js";
import layout from "./app/layout.js";
import cv from "./cv/cv.js";
import upload from "./other/upload.js";

Vue.use(Vuex);

export default createStore(Vuex.Store, {
  plugins: [
    createPersistedState({
      key: "enrollment",
      paths: [
        "auth.user",
        "auth.isAuthenticated",
        "auth.jwt",
        "auth.isConfirmedOTP",
        "auth.role",
      ],
    }),
    axiosPlugin,
  ],
  modules: {
    auth,
    layout,
    activeCode,
    cv,
    upload,
  },
  mixins: {
    mutations: {
      changeState: function(state, changed) {
        Object.entries(changed).forEach(([name, value]) => {
          state[name] = value;
        });
      },
      changeDeepState: function(state, changed) {
        Object.entries(changed).forEach(([firstChildName, diff]) => {
          const firstChildValue = { ...state[firstChildName] };
          Object.entries(diff).forEach(([path, diffValue]) => {
            _.setWith(firstChildValue, path, diffValue);
          });
          state[firstChildName] = firstChildValue;
        });
      },
    },
  },
});
