import { useEffect, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { wpClient } from '../../../api/client';
import { customerSchema } from '../../../utils/validate';
import * as Icon from 'react-feather';
import styles from '../../../styles/register.module.scss';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Link from 'next/link';
import Image from 'next/image';
const Register = (props) => {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState([]);
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      await customerSchema.validate({ ...userData });

      // const response = await wpClient.post(`user/register`, {
      //   username: user.userName,
      //   email: user.email,
      //   password: user.password
      // });
      console.log('oke');
    } catch (err) {
      setErrors(err.errors);
    }
  };

  const handleChange = (key, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  console.log(userData);
  return (
    <Container>
      <div className={styles.register__wrapper}>
        <div className="col-left"></div>
        <div className="col-right">
          <Header className="register-header" size="large">
            <span className="icon">
              <Icon.User size={30} />
            </span>
            <p>Đăng ký tài khoản</p>
          </Header>
          <div className="social-account">
            <div className="acc-google">
              <span className="icon">
                <Image
                  src={'/assets/icons/ic-google.svg'}
                  layout="responsive"
                  width={20}
                  height={20}
                  objectFit="cover"
                  alt="google"
                />
              </span>
              <span className="text">Google</span>
            </div>
            <div className="acc-facebook">
              <span className="icon">
                <Image
                  src={'/assets/icons/ic-facebook.svg'}
                  layout="responsive"
                  width={20}
                  height={20}
                  objectFit="contain"
                  alt="facebook"
                />
              </span>
              <span className="text">Facebook</span>
            </div>
          </div>
          <div className="register-form">
            <form className="ec__form" onSubmit={handleSubmitForm}>
              <Input
                label="Tên tài khoản"
                placeholder="Tên tài khoản"
                type="text"
                icon={() => <Icon.User size={18} />}
                iconPosition="left"
                onChange={(e) => handleChange('userName', e.target.value)}
              />
              <Input
                label="Email"
                placeholder="Email"
                type="email"
                icon={() => <Icon.Mail size={18} />}
                iconPosition="left"
                onChange={(e) => handleChange('email', e.target.value)}
              />

              <Input
                label="Mật khẩu"
                placeholder="Mật khẩu"
                type="password"
                icon={() => <Icon.Key size={18} />}
                iconPosition="left"
                onChange={(e) => handleChange('password', e.target.value)}
              />
              <Input
                label="Xác nhận mật khẩu"
                placeholder="Xác nhận mật khẩu"
                type="password"
                icon={() => <Icon.Key size={18} />}
                iconPosition="left"
                onChange={(e) =>
                  handleChange('passwordConFirm', e.target.value)
                }
              />
              <Button fluid color="primary" style={{ marginBottom: 20 }}>
                Đăng ký
              </Button>
            </form>
            <p style={{ textAlign: 'center' }}>
              Đã có tài khoản?{' '}
              <Link href="/">
                <a>Đăng nhập ngay</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export async function getStaticProps(ctx) {
  return {
    props: {}
  };
}
export default Register;
