import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Header } from 'semantic-ui-react';
import { wpClient } from '../../../api/client';
import { customerSchema } from '../../../utils/validate';
import * as Icon from 'react-feather';
const Register = (props) => {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState([]);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // console.log(customerSchema._nodes);
    try {
      await customerSchema.validate({ ...userData });

      // const response = await wpClient.post(`user/register`, {
      //   username: user.userName,
      //   email: user.email,
      //   password: user.password
      // });

      console.log('response');
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
      <div className="register-wrapper">
        <Header style={{ textAlign: 'center' }}>
          <span className="icon">
            <Icon.User size={30} />
            Tạo tài khoản
          </span>
        </Header>
        <div className="register-form">
          <form className="ui form" onSubmit={handleSubmitForm}>
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
                      handleChange('passwordConFirm', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <button className="ui button">Submit</button>
            </div>
          </form>
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
