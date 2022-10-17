import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { wpClient } from '../../../api/client';
const Register = () => {
  const [user, setUser] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(user);
    const response = await wpClient.post(`user/register`, {
      username: '112311@gmai.com',
      email: '3333123@gmail.com',
      password: '123123123'
    });
    console.log(response);
  };

  const handleChange = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };
  return (
    <Container>
      <form className="ui form" onSubmit={handleRegister}>
        <div className="equal width fields">
          <div className="field">
            <label>Tên tài khoản</label>
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Tên tài khoản"
                onChange={(e) => handleChange('userName', e.target.value)}
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

export default Register;
