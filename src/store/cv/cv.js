/* eslint-disable no-unused-vars */
import alert from "@/plugins/alert";
import { CV } from "@/plugins/api";
import moment from "moment";
export default {
  namespaced: true,
  state: {
    CVs: [],
    count: 0,
    step: 1,
    systemTime: {
      checkSystemTime: {
        "open-document": false,
      },
      systemTime: {
        "open-document": moment().format("DD/MM/YYYY hh:mm:ss"),
      },
    },
  },
  actions: {
    async checkSystemTime({ commit }) {
      try {
        commit("setSystemTime", await CV.checkSystemTime());
      } catch (e) {
        alert.error(e);
      }
    },
    async checkDocumentSystemTime({ state }, { grade }) {
      try {
        return await CV.checkDocumentSystemTime({ grade });
      } catch (e) {
        alert.error(e);
      }
    },
    async fetchCVs({ commit }, options) {
      try {
        commit("setCVs", await CV.fetch(options));
      } catch (e) {
        alert.error(e);
      }
    },
    async countCVs({ commit }, options) {
      try {
        commit("setCount", await CV.count(options));
      } catch (e) {
        alert.error(e);
      }
    },
    async fetchCV({ commit }, { ...item }) {
      try {
        const cv = await CV.search({ ...item });
        if (cv.length > 0) {
          commit("setCV", cv[0]);
          commit("setStep", cv[0].step);
          return cv[0];
        }
      } catch (e) {
        alert.error(e);
      }
    },
    async createCV({ commit }, { code, ...data }) {
      try {
        const newCV = await CV.create(code, data);
        commit("setCV", newCV);
        alert.success("Tạo hồ sơ mới thành công!");
        return newCV;
      } catch (e) {
        alert.error(e);
      }
    },
    async updateCV({ commit, state }, { code, ...Cv }) {
      try {
        const updatedCV = await CV.update(code, Cv);
        commit("setCV", updatedCV);
        alert.success("Đã lưu thành công");
      } catch (e) {
        alert.error(e);
      }
    },
    async removeCV({ commit }, id) {
      try {
        const removedCV = await CV.remove(id);
        commit("removeCV", removedCV.code);
        alert.success("Xóa hồ sơ thành công!");
      } catch (e) {
        alert.error(e);
      }
    },
    setCV({ commit, state }, Cv) {
      commit("setCV", Cv);
    },
    setStep({ commit, state }, step) {
      commit("setStep", step);
    },
    async removeCVs({ dispatch }, items) {
      for (let item of items) {
        await dispatch("removeCV", item.code);
      }
    },
  },
  mutations: {
    setCVs(state, CVs) {
      state.CVs = CVs.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [`${currentValue.id}`]: currentValue,
        }),
        {}
      );
    },
    setCV(state, CV) {
      state.CVs = {
        ...state.CVs,
        [CV.id]: CV,
      };
      state.step = CV.step;
    },
    setStep(state, step) {
      state.step = step;
    },
    setSystemTime(state, systemTime) {
      state.systemTime = systemTime;
    },
    removeCV(state, id) {
      delete state.CVs[id];
      state.CVs = { ...state.CVs };
    },
  },
  getters: {
    systemTime: (state) => {
      return state.systemTime;
    },
    CVs: (state) => {
      return Object.values(state.CVs);
    },
    CV: (state) => (id) => {
      return state.CVs[id];
    },
    count: (state) => {
      return state.count;
    },
    step: (state) => {
      return state.step;
    },
  },
};
/* eslint-enable no-unused-vars */
