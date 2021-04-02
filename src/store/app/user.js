/* eslint-disable vue/valid-v-slot */
import { User } from "@/plugins/api";

export default {
  namespaced: true,
  state: {
    adminUsers: [],
  },
  actions: {
    async fetchAdminUsers({ commit }, options) {
      const admins = await User.fetch({ ...options, "role.type": "admin" });
      commit("setAdminUsers", admins);
      return admins;
    },
    async fetchAdminUser({ commit }, userId) {
      commit("setAdminUser", await User.fetchOne(userId));
    },
  },
  mutations: {
    setAdminUsers(state, adminUsers) {
      state.adminUsers = adminUsers.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: currentValue,
        }),
        {}
      );
    },
    setAdminUser(state, adminUser) {
      state.adminUsers = {
        [adminUser.id]: adminUser,
        ...state.adminUsers,
      };
    },
  },
  getters: {
    adminUsers: (state) => {
      return Object.values(state.adminUsers);
    },
    adminUser: (state) => (id) => {
      return state.adminUsers[id];
    },
  },
};
