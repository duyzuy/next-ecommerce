import { useEffect, useState } from 'react';
import { Container, Header, Form, Button } from 'semantic-ui-react';
import { wpClient } from '../../../api/client';
import { customerSchema } from '../../../utils/validate';
import * as Icon from 'react-feather';
import styles from '../../../styles/register.module.scss';
import Link from 'next/link';
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

  console.log(errors);
  return (
    <Container>
      <div className={styles.register__wrapper}>
        <Header className="register-header">
          <span className="icon">
            <Icon.User size={30} />
          </span>
          <p>Đăng ký tài khoản</p>
        </Header>
        <div classname="social-account">
          <div className="acc-google"></div>
          <div className="acc-facebook"></div>
        </div>
        <div className="register-form">
          <form className="ui form" onSubmit={handleSubmitForm}>
            <Form.Input
              fluid
              label="Tên tài khoản"
              placeholder="Tên tài khoản"
              icon="user outline"
              iconPosition="left"
              onChange={(e) => handleChange('userName', e.target.value)}
            />

            <Form.Input
              fluid
              label="Email"
              placeholder="Email"
              icon="mail outline"
              iconPosition="left"
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <Form.Input
              fluid
              label="Mật khẩu"
              placeholder="Mật khẩu"
              icon="key"
              type="password"
              iconPosition="left"
              onChange={(e) => handleChange('password', e.target.value)}
            />
            <Form.Input
              fluid
              label="Xác nhận mật khẩu"
              placeholder="Xác nhận mật khẩu"
              icon="key"
              type="password"
              iconPosition="left"
              onChange={(e) => handleChange('passwordConFirm', e.target.value)}
            />
            <Button color="blue">Đăng ký</Button>
          </form>
          <p>
            Đã có tài khoản?{' '}
            <Link href="/">
              <a>Đăng nhập ngay</a>
            </Link>
          </p>
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
