import * as yup from 'yup';

export const customerSchema = yup.object().shape({
  userName: yup.string().required('Tên tài khoản không bỏ trống'),
  email: yup
    .string()
    .email('Email không đúng ')
    .required('Email không bỏ trống'),
  password: yup
    .string()
    .required('Mật khẩu không bỏ trống')
    .min(8, 'Mật khẩu tối thiểu 8 ký tự'),
  passwordConFirm: yup
    .string()
    .required('Xác nhận mật khẩu không được bỏ trống')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
});

export const isValidEmail = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return regex.test(String(email).toLocaleLowerCase());
};

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email không đúng ')
    .required('Email không bỏ trống'),
  password: yup
    .string()
    .required('Mật khẩu không bỏ trống')
    .min(8, 'Mật khẩu tối thiểu 8 ký tự')
});
