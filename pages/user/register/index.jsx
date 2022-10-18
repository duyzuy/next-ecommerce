import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container } from 'semantic-ui-react';
import { wpClient } from '../../../api/client';
const Register = (props) => {
  const [user, setUser] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const handleRegister = async (data) => {
    console.log(data);
    // const response = await wpClient.post(`user/register`, {
    //   username: user.userName,
    //   email: user.email,
    //   password: user.password
    // });
    console.log(response);
  };

  const handleChange = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };
  console.log(errors);
  return (
    <Container>
      <form className="ui form" onSubmit={handleSubmit(handleRegister)}>
        <div className="equal width fields">
          <div className="field">
            <label>Tên tài khoản</label>
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Tên tài khoản"
                onChange={(e) => handleChange('userName', e.target.value)}
                {...register('userName', { maxLength: 20 })}
              />
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="equal width fields">
          <div className="field">
            <label>Mật khẩu</label>
            <div className="ui fluid input">
              <input
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => handleChange('password', e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label>Xác nhận mật khẩu</label>
            <div className="ui fluid input">
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                onChange={(e) =>
                  handleChange('passwordConfirm', e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="field">
          <button className="ui button">Submit</button>
        </div>
      </form>
    </Container>
  );
};

export async function getStaticProps(ctx) {
  return {
    props: {}
  };
}
export default Register;
