const moment = require('moment')

export const inputRules = {
  required: (v) =>
    (!!v && (typeof v !== 'string' || !!v.trim())) ||
    v === 0 ||
    'Bạn cần điền thông tin này',
  maxLength: (length) => (v) =>
    (v && v.length <= length) || !v || `Độ dài tối đa ${length} ký tự`,
  minLength: (length) => (v) =>
    (v && v.length >= length) || !v || `Độ dài tối thiểu ${length} ký tự`,
  max: (number) => (v) =>
    v <= number || `Must be lower than or equal to ${number}`,
  min: (number) => (v) =>
    v >= number || `Must be greater than or equal to ${number}`,
  email: (v) =>
    (v &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v.trim()
      )) ||
    !v ||
    'Sai định dạng Email',
  url: (v) =>
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
      v
    ) ||
    !v ||
    'Đường dẫn không hợp lệ',
  alphabet: (v) =>
    !v ||
    /^[a-z ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]+$/gi.test(
      v.trim()
    ) ||
    'Contain a-z only',
  normal: (v) =>
    !v ||
    /^[a-z0-9 ._ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]+$/gi.test(
      v.trim()
    ) ||
    'Chứa ký tự không hợp lệ',
  equal: (target, msg) => (v) =>
    !v || target === v || msg || `Must be equal to ${target}`,
  phone: (v) =>
    !v ||
    (v.length >= 10 &&
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/gi.test(v)) ||
    'Sai định dạng số điện thoại',
  nospace: (v) => !v || !/ /.test(v.trim()) || 'Không được chứa dấu cách',
  notEmpty: (v) => !Array.isArray(v) || !!v.length || 'Required',
  otp: (v) => (v && /^(\d{6})$/.test(v.trim())) || 'Mã OTP bao gồm 6 chữ số',
  cccd: (v) =>
    !v ||
    /^(\d{9}|\d{12})$/.test(v.trim()) ||
    'Sai định dạng số CMND / Thẻ CCCD',
  activeCode: (v) =>
    (v && /(?<!\d)\d{8}(?!\d)/.test(v.trim())) || 'Mã kích hoạt gồm 8 chữ số',
  dob: (v) =>
    !v ||
    (moment(v, 'DD/MM/YYYY').isValid() &&
      moment(v, 'DD/MM/YYYY').isBefore(new Date())) ||
    'Ngày tháng năm sinh không hợp lệ',
  mark: (v) =>
    !v || (parseFloat(v) >= 0 && parseFloat(v) <= 10) || 'Điểm không hợp lệ',
  checkbox: (v) => v || '',
  priorityMark: (v) =>
    !v || (parseFloat(v) >= 0 && parseFloat(v) <= 3) || 'Điểm cộng không hợp lệ',
}
