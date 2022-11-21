import { useState } from 'react';
import * as Icon from 'react-feather';
import Button from '../../components/Button';

const EDITS = {
  BILLING: 'billing',
  SHIPPING: 'shipping'
};
const AddressPage = ({ title, data, onUpdateUserInfor }) => {
  const [userData, setUserData] = useState({
    billing: data.billing,
    shipping: data.shipping,
    editting: ''
  });
  const { billing, shipping } = data;
  console.log(shipping);
  const onEditting = (action) => {
    setUserData((prevState) => ({
      ...prevState,
      editting: action
    }));
  };
  const handleUpdateUserData = () => {};
  const onCancelEdit = () => {};
  return (
    <div className="account-page">
      <div className="section-header">
        <h3>{title}</h3>
      </div>
      <div className="section-content">
        <div className="inner-section">
          <div className="billing-address">
            <div className="section-header">
              <h4>Thông tin thanh toán</h4>
              <div className="header-actions">
                <span
                  className="btn-edit"
                  onClick={() => onEditting(EDITS.BILLING)}
                >
                  <Icon.Edit3 size={11} /> Chỉnh sửa
                </span>
              </div>
            </div>
            <div className="section-content">
              <div className="row">
                <div className="label">Họ</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input">
                      <input
                        type="text"
                        value={userData.billing.first_name}
                        placeholder="Họ"
                        onChange={(e) =>
                          handleChange('first_name', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{billing.first_name || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Tên đệm và tên</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input">
                      <input
                        type="text"
                        value={userData.billing.last_name}
                        placeholder="Họ"
                        onChange={(e) =>
                          handleChange('last_name', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{billing.last_name || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Điện thoại</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input">
                      <input
                        type="text"
                        value={userData.billing.phone}
                        placeholder="Điện thoại"
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                  ) : (
                    <p>{billing.phone || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Email</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input">
                      <input
                        type="text"
                        value={userData.billing.email}
                        placeholder="Email"
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                  ) : (
                    <p>{billing.email || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Khu vực</div>
                <div className="value">
                  <p>{billing.country || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Thành phố</div>
                <div className="value">
                  <p>{billing.city || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Mã tỉnh thành</div>
                <div className="value">
                  <p>{billing.postcode || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Địa chỉ 1</div>
                <div className="value">
                  <p>{billing.address_1 || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Địa chỉ 2</div>
                <div className="value">
                  <p>{billing.address_2 || '--'}</p>
                </div>
              </div>
              <div className="page-actions buttons">
                {userData.editting === EDITS.BILLING && (
                  <>
                    <Button color="light" size="small" onClick={onCancelEdit}>
                      Huỷ bỏ
                    </Button>
                    <Button
                      color={'primary'}
                      size="small"
                      onClick={() =>
                        handleUpdateUserData({
                          action:
                            (userData.isEdit && ACTIONS.UPDATE) || ACTIONS.EDIT
                        })
                      }
                    >
                      Cập nhật
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="shipping-address">
            <div className="section-header">
              <h4>Thông tin người nhận</h4>
              <div className="header-actions">
                <span
                  className="btn-edit"
                  onClick={() => onEditting(EDITS.SHIPPING)}
                >
                  <Icon.Edit3 size={11} /> Chỉnh sửa
                </span>
              </div>
            </div>
            <div className="section-content">
              <div className="row">
                <div className="label">Họ</div>
                <div className="value">
                  {userData.isEdit ? (
                    <div className="ui small input">
                      <input
                        type="text"
                        value={userData.profile.first_name}
                        placeholder="Họ"
                        onChange={(e) =>
                          handleChange('first_name', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{shipping.first_name || '--'}</p>
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
                        placeholder="Họ"
                        onChange={(e) =>
                          handleChange('last_name', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{shipping.last_name || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Điện thoại</div>
                <div className="value">
                  <p>{shipping.phone || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Email</div>
                <div className="value">
                  <p>{shipping.email || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Khu vực</div>
                <div className="value">
                  <p>{shipping.country || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Thành phố</div>
                <div className="value">
                  <p>{shipping.city || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Mã tỉnh thành</div>
                <div className="value">
                  <p>{shipping.postcode || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Địa chỉ 1</div>
                <div className="value">
                  <p>{shipping.address_1 || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Địa chỉ 2</div>
                <div className="value">
                  <p>{shipping.address_2 || '--'}</p>
                </div>
              </div>
              <div className="page-actions buttons">
                {userData.editting === EDITS.SHIPPING && (
                  <>
                    <Button color="light" size="small" onClick={onCancelEdit}>
                      Huỷ bỏ
                    </Button>
                    <Button
                      color={'primary'}
                      size="small"
                      onClick={() =>
                        handleUpdateUserData({
                          action:
                            (userData.isEdit && ACTIONS.UPDATE) || ACTIONS.EDIT
                        })
                      }
                    >
                      Cập nhật
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddressPage;
