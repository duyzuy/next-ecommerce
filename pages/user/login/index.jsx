import { useEffect, useState, useContext } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { loginSchema } from '../../../utils/validate';
import * as Icon from 'react-feather';
import styles from '../../../styles/register.module.scss';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { Message } from 'semantic-ui-react';
import { toast } from '../../../lib/toast';

const LoginPage = (props) => {
  const [userData, setUserData] = useState({});
  const { providers } = props;
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const handleLogin = async (e, provider) => {
    e.preventDefault();
    let credentials = {};
    try {
      const callbackUrl = '/user/profile';

      credentials = Object.assign({ callbackUrl }, credentials);

      if (provider === 'credentials') {
        await loginSchema.validate({ ...userData });
        credentials = {
          ...credentials,
          username: userData.email,
          password: userData.password,
          redirect: false
        };
      }

      const result = await signIn(provider, {
        ...credentials
      });

      if (result.ok && result.status === 200) {
        router.push('/user/profile', undefined, { shallow: false });
        toast({
          type: 'success',
          message: `Đăng nhập thành công`
        });
      } else {
        setErrors([result.error]);
      }
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

  return (
    <Container>
      <div className={styles.register__wrapper}>
        <div className="col-left"></div>
        <div className="col-right">
          <Header className="register-header" size="large">
            <span className="icon">
              <Icon.User size={30} />
            </span>
            <p>Đăng nhập</p>
          </Header>
          <div className="social-account">
            <div
              className="acc-google"
              onClick={(e) => handleLogin(e, 'google')}
            >
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
            <div className="login-status">
              {errors &&
                errors.map((err, ind) => (
                  <Message key={ind} color="red">
                    {err}
                  </Message>
                ))}
            </div>
            <form
              className="ec__form"
              onSubmit={(e) => handleLogin(e, 'credentials')}
            >
              <Input
                label="Email"
                placeholder="Email"
                type="email"
                autoComplete="email"
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
                autoComplete="current-password"
                onChange={(e) => handleChange('password', e.target.value)}
              />

              <Button
                fluid
                type="submit"
                color="primary"
                style={{ marginBottom: 20 }}
              >
                Đăng nhập
              </Button>
            </form>
            <p style={{ textAlign: 'center' }}>
              Chưa có tài khoản{' '}
              <Link href="/user/register">
                <a>Đăng ký ngay</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export async function getServerSideProps(ctx) {
  const providers = await getProviders();
  const session = await getSession({ req: ctx.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    props: { providers }
  };
}
export default LoginPage;
