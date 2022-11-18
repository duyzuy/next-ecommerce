import * as Icon from 'react-feather';
const AccountPage = ({ data }) => {
  return (
    <div className="account-page">
      <div className="page-header">
        <h3>Thông tin tài khoản</h3>
      </div>
      <div className="page-content">
        <div className="row">
          <div className="label">Họ</div>
          <div className="value">{data.first_name || '--'}</div>
        </div>
        <div className="row">
          <div className="label">Tên đệm và tên</div>
          <div className="value">{data.last_name || '--'}</div>
        </div>
        <div className="row">
          <div className="label">Tên tài khoản</div>
          <div className="value">{data.username || '--'}</div>
        </div>
        <div className="row">
          <div className="label">Mật khẩu</div>
          <div className="value">**********</div>
        </div>
        <div className="row">
          <div className="label">Email</div>
          <div className="value">{data.email || '--'}</div>
        </div>
        <div className="page-actions">
          <div className="btn-action">
            <Icon.Edit3 size={12} /> Chỉnh sửa
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountPage;
