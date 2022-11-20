import * as Icon from 'react-feather';
import { useState } from 'react';
const AccountPage = ({ data }) => {
  const [profile, setProfile] = useState(data);

  const [userData, setUserData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (value) => {
    const data = {};
  };
  return (
    <div className="account-page">
      <div className="section-header">
        <h3>Thông tin tài khoản</h3>
      </div>
      <div className="section-content">
        <div className="row">
          <div className="label">Họ</div>
          <div className="value">
            {isEdit ? (
              <div className="ui small input">
                <input
                  type="text"
                  value={profile.first_name}
                  placeholder="Họ"
                  onChange={() => handleChange('first_name', e.target.value)}
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
            {isEdit ? (
              <div className="ui small input">
                <input
                  type="text"
                  value={profile.last_name}
                  placeholder="Họ"
                  onChange={() => handleChange('last_name', e.target.value)}
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
            <p>{profile.email || '--'}</p>
          </div>
        </div>
        <div className="page-actions">
          <div className="btn-action" onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? 'Cập nhật' : 'Chỉnh sửa'}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountPage;
