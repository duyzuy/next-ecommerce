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

export const bookingSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống'),
  firstName: yup
    .string()
    .required('Không bỏ trống Họ')
    .min(2, 'Họ ít nhất 2 ký tự'),
  lastName: yup
    .string()
    .required('Không bỏ trống tên đệm và tên')
    .min(2, 'Họ ít nhất 2 ký tự'),
  phone: yup.string().required('Không bỏ trống số điện thoại'),
  city: yup.string().required('Chọn thành phố'),
  country: yup.string().required('Chọn quốc gia'),
  paymentMethod: yup.string().required('Vui lòng chọn phương thức thanh toán'),
  shippingLine: yup.array().min(1, 'Chọn hình thức giao hàng'),
  isAcceptTerm: yup
    .boolean()
    .required('Vui lòng chấp nhận điều khoản và điều kiện')
    .oneOf([true], 'Vui lòng đồng ý với điều khoản và điều kiện')
});
