/* eslint-disable no-unused-vars */
import alert from "@/plugins/alert";
import utils from "@/plugins/utils";
import router from "@/router";
import api from "../../plugins/api";
import _ from "lodash";
import moment from "moment";
export default {
  namespaced: true,
  state: {
    user: null,
    jwt: null,
    role: {},
    isAuthenticated: false,
    isConfirmedOTP: false,
    isRequestingReset: false,
    isConfirmedResetOTP: false,
    userPhone: "",
    confirmFailTime: 0,
    loginFailTime: 0,
    resetFailTime: 0,
  },
  actions: {
    async signIn({ commit, state }, { identifier = "", password = "" } = {}) {
      try {
        const { jwt, user } = await api.Auth.create({ identifier, password });
        commit("setUser", { user, jwt });
        if (state.user && state.isAuthenticated)
          alert.success("Đăng nhập thành công");
      } catch (error) {
        console.log(error);
        if (error.includes(`Identifier or password invalid`))
          alert.error("Tài khoản hoặc mật khẩu không chính xác");
        else
          alert.error(
            "Đăng nhập không thành công! Xin vui lòng thử lại sau ít phút."
          );
      }
    },
    signOut({ commit }) {
      commit("signout");
    },
    async signUp({ commit }, { phone, password }) {
      try {
        const rndEmail = `student${Date.now()}@ltv.edu.vn`;
        const userPhone = utils.getValidUserPhone(phone);
        const { user, jwt } = await api.Auth.register(
          userPhone,
          password,
          rndEmail
        );
        commit("setUser", { user, jwt });
        const result = await api.Auth.requestRegisterOTP(phone);
        alert.success(result);
      } catch (error) {
        console.log(error);
        if (error === "Email already taken") {
          alert.error("Số điện thoại này đã có người sử dụng");
          return;
        }
        alert.error(error);
      }
    },
    async requestRegisterOTP({ commit }, { phone }) {
      try {
        const result = await api.Auth.requestRegisterOTP(phone);
        alert.success(result);
      } catch (error) {
        console.error("request OTP", error);
      }
    },
    async confirmSignup({ commit, state }, { phone, confirmOTP }) {
      try {
        const result = await api.Auth.confirmSignupOTP(phone, confirmOTP);
        alert.success(result);
        commit("setConfirmOTP", true);
      } catch (error) {
        alert.error(error);
      }
    },
    async requestResetOTP({ commit }, { userPhone }) {
      try {
        const result = await api.Auth.requestResetOTP(userPhone);
        commit("setUserPhone", userPhone);
        commit("isRequestingReset", true);
        alert.success(result);
      } catch (error) {
        alert.error(error);
      }
    },
    async confirmResetPassword({ commit }, { userPhone, otp }) {
      try {
        const result = await api.Auth.confirmResetOTP(userPhone, otp);
        commit("isRequestingReset", false);
        commit("isConfirmedResetOTP", true);
        alert.success(result);
      } catch (error) {
        alert.error(error);
      }
    },
    async changePassword(
      { commit },
      { userPhone, newPassword, confirmNewPassword }
    ) {
      try {
        const result = await api.Auth.changePassword(
          userPhone,
          newPassword,
          confirmNewPassword
        );
        commit("isConfirmedResetOTP", false);
        alert.success(result);
      } catch (error) {
        alert.error(error);
      }
    },
    setRole({ commit }, role) {
      commit("setRole", role);
    },
    setConfirmFailTime({ commit }, data) {
      commit("setConfirmFailTime", data);
    },
    setLoginFailTime({ commit }, data) {
      commit("setLoginFailTime", data);
    },
    setResetFailTime({ commit }, data) {
      commit("setResetFailTime", data);
    },
    setUserPhone({ commit }, data) {
      commit("setUserPhone", data);
    },
    isRequestingReset({ commit }, data) {
      commit("isRequestingReset", data);
    },
    isConfirmedResetOTP({ commit }, data) {
      commit("isConfirmedResetOTP", data);
    },
  },
  mutations: {
    setUser(state, { user, jwt }) {
      state.jwt = jwt;
      state.user = user;
      if (user) {
        state.role = user.role;
        state.isAuthenticated = true;
        state.isConfirmedOTP = user.isConfirmedOTP;
        state.userPhone = user.username;
      } else {
        state.isAuthenticated = false;
        state.role = null;
        state.userPhone = "";
        state.isConfirmedOTP = false;
      }
    },
    setRole(state, role) {
      state.role = role;
    },
    signout(state, role) {
      state.user = null;
      state.jwt = null;
      state.role = {};
      state.isAuthenticated = false;
      state.isConfirmedOTP = false;
      state.isRequestingReset = false;
      state.isConfirmedResetOTP = false;
      state.userPhone = "";
      state.confirmFailTime = 0;
      state.loginFailTime = 0;
      state.resetFailTime = 0;
    },
    setUserPhone(state, data) {
      state.userPhone = data;
    },
    setConfirmOTP(state, data) {
      state.isConfirmedOTP = data;
    },
    setConfirmFailTime(state, data) {
      state.confirmFailTime = data;
    },
    setLoginFailTime(state, data) {
      state.loginFailTime = data;
    },
    setResetFailTime(state, data) {
      state.resetFailTime = data;
    },
    isRequestingReset(state, data) {
      state.isRequestingReset = data;
    },
    isConfirmedResetOTP(state, data) {
      state.isConfirmedResetOTP = data;
    },
  },
  getters: {
    jwt(state) {
      return state.jwt;
    },
    user(state) {
      return !state.user ? {} : state.user;
    },
    role(state) {
      return state.role || state.user.role || {};
    },
    userPhone(state) {
      return state.userPhone;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isConfirmedOTP(state) {
      return state.isConfirmedOTP;
    },
    confirmFailTime(state) {
      return state.confirmFailTime;
    },
    loginFailTime(state) {
      return state.loginFailTime;
    },
    resetFailTime(state) {
      return state.resetFailTime;
    },
    isRequestingReset(state) {
      return state.isRequestingReset;
    },
    isConfirmedResetOTP(state) {
      return state.isConfirmedResetOTP;
    },
  },
};
/* eslint-disable no-unused-vars */
