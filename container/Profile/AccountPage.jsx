import * as Icon from 'react-feather';
import { useState } from 'react';
import Button from '../../components/Button';
const ACTIONS = {
  UPDATE: 'update',
  EDIT: 'edit'
};
const AccountPage = ({ title, data, onUpdateUserInfor, isLoading }) => {
  const [userData, setUserData] = useState({ profile: {}, isEdit: false });

  const handleChange = (key, value) => {
    setUserData((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        [key]: value
      }
    }));
  };

  const onUpdateUserData = ({ action }) => {
    if (action === ACTIONS.EDIT) {
      setUserData((prevState) => ({
        ...prevState,
        isEdit: true,
        profile: {
          first_name: data.first_name,
          last_name: data.last_name
        }
      }));
    } else {
      onUpdateUserInfor('account', { ...userData.profile }, () => {
        setUserData((prevState) => ({
          ...prevState,
          isEdit: false
        }));
      });
    }
  };
  const onCancelEdit = () => {
    setUserData((prevState) => ({
      ...prevState,
      isEdit: false,
      profile: {}
    }));
  };
  return (
    <div className="account-page">
      <div className="section-header">
        <h3>{title}</h3>
      </div>
      <div className="section-content">
        <div className="inner-section">
          <div className="row">
            <div className="label">Họ</div>
            <div className="value">
              {userData.isEdit ? (
                <div className="ui small input">
                  <input
                    type="text"
                    value={userData.profile.first_name}
                    disabled={(isLoading && true) || false}
                    placeholder="Họ"
                    onChange={(e) => handleChange('first_name', e.target.value)}
                  />
                </div>
              ) : (
                <p>{data.first_name || '--'}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="label">Tên đệm và tên</div>
            <div className="value">
              {userData.isEdit ? (
                <div className="ui small input">
                  <input
                    type="text"
                    value={userData.profile.last_name}
                    disabled={(isLoading && true) || false}
                    placeholder="Họ"
                    onChange={(e) => handleChange('last_name', e.target.value)}
                  />
                </div>
              ) : (
                <p>{data.last_name || '--'}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="label">Tên tài khoản</div>
            <div className="value">
              <p>{data.username || '--'}</p>
            </div>
          </div>
          <div className="row">
            <div className="label">Mật khẩu</div>
            <div className="value">
              <p>**********</p>
              <p>
                <Icon.Edit3 size={12} /> Đổi mật khẩu
              </p>
            </div>
          </div>
          <div className="row">
            <div className="label">Email</div>
            <div className="value">
              <p>{data.email || '--'}</p>
            </div>
          </div>
          <div className="page-actions buttons">
            {userData.isEdit && (
              <Button color="light" size="small" onClick={onCancelEdit}>
                Cancel
              </Button>
            )}
            <Button
              color={userData.isEdit ? 'primary' : 'secondary'}
              size="small"
              onClick={() =>
                onUpdateUserData({
                  action: (userData.isEdit && ACTIONS.UPDATE) || ACTIONS.EDIT
                })
              }
            >
              {userData.isEdit ? 'Cập nhật' : 'Chỉnh sửa'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountPage;
