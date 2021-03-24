import axios from "@/plugins/axios";
import alert from "@/plugins/alert";
const UPLOAD_API = "/upload/";
const DESTROY_API = "/upload/files/";
export default {
  namespaced: true,
  state: {
    url: null,
    isLoading: false,
    response: false,
  },
  actions: {
    async upload({ commit }, formData) {
      commit("setLoading", true);
      return await axios
        .post(UPLOAD_API, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          commit("setURL", response[0].url);
          commit("setLoading", false);
          alert.success("Upload successfully!");
          return response[0].id
        })
        .catch((e) => alert.error(e));
    },
    async destroy({ commit }, id) {
      commit("setLoading", true);
      return await axios.delete(DESTROY_API + id).catch((e) => alert.error(e));
    },
  },
  mutations: {
    setURL(state, url) {
      state.url = url;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
  },
  getters: {
    url: (state) => {
      return state.url;
    },
    isLoading: (state) => {
      return state.isLoading;
    },
  },
};
