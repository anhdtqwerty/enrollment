import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { createStore } from 'vuex-extensions'
import _ from 'lodash'

import { axiosPlugin } from "@/plugins/axios";
import auth from "./auth/auth.js";
Vue.use(Vuex);

export default createStore(Vuex.Store, {
  plugins: [
    createPersistedState({
      key: "enrollment",
      paths: [
        "auth.user",
        "auth.isAuthenticated",
        "auth.jwt",
      ],
    }),
    axiosPlugin,
  ],
  modules: {
    auth,
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
