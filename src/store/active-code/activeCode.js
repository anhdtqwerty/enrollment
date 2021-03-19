/* eslint-disable no-unused-vars */
import alert from "@/plugins/alert";
import { ActiveCode } from "@/plugins/api";
export default {
  namespaced: true,
  state: {
    ActiveCodes: [],
    count: 0,
  },
  actions: {
    async validate({ commit }, code) {
      try {
        return await ActiveCode.validate(code);
      } catch (e) {
        alert.error(e);
      }
    },
    async fetchActiveCodes({ commit }, options) {
      try {
        commit("setActiveCodes", await ActiveCode.fetch(options));
      } catch (e) {
        alert.error(e);
      }
    },
    async countActiveCodes({ commit }, options) {
      try {
        commit("setCount", await ActiveCode.count(options));
      } catch (e) {
        alert.error(e);
      }
    },
    async fetchActiveCode({ commit }, ActiveCodeId) {
      try {
        commit("setActiveCode", await ActiveCode.fetchOne(ActiveCodeId));
      } catch (e) {
        alert.error(e);
      }
    },
    async createActiveCode({ commit }, data) {
      try {
        const activeCode = await ActiveCode.create(data);
        commit("setActiveCode", activeCode);
        return activeCode;
      } catch (e) {
        alert.error(e);
      }
    },
    async updateActiveCode({ commit }, { id, ...ActiveCode }) {
      try {
        commit("setActiveCodes", [await ActiveCode.update(id, ActiveCode)]);
        alert.success("Cập nhật mã kích hoạt thành công!");
      } catch (e) {
        alert.error(e);
      }
    },
    async removeActiveCode({ commit }, id) {
      try {
        await ActiveCode.remove(id);
        commit("removeActiveCode", id);
        alert.success("Xóa mã kích hoạt thành công!");
      } catch (e) {
        alert.error(e);
      }
    },
    setActiveCode({ commit, state }, ActiveCode) {
      commit("setActiveCode", ActiveCode);
    },
    async removeActiveCodes({ dispatch }, items) {
      for (let item of items) {
        await dispatch("removeActiveCode", item.id);
      }
    },
  },
  mutations: {
    setActiveCodes(state, ActiveCodes) {
      state.ActiveCodes = ActiveCodes.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.id]: currentValue,
        }),
        {}
      );
    },
    setActiveCode(state, ActiveCode) {
      state.ActiveCodes = {
        ...state.ActiveCodes,
        [ActiveCode.id]: ActiveCode,
      };
    },
    removeActiveCode(state, ActiveCodeId) {
      delete state.ActiveCodes[ActiveCodeId];
      state.ActiveCodes = { ...state.ActiveCodes };
    },
  },
  getters: {
    activeCodes: (state) => {
      return Object.values(state.ActiveCodes);
    },
    activeCode: (state) => (id) => {
      return state.ActiveCodes[id];
    },
    count: (state) => {
      return state.count;
    },
  },
};
/* eslint-enable no-unused-vars */
