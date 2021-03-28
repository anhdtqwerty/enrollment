import axios from "axios";
import utils from "@/plugins/utils";

const CV_API = "/cvs/";
const ACTIVE_CODE_API = "/active-codes/";
const AUTH_API = "/auth/local";
const USER_API = "/users/";
const UPLOAD_API = "/upload/";
const DESTROY_API = "/upload/files/";

const APIHelper = (api) => ({
  search: (params, option) =>
    axios.get(api, { params: utils.filterObject(params) }, option),
  count: (params, option) =>
    axios.get(api + "count", { params: utils.filterObject(params) }, option),
  fetch: (params, option) =>
    axios.get(api, { params: utils.filterObject(params) }, option),
  fetchOne: (id, option) => axios.get(api + id, option),
  create: (params, options) =>
    axios.post(api, utils.filterObject(params), options),
  update: (id, params, option) =>
    axios.put(api + id, utils.filterObject(params), option),
  remove: (id, option) => axios.delete(api + id, option),
});
export const APIRespository = APIHelper;
export const Auth = {
  ...APIHelper(AUTH_API),
  requestResetOTP: (userPhone) =>
    axios.post(`/request-otp`, {
      userPhone,
      requestType: "reset-password",
    }),
  confirmResetOTP: (userPhone, otp) =>
    axios.post(`/confirm-reset-password/${userPhone}`, {
      otp,
    }),
  changePassword: (userPhone, newPassword, confirmNewPassword) =>
    axios.put(`/change-password/${userPhone}`, {
      newPassword,
      confirmNewPassword,
    }),
  register: (phone, password, email) =>
    axios.post("/auth/local/register", {
      username: phone,
      password,
      email,
    }),
  requestRegisterOTP: (userPhone) =>
    axios.post(`/request-otp`, {
      userPhone,
      requestType: "register",
    }),
  confirmSignupOTP: (userPhone, otp) =>
    axios.post(`/confirm-register`, {
      userPhone,
      otp,
    }),
};
export const CV = {
  ...APIHelper(CV_API),
  create: (code, params) =>
    axios.post(`/cvs/${code}`, {
      ...params,
    }),
  update: (code, params) =>
    axios.put(`/cvs/${code}`, {
      ...params,
    }),
  checkDocumentSystemTime: (params) =>
    axios.post(`/checkDocumentSystemTime`, {
      ...params,
    }),
  checkSystemTime: () => axios.get(`/checkSystemTime`),
};
export const ActiveCode = {
  ...APIHelper(ACTIVE_CODE_API),
  validate: (code) =>
    axios.post(`/active-codes/validate`, {
      code,
    }),
};
export const User = APIHelper(USER_API);
export const Upload = {
  upload: (formData) =>
    axios.post(UPLOAD_API, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  destroy: (id) => axios.delete(DESTROY_API + id),
};

export default {
  Auth,
  CV,
  Upload,
  User,
  ActiveCode,
};
