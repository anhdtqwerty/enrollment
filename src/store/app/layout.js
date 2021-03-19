/* eslint-disable no-unused-vars */
export default {
  namespaced: true,
  state: {
    signInDialog: false,
    signUpDialog: false,
    forgotPasswordDialog: false,
    confirmForgotPasswordDialog: false,
    newPasswordDialog: false,
    confirmSignupDialog: false,
    documentDialog: false,
    countdownRegisterOTP: 0,
    countdownResetOTP: 0,
    countdownLockConfirm: 0,
    countdownLockReset: 0,
    countdownLockLogin: 0,
  },
  actions: {
    setDocumentDialog({ commit }, data) {
      commit("setDocumentDialog", data);
    },
    setSignInDialog({ commit }, data) {
      commit("setSignInDialog", data);
    },
    setSignUpDialog({ commit }, data) {
      commit("setSignUpDialog", data);
    },
    setForgotPasswordDialog({ commit }, data) {
      commit("setForgotPasswordDialog", data);
    },
    setConfirmForgotPasswordDialog({ commit }, data) {
      commit("setConfirmForgotPasswordDialog", data);
    },
    setNewPasswordDialog({ commit }, data) {
      commit("setNewPasswordDialog", data);
    },
    setConfirmSignupDialog({ commit }, data) {
      commit("setConfirmSignupDialog", data);
    },
    setCountdownRegisterOTP({ commit }, data) {
      commit("setCountdownRegisterOTP", data);
    },
    setCountdownResetOTP({ commit }, data) {
      commit("setCountdownResetOTP", data);
    },
    setCountdownLockReset({ commit }, data) {
      commit("setCountdownLockReset", data);
    },
    setCountdownLockConfirm({ commit }, data) {
      commit("setCountdownLockConfirm", data);
    },
    setCountdownLockLogin({ commit }, data) {
      commit("setCountdownLockLogin", data);
    },
    setAllDialogClose({ commit }) {
      commit("setAllDialogClose");
    },
  },
  mutations: {
    setDocumentDialog(state, data) {
      state.documentDialog = data;
    },
    setCountdownResetOTP(state, data) {
      state.countdownResetOTP = data;
    },
    setCountdownLockReset(state, data) {
      state.countdownLockReset = data;
    },
    setCountdownRegisterOTP(state, data) {
      state.countdownRegisterOTP = data;
    },
    setCountdownLockConfirm(state, data) {
      state.countdownLockConfirm = data;
    },
    setCountdownLockLogin(state, data) {
      state.countdownLockLogin = data;
    },
    setAllDialogClose(state) {
      state.signInDialog = false;
      state.signUpDialog = false;
      state.forgotPasswordDialog = false;
      state.confirmForgotPasswordDialog = false;
      state.newPasswordDialog = false;
      state.confirmSignupDialog = false;
    },
    setSignInDialog(state, data) {
      state.signInDialog = data;
    },
    setSignUpDialog(state, data) {
      state.signUpDialog = data;
    },
    setForgotPasswordDialog(state, data) {
      state.forgotPasswordDialog = data;
    },
    setConfirmForgotPasswordDialog(state, data) {
      state.confirmForgotPasswordDialog = data;
    },
    setNewPasswordDialog(state, data) {
      state.newPasswordDialog = data;
    },
    setConfirmSignupDialog(state, data) {
      state.confirmSignupDialog = data;
    },
  },
  getters: {
    documentDialog(state) {
      return state.documentDialog;
    },
    signInDialog(state) {
      return state.signInDialog;
    },
    signUpDialog(state) {
      return state.signUpDialog;
    },
    forgotPasswordDialog(state) {
      return state.forgotPasswordDialog;
    },
    confirmForgotPasswordDialog(state) {
      return state.confirmForgotPasswordDialog;
    },
    newPasswordDialog(state) {
      return state.newPasswordDialog;
    },
    confirmSignupDialog(state) {
      return state.confirmSignupDialog;
    },
    countdownRegisterOTP(state) {
      return state.countdownRegisterOTP;
    },
    countdownResetOTP(state) {
      return state.countdownResetOTP;
    },
    countdownLockReset(state) {
      return state.countdownLockReset;
    },
    countdownLockLogin(state) {
      return state.countdownLockLogin;
    },
    countdownLockConfirm(state) {
      return state.countdownLockConfirm;
    },
  },
};
/* eslint-disable no-unused-vars */
