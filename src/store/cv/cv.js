/* eslint-disable no-unused-vars */
import alert from '@/plugins/alert'
import {CV} from '@/plugins/api'
export default {
  namespaced: true,
  state: {
    CVs: [],
    count: 0,
    step: 1,
  },
  actions: {
    async fetchCVs({commit}, options) {
      try {
        commit('setCVs', await CV.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async countCVs({commit}, options) {
      try {
        commit('setCount', await CV.count(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async fetchCV({commit}, {code, userId}) {
      try {
        const cv = await CV.search({code, parent: userId})
        commit('setCV', cv[0])
        commit('setStep', cv[0].step)
      } catch (e) {
        alert.error(e)
      }
    },
    async createCV({commit}, {code, ...data}) {
      try {
        const newCV = await CV.create(code, data)
        commit('setCV', newCV)
        alert.success('Tạo hồ sơ mới thành công!')
      } catch (e) {
        console.log(e)
        alert.error(e)
      }
    },
    async updateCV({commit, state}, {id, ...Cv}) {
      try {
        const updatedCV = await CV.update(id, Cv)
        commit('setCV', updatedCV)
        alert.success('Đã lưu thành công')
      } catch (e) {
        alert.error(e)
      }
    },
    async removeCV({commit}, id) {
      try {
        const removedCV = await CV.remove(id)
        commit('removeCV', removedCV.code)
        alert.success('Xóa hồ sơ thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    setCV({commit, state}, Cv) {
      commit('setCV', Cv)
    },
    setStep({commit, state}, step) {
      commit('setStep', step)
    },
    async removeCVs({dispatch}, items) {
      for (let item of items) {
        await dispatch('removeCV', item.code)
      }
    },
  },
  mutations: {
    setCVs(state, CVs) {
      state.CVs = CVs.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.code]: currentValue,
        }),
        {}
      )
    },
    setCV(state, CV) {
      state.CVs = {
        ...state.CVs,
        [CV.code]: CV,
      }
    },
    setStep(state, step) {
      state.step = step
    },
    removeCV(state, code) {
      delete state.CVs[code]
      state.CVs = {...state.CVs}
    },
  },
  getters: {
    CVs: (state) => {
      return Object.values(state.CVs)
    },
    CV: (state) => (code) => {
      return state.CVs[code]
    },
    count: (state) => {
      return state.count
    },
    step: (state) => {
      return state.step
    },
  },
}
/* eslint-enable no-unused-vars */
