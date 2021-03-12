import axios from 'axios'
import utils from '@/plugins/utils'

const CV_API = '/cvs/'
const AUTH_API = '/auth/local'
const USER_API = '/users/'
const UPLOAD_API = '/upload/'
const DESTROY_API = '/upload/files/'

const APIHelper = (api) => ({
  search: (params, option) =>
    axios.get(api, {params: utils.filterObject(params)}, option),
  count: (params, option) =>
    axios.get(api + 'count', {params: utils.filterObject(params)}, option),
  fetch: (params, option) =>
    axios.get(api, {params: utils.filterObject(params)}, option),
  fetchOne: (id, option) => axios.get(api + id, option),
  create: (params, options) =>
    axios.post(api, utils.filterObject(params), options),
  update: (id, params, option) =>
    axios.put(api + id, utils.filterObject(params), option),
  remove: (id, option) => axios.delete(api + id, option),
})
export const APIRespository = APIHelper
export const Auth = {
  ...APIHelper(AUTH_API),
  forgotPassword: (email) => axios.post('/auth/forgot-password', {email}),
  resetPassword: (code, password, passwordConfirmation) =>
    axios.post('/auth/reset-password', {
      code,
      password,
      passwordConfirmation,
    }),
  register: (phone, password, email) =>
    axios.post('/auth/local/register', {
      username: phone,
      password,
      email,
    }),
  requestOTP: (userId, userPhone, msgContent) =>
    axios.post(`/request-otp/${userId}`, {
      userPhone,
      msgContent,
    }),
  confirmSignupOTP: (userId, userPhone, otp) =>
    axios.post(`/confirm-otp/${userId}`, {
      userPhone,
      otp,
    }),
}
export const CV = APIHelper(CV_API)
export const User = APIHelper(USER_API)
export const Upload = {
  upload: (formData) =>
    axios.post(UPLOAD_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  destroy: (id) => axios.delete(DESTROY_API + id),
}

export default {
  Auth,
  CV,
  Upload,
  User,
}
