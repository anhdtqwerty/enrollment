/* eslint-disable no-unused-vars */
import alert from '@/plugins/alert'
import utils from '@/plugins/utils'
import router from '@/router'
import api from '../../plugins/api'
import _ from 'lodash'
import moment from 'moment'
export default {
  namespaced: true,
  state: {
    user: null,
    jwt: null,
    role: {},
    isAuthenticated: false,
    isConfirmedOTP: false,
  },
  actions: {
    async signIn({commit}, {identifier = '', password = ''} = {}) {
      try {
        const {jwt, user} = await api.Auth.create({identifier, password})
        commit('setUser', {user, jwt})
      } catch (error) {
        console.error('signIn', error)
      }
    },
    signOut() {
      this.reset()
    },
    async signUp({commit}, {phone, password}) {
      //TODO: Xoa dong duoi sau khi test xong
      this.reset()
      try {
        const rndEmail = `student${Date.now()}@ltv.edu.vn`
        const {user, jwt} = await api.Auth.register(phone, password, rndEmail)
        commit('setUser', {user, jwt})
        const result = await api.Auth.requestOTP(
          user.id,
          phone,
          'Ma OTP cua ban la {{otp}}. OTP cua ban co hieu luc trong 5 phut'
        )
        console.log(result)
        this.$alert.success(
          'Hãy kiểm tra mã OTP đã được gửi tới điện thoại của bạn'
        )
      } catch (error) {
        console.error('register', error)
      }
    },
    async requestOTP({userId, phone}) {
      try {
        const result = await api.Auth.requestOTP(
          userId,
          phone,
          'Ma OTP cua ban la {{otp}}. OTP cua ban co hieu luc trong 5 phut'
        )
        console.log(result)
        return result
      } catch (error) {
        console.error('request OTP', error)
      }
    },
    async confirmSignup({commit, state}, {phone, otp}) {
      try {
        const result = await api.Auth.confirmSignupOTP(
          state.user.id,
          phone,
          otp
        )
        console.log(result)
        return result
      } catch (error) {
        console.error('register', error)
      }
    },
    // async forgotPassword(context, email) {
    //   await api.Auth.forgotPassword(email)
    //   alert.success('Hãy kiểm tra mã OTP đã được gửi tới điện thoại của bạn')
    // },
    // async resetPassword({commit}, {code, password, passwordConfirmation}) {
    //   await api.Auth.resetPassword(code, password, passwordConfirmation)
    //   alert.success('Đặt lại mật khẩu thành công')
    // },
    setRole({commit}, role) {
      commit('setRole', role)
    },
  },
  mutations: {
    setUser(state, {user, jwt}) {
      state.jwt = jwt
      state.user = user
      if (user) {
        state.role = user.role
        state.isAuthenticated = true
      } else {
        state.isAuthenticated = false
        state.role = null
      }
    },
    setRole(state, role) {
      state.role = role
    },
    setConfirmOTP(state, data) {
      state.isConfirmedOTP = data
    },
  },
  getters: {
    jwt(state) {
      return state.jwt
    },
    user(state) {
      return !state.user ? {} : state.user
    },
    role(state) {
      return state.role || state.user.role || {}
    },
    isAuthenticated(state) {
      return state.isAuthenticated
    },
    isConfirmedOTP(state) {
      return state.isConfirmedOTP
    },
  },
}
/* eslint-disable no-unused-vars */
