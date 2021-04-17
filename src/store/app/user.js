/* eslint-disable no-unused-vars */
import { User } from "@/plugins/api";

export default {
  namespaced: true,
  state: {
    adminUsers: [],
    users: [],
  },
  actions: {
    async countUsers({ commit }, options) {
      const userCount = await User.count({ ...options });
      const adminCount = await User.count({ ...options, "role.type": "admin" });
      return userCount - adminCount;
    },
    async fetchUsers({ commit }, options) {
      const foundUsers = await User.fetch({ ...options, _limit: -1 });
      commit("setUsers", foundUsers);
      return foundUsers;
    },
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
    setUsers(state, users) {
      state.users = users.reduce(
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
/* eslint-enable no-unused-vars */
