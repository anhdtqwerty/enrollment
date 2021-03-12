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
  },
  actions: {
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
    setAllDialogClose({ commit }) {
      commit("setAllDialogClose");
    },
  },
  mutations: {
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
  },
};
/* eslint-disable no-unused-vars */
